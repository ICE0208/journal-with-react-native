import { useActionSheet } from "@expo/react-native-action-sheet";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  journalId: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalPosition: { x: number; y: number };
}

export default function JournalModal({
  journalId,
  modalVisible,
  setModalVisible,
  modalPosition,
}: Props) {
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Home">>();

  const handleEdit = async () => {
    setModalVisible(false);

    setTimeout(() => {
      navigation.navigate("Edit", { journalId });
    });
  };

  const handleDelete = async (memoId: string) => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const message =
      "해당 일기를 삭제하시겠습니까? 이 동작을 취소할 수 없습니다.";

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        message,
        autoFocus: true,
      },
      async (selectedIndex: number | undefined) => {
        if (selectedIndex === destructiveButtonIndex) {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            console.error("No current user found.");
            return;
          }
          const currentUserId = currentUser.uid;

          try {
            await deleteDoc(doc(db, "users", currentUserId, "memos", memoId));
            console.log("Memo deleted successfully");
            Toast.show({
              type: "success",
              text1: "삭제 완료",
              text2: "선택한 일기가 삭제되었습니다.",
            });
          } catch (error) {
            let text2 = "선택한 일기를 삭제하는데 실패했습니다.";
            if (error instanceof FirebaseError) {
              text2 = error.message;
            }
            console.error("Error deleting memo: ", error);
            Toast.show({
              type: "error",
              text1: "삭제 실패",
              text2: text2,
            });
          } finally {
            setModalVisible(false);
          }
        }
      }
    );
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={[styles.menu, { top: modalPosition.y, left: modalPosition.x }]}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleEdit}
          >
            <Text style={styles.editButtonText}>편집</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleDelete(journalId)}
          >
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    backgroundColor: "rgba(20,20,20,0.7)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 30,
    zIndex: 1000,
  },
  menuButton: {
    padding: 10,
    marginVertical: 2,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButtonText: {
    color: "tomato",
    fontSize: 16,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
});
