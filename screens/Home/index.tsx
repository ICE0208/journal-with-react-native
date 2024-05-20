import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  Button,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import styles from "./styles";
import Toast from "react-native-toast-message";
import Journals from "components/Journals";
import NewJournalBtn from "components/NewJournalBtn";
import { JournalDatas } from "@myTypes/JournalDatas";
import { signOut } from "firebase/auth";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation, route }: Props) {
  const [datas, setDatas] = useState<JournalDatas>([]);
  const { userName } = route.params;
  const unsubscribe = useRef<Unsubscribe>(() => {});
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getInitDatas = async () => {
    const initDocs = await getDocs(
      query(
        collection(db, "users", auth.currentUser!.uid, "memos"),
        orderBy("createdAt", "desc")
      )
    );

    const initDatas = initDocs.docs.map((doc) => ({
      content: doc.data().content,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
      id: doc.id,
    }));
    setDatas(initDatas);
    setIsLoading(false);
  };

  // 초기 데이터 불러오기
  // 데이터 실시간 업데이트 구독
  useLayoutEffect(() => {
    if (!auth.currentUser) {
      navigation.pop();
    }

    getInitDatas();

    unsubscribe.current = onSnapshot(
      query(
        collection(db, "users", auth.currentUser!.uid, "memos"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const updatedDatas = snapshot.docs.map((doc) => ({
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          id: doc.id,
        }));
        setDatas(updatedDatas);
      }
    );
    return () => unsubscribe.current();
  }, []);

  useEffect(() => {
    Toast.show({
      type: "success",
      text1: "로그인 성공",
      text2: "로그인에 성공했습니다",
    });
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrollDown(e.nativeEvent.contentOffset.y > 0);
  };

  const handleLogoutBtn = async () => {
    try {
      // 일기 데이터 구독 해제
      if (unsubscribe.current) {
        unsubscribe.current();
      }
      // 로그아웃 처리
      await signOut(auth);
      // 모든 네비게이션을 SignIn 페이지 하나로 초기화하기
      const targetScreenName: keyof RootStackParamList = "SignIn";
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: targetScreenName }],
        })
      );
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={isScrollDown && { backgroundColor: "#45379f" }}>
        <Text style={styles.screenTitle}>일기</Text>
        <Text style={styles.welcomeText}>Hello, {userName}</Text>
        <Button
          title="logout"
          onPress={handleLogoutBtn}
        />
      </SafeAreaView>
      <Journals
        isLoading={isLoading}
        datas={datas}
        onScroll={handleScroll}
      />
      <NewJournalBtn onPress={() => navigation.navigate("New")} />
      <Toast topOffset={70} />
    </View>
  );
}
