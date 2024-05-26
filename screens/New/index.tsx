import { RootStackParamList } from "@myTypes/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import ImageSvg from "assets/svgs/ImageSvg";
import ModalHeader from "components/ModalHeader";
import SvgButton from "components/SvgButton";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { useKeyboard } from "hooks/useKeyboard";
import { useRef, useState } from "react";
import { Image, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

type NewScreenNavigationProp = StackNavigationProp<RootStackParamList, "New">;

type Props = {
  navigation: NewScreenNavigationProp;
};

export default function NewScreen({ navigation }: Props) {
  const [value, setValue] = useState("");
  const isLoading = useRef(false);
  const keyboardHeight = useKeyboard();

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    try {
      // 현재 사용자의 UID 가져오기
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No current user found.");
        return;
      }
      const currentUserId = currentUser.uid;

      // 'memos' 컬렉션에 메모 추가
      await addDoc(collection(db, "users", currentUserId, "memos"), {
        content: value,
        createdAt: serverTimestamp(),
      });

      // 메모 추가 후 입력 필드 비우기
      setValue("");
      navigation.pop();
    } catch (error) {
      console.error("Error adding memo: ", error);
    }
    isLoading.current = false;
  };

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.85)",
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
          center={{ text: "새로운 일기" }}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
            marginTop: 20,
            marginBottom: keyboardHeight,
            position: "relative",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
                borderRadius: 16,
                marginBottom: 16,
              }}
            />
          )}
          <TextInput
            style={{
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
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "rgb(86, 86, 86)e",
              borderRadius: 30,
              position: "absolute",
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgButton
              size={24}
              SvgComponent={ImageSvg}
              hitSlop={24}
              onPress={pickImage}
            />
          </View>
        </View>
      </View>
    </>
  );
}
