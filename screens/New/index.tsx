import React, { useRef, useState } from "react";
import { Image, TextInput, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import ImageSvg from "assets/svgs/ImageSvg";
import ModalHeader from "components/ModalHeader";
import SvgButton from "components/SvgButton";
import { StatusBar } from "expo-status-bar";
import { useKeyboard } from "hooks/useKeyboard";
import getImageId from "utils/getImageId";
import resizeImage from "utils/resizeImage";
import Toast from "react-native-toast-message";
import styles from "./styles";

type NewScreenNavigationProp = StackNavigationProp<RootStackParamList, "New">;

type Props = {
  navigation: NewScreenNavigationProp;
};

export default function NewScreen({ navigation }: Props) {
  const [value, setValue] = useState("");
  const isLoading = useRef(false);
  const keyboardHeight = useKeyboard();

  const isSelectingImage = useRef(false);
  const imageLoadTimeoutId = useRef(0);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    if (isSelectingImage.current) return;
    isSelectingImage.current = true;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      const { resizedUri: resizedImageUri, resizedSize: resizedImageSize } =
        await resizeImage(result.assets[0].uri, 800, 600);
      if (resizedImageSize > 3 * 1024 * 1024) {
        Toast.show({
          type: "error",
          text1: "이미지 로드 실패",
          text2: "이미지가 너무 큽니다.",
        });
        isSelectingImage.current = false;
        return;
      }
      setImage(resizedImageUri);
      imageLoadTimeoutId.current = Number(
        setTimeout(() => {
          isSelectingImage.current = false;
        }, 3000)
      );
    } else {
      isSelectingImage.current = false;
    }
  };

  const onImageLoad = () => {
    clearTimeout(imageLoadTimeoutId.current);
    isSelectingImage.current = false;
  };

  const uploadImage = async (uri: string, userId: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageId = getImageId(userId);
      const storageRef = ref(storage, `/images/${imageId}`);
      const metadata = {
        customMetadata: {
          uid: userId,
        },
      };
      await uploadBytes(storageRef, blob, metadata);
      const imageURL = await getDownloadURL(storageRef);
      return { imageURL, imageId };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleConfirm = async () => {
    if (isSelectingImage.current) return;
    if (isLoading.current) return;
    isLoading.current = true;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No current user found.");
        isLoading.current = false;
        return;
      }
      const currentUserId = currentUser.uid;

      let imageURL = null;
      let imageId = null;
      if (image) {
        const imageInfo = await uploadImage(image, currentUserId);
        if (!imageInfo) {
          console.error("Image Upload Error :(");
          isLoading.current = false;
          return;
        }
        [imageURL, imageId] = [imageInfo.imageURL, imageInfo.imageId];
        await addDoc(collection(db, "users", currentUserId, "memos"), {
          content: value,
          createdAt: serverTimestamp(),
          image: {
            imageId,
            imageURL,
          },
        });
      } else {
        await addDoc(collection(db, "users", currentUserId, "memos"), {
          content: value,
          createdAt: serverTimestamp(),
          image: null,
        });
      }

      setValue("");
      setImage(null);
      navigation.pop();
    } catch (error) {
      console.error("Error adding memo:", error);
    }
    isLoading.current = false;
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
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
        <View style={[styles.modalContainer, { marginBottom: keyboardHeight }]}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              onLoadEnd={onImageLoad}
            />
          )}
          <TextInput
            style={styles.textInput}
            onChangeText={setValue}
            value={value}
            placeholder="글쓰기를 시작하세요..."
            placeholderTextColor="rgb(189, 189, 189)"
            multiline={true}
            textAlignVertical="top"
            autoFocus={true}
            scrollEnabled={true}
          />
          <View style={styles.imageButtonContainer}>
            <SvgButton
              size={24}
              SvgComponent={ImageSvg}
              hitSlop={24}
              onPress={pickImage}
            />
          </View>
        </View>
        <Toast topOffset={70} />
      </View>
    </>
  );
}
