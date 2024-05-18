import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  modalId: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalPosition: { x: number; y: number };
}

export default function JournalModal({
  modalId,
  modalVisible,
  setModalVisible,
  modalPosition,
}: Props) {
  const handleEdit = () => {
    console.log("Edit button clicked");
    setModalVisible(false);
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    setModalVisible(false);
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
            onPress={handleDelete}
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
