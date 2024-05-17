import React, {
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import styles from "./styles";
import { throttle } from "lodash";
import { isCallChain } from "typescript";

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

  // const handleAddMemo = async () => {
  //   try {
  //     // 현재 사용자의 UID 가져오기
  //     const currentUser = auth.currentUser;
  //     if (!currentUser) {
  //       console.error("No current user found.");
  //       return;
  //     }
  //     const currentUserId = currentUser.uid;

  //     // 'memos' 컬렉션에 메모 추가
  //     await addDoc(collection(db, "users", currentUserId, "memos"), {
  //       content: memo,
  //       createdAt: serverTimestamp(),
  //     });

  //     // 메모 추가 후 입력 필드 비우기
  //     setMemo("");
  //   } catch (error) {
  //     console.error("Error adding memo: ", error);
  //   }
  // };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrollDown(e.nativeEvent.contentOffset.y > 0);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={isScrollDown && { backgroundColor: "#45379f" }}>
        <Text style={styles.screenTitle}>일기</Text>
      </SafeAreaView>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter memo"
        value={memo}
        onChangeText={setMemo}
      />
      <Button
        title="Add Memo"
        onPress={handleAddMemo}
      />
      <Button
        title="Logout"
        onPress={async () => {
          try {
            unsubscribe.current();
            await auth.signOut();
            navigation.replace("SignIn");
            // 로그아웃 성공 후 필요한 작업
          } catch (error) {
            console.error("Error signing out: ", error);
          }
        }}
      /> */}
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
    </View>
  );
}
