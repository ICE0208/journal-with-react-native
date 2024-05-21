import React, { useState, useLayoutEffect, useEffect } from "react";
import {
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
  getDocs,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import styles from "./styles";
import Toast from "react-native-toast-message";
import Journals from "components/Journals";
import NewJournalBtn from "components/NewJournalBtn";
import { JournalDatas } from "@myTypes/JournalDatas";
import UserButtn from "components/UserButton";
import { useFirestoreSub } from "hooks/useFirestoreSub";
import { StatusBar } from "expo-status-bar";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation, route }: Props) {
  const [datas, setDatas] = useState<JournalDatas>([]);
  const { userName } = route.params;
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUnSubscribe } = useFirestoreSub();

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

    const unSubscribe = onSnapshot(
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
    setUnSubscribe(unSubscribe);
    return () => unSubscribe();
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

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <SafeAreaView style={isScrollDown && { backgroundColor: "#45379f" }}>
          <View style={styles.header}>
            <View>
              <Text style={styles.screenTitle}>일기</Text>
              <Text style={styles.welcomeText}>Hello, {userName}</Text>
            </View>
            <UserButtn
              size={40}
              onPress={() =>
                navigation.navigate("User", {
                  userName,
                })
              }
            />
          </View>
        </SafeAreaView>
        <Journals
          isLoading={isLoading}
          datas={datas}
          onScroll={handleScroll}
        />
        <NewJournalBtn onPress={() => navigation.navigate("New")} />
        <Toast topOffset={70} />
      </View>
    </>
  );
}
