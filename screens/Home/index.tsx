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
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import styles from "./styles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation, route }: Props) {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState<string[]>([]);
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
        const updatedMemos = snapshot.docs.map((doc) => doc.data().content);
        setMemos(updatedMemos);
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
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.memosContainer}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        {memos.map((memo, index) => (
          <View
            key={index}
            style={styles.memoContainer}
          >
            <Text style={styles.memoText}>{memo}</Text>
          </View>
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
