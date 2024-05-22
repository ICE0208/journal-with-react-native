import React, { useState, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import formatDate from "utils/formatDate";
import Divider from "./Divider";
import JournalModal from "./JournalModal";
import Toast from "react-native-toast-message";

interface Props {
  textData: string;
  id: string;
  createdAt: Date;
}

const NUM_OF_LINES = 5;

export default function Journal({ textData, id, createdAt }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [lines, setLines] = useState(-1);
  const [isExpand, setIsExpand] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);

  const showMenu = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 60, y: py + height });
      setModalVisible(true);
    });
  };

  return (
    <View style={styles.container}>
      {lines !== -1 ? (
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => setIsExpand((prev) => !prev)}
        >
          <View style={styles.journalContainer}>
            <Text
              style={styles.journalText}
              numberOfLines={isExpand ? lines : NUM_OF_LINES}
              ellipsizeMode="tail"
            >
              {textData}
            </Text>
            {showMore && !isExpand && <Text style={styles.moreText}>...</Text>}
            <Divider
              marginTop={14}
              marginBottom={4}
            />
            <View style={styles.footer}>
              <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
              <Pressable
                ref={buttonRef}
                onPress={showMenu}
                hitSlop={{ top: 4, bottom: 4, left: 16, right: 16 }}
              >
                <Text style={styles.showMenuText}>···</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      ) : (
        <View style={styles.journalContainer}>
          <Text
            style={styles.journalText}
            onTextLayout={({ nativeEvent: { lines } }) => {
              setLines(lines.length);
              setShowMore(lines.length > NUM_OF_LINES);
            }}
          >
            {textData}
          </Text>
          <Divider
            marginTop={14}
            marginBottom={4}
          />
          <View style={styles.footer}>
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
            <Pressable
              ref={buttonRef}
              onPress={showMenu}
              hitSlop={{ top: 4, bottom: 4, left: 16, right: 16 }}
            >
              <Text style={styles.showMenuText}>···</Text>
            </Pressable>
          </View>
        </View>
      )}

      <JournalModal
        journalId={id}
        modalPosition={modalPosition}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: 20,
  },
  pressable: {
    opacity: 1,
  },
  journalContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
  },
  journalText: {
    color: "ghostwhite",
    fontWeight: "500",
    fontSize: 16,
  },
  moreText: {
    color: "ghostwhite",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,10.9)",
  },
  showMenuText: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
    paddingVertical: 5,
  },
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
