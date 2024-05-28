import { useEffect, useState, useRef } from "react";
import {
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import ModalHeader from "components/ModalHeader";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "firebaseConfig";
import { useKeyboard } from "hooks/useKeyboard";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import resizeImage from "utils/resizeImage";
import Toast from "react-native-toast-message";
import getImageId from "utils/getImageId";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import SvgButton from "components/SvgButton";
import ImageSvg from "assets/svgs/ImageSvg";

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, "Edit">;
type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

type Props = {
  navigation: EditScreenNavigationProp;
  route: EditScreenRouteProp;
};

export default function EditScreen({ navigation, route }: Props) {
  const { journalId, editTextData, editImageData } = route.params;
  const [value, setValue] = useState(editTextData);
  const isUpdating = useRef(false);
  const keyboardHeight = useKeyboard();

  const isSelectingImage = useRef(false);
  const imageLoadTimeoutId = useRef(0);
  const [image, setImage] = useState<string | null>(
    editImageData?.imageURL ?? null
  );

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

      // 이미지 데이터가 똑같다면
      if (image === editImageData?.imageURL) {
        // value만 업데이트
        await updateDoc(journalRef, {
          content: value,
          updatedAt: serverTimestamp(),
        });
      }
      // 이미지 데이터가 바뀌었는데, 이미지가 존재함.
      else if (image !== null) {
        // 기존 이미지가 있다면 지우기
        if (editImageData) {
          const imageRef = ref(storage, `/images/${editImageData.imageId}`);
          await deleteObject(imageRef);
        }
        // 새로운 이미지 업로드하기
        const imageInfo = await uploadImage(image, currentUserId);
        if (!imageInfo) {
          console.error("Image Upload Error :(");
          isUpdating.current = false;
          return;
        }
        // 이미지와 value 업데이트
        await updateDoc(journalRef, {
          content: value,
          updatedAt: serverTimestamp(),
          image: {
            imageId: imageInfo.imageId,
            imageURL: imageInfo.imageURL,
          },
        });
      }
      // 이미지 데이터가 바뀌었는데, 이미지가 존재하지 않음.
      else {
        // 기존 이미지가 있다면 지우기
        if (editImageData) {
          const imageRef = ref(storage, `/images/${editImageData.imageId}`);
          await deleteObject(imageRef);
        }
        // value만 업데이트
        await updateDoc(journalRef, {
          content: value,
          updatedAt: serverTimestamp(),
        });
      }

      setValue("");
      setImage(null);
      navigation.pop();
    } catch (error) {
      console.error("Error updating memo: ", error);
    }
    isUpdating.current = false;
  };

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 20,
          backgroundColor: "rgba(0,0,0,0.85)",
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
        <View
          style={{
            flex: 1,
            width: "100%",
            marginBottom: keyboardHeight,
            marginTop: 20,
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
              onLoadEnd={onImageLoad}
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
              backgroundColor: "rgb(86, 86, 86)",
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
        <Toast topOffset={70} />
      </View>
    </>
  );
}
