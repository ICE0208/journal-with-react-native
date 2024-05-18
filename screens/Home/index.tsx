import React, { useState, useLayoutEffect, useRef } from "react";
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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrollDown(e.nativeEvent.contentOffset.y > 0);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={isScrollDown && { backgroundColor: "#45379f" }}>
        <Text style={styles.screenTitle}>일기</Text>
        <Text style={styles.welcomeText}>Hello, {userName}</Text>
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.memosContainer}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        {datas.map((data, index) => (
          <Journal
            key={data.id}
            textData={data.content}
            id={data.id}
            createdAt={data.createdAt?.toDate() ?? new Date()}
          />
        ))}
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate("New")}
        style={({ pressed }) => [
          {
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 34,
          },
          { opacity: pressed ? 0.6 : 0.8 },
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
              fontWeight: 400,
              fontSize: 32,
            }}
          >
            +
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
