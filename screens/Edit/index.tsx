import { useEffect, useState, useRef } from "react";
import { TextInput, View, ActivityIndicator, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import ModalHeader from "components/ModalHeader";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { useKeyboard } from "hooks/useKeyboard";

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, "Edit">;
type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

type Props = {
  navigation: EditScreenNavigationProp;
  route: EditScreenRouteProp;
};

export default function EditScreen({ navigation, route }: Props) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isUpdating = useRef(false);

  const journalId = route.params.journalId;
  const keyboardHeight = useKeyboard();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No current user found.");
          return;
        }
        const currentUserId = currentUser.uid;

        const journalRef = doc(db, "users", currentUserId, "memos", journalId);
        const journalDoc = await getDoc(journalRef);

        if (journalDoc.exists()) {
          setValue(journalDoc.data().content);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching journal: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournal();
  }, [journalId]);

  const handleConfirm = async () => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No current user found.");
        return;
      }
      const currentUserId = currentUser.uid;

      const journalRef = doc(db, "users", currentUserId, "memos", journalId);

      await updateDoc(journalRef, {
        content: value,
        updatedAt: serverTimestamp(),
      });

      setValue("");
      navigation.pop();
    } catch (error) {
      console.error("Error updating memo: ", error);
    }
    isUpdating.current = false;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.85)",
        }}
      >
        <ActivityIndicator
          size="large"
          color="rgba(255,255,255,0.5)"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.85)" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 20,
        }}
      >
        <ModalHeader
          left={{
            text: "취소",
            onPress: () => {
              navigation.pop();
            },
          }}
          right={{ text: "확인", onPress: handleConfirm }}
          center={{ text: "일기 수정" }}
        />
        <View style={{ flex: 1, width: "100%", paddingBottom: keyboardHeight }}>
          <TextInput
            style={{
              marginTop: 30,
              width: "100%",
              color: "ghostwhite",
              fontSize: 16,
              flex: 1,
            }}
            onChangeText={setValue}
            value={value}
            placeholder="글쓰기를 시작하세요..."
            placeholderTextColor="ghostwhite"
            multiline={true}
            textAlignVertical="top"
            autoFocus={true}
            scrollEnabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
