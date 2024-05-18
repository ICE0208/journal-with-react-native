import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import styles from "./styles";
import Journal from "components/Journal";
import Toast from "react-native-toast-message";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation, route }: Props) {
  const [datas, setDatas] = useState<
    { content: string; createdAt: Timestamp; id: string }[]
  >([]);
  const { userName } = route.params;
  const unsubscribe = useRef<Unsubscribe>(() => {});
  const [isScrollDown, setIsScrollDown] = useState(false);

  // 메모 실시간 업데이트 구독
  useLayoutEffect(() => {
    if (!auth.currentUser) {
      navigation.pop();
    }

    unsubscribe.current = onSnapshot(
      query(
        collection(db, "users", auth.currentUser!.uid, "memos"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const updatedDatas = snapshot.docs.map((doc) => ({
          content: doc.data().content,
          createdAt: doc.data().createdAt,
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={isScrollDown && { backgroundColor: "#45379f" }}>
        <Text style={styles.screenTitle}>일기</Text>
        <Text style={styles.welcomeText}>Hello, {userName}</Text>
      </SafeAreaView>
      {datas.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.memosContainer}
          onScroll={handleScroll}
          scrollEventThrottle={100}
        >
          {datas.map((data) => (
            <Journal
              key={data.id}
              textData={data.content}
              id={data.id}
              createdAt={data.createdAt?.toDate() ?? new Date()}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.nothingContainer}>
          <Text style={styles.nothingText}>Nothing Here</Text>
          <Text style={styles.nothingText2}>
            + 버튼을 눌러서 새 일기를 작성해주세요.
          </Text>
        </View>
      )}
      <Pressable
        onPress={() => navigation.navigate("New")}
        style={({ pressed }) => [
          {
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 40,
          },
          { opacity: pressed ? 0.6 : 0.9 },
        ]}
      >
        <View
          style={{
            backgroundColor: "royalblue",
            width: 70,
            height: 70,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "ghostwhite",
              padding: 12,
              paddingBottom: 22,
              fontWeight: 600,
              fontSize: 36,
            }}
          >
            +
          </Text>
        </View>
      </Pressable>
      <Toast topOffset={70} />
    </View>
  );
}
