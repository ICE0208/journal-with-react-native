import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import formatDate from "utils/formatDate";

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

  return (
    <>
      {lines !== -1 ? (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
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
            {showMore && !isExpand && (
              <Text style={{ color: "ghostwhite" }}>...</Text>
            )}
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1.4,
                borderBottomColor: "rgba(255,255,255,0.3)",
                marginTop: 14,
                marginBottom: 8,
              }}
            />
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
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
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1.4,
              borderBottomColor: "rgba(255,255,255,0.3)",
              marginTop: 14,
              marginBottom: 8,
            }}
          />
          <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  journalContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  journalText: {
    color: "ghostwhite",
    fontWeight: "500",
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: "rgba(255,255,255,10.9)",
  },
});
