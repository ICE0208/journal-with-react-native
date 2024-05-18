import ModalHeader from "components/ModalHeader";
import { Text, View } from "react-native";

export default function NewScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ModalHeader
        left={{ text: "취소", onPress: (e) => {} }}
        right={{ text: "확인", onPress: (e) => {} }}
        center={{ text: "새로운 일기" }}
      />
    </View>
  );
}
