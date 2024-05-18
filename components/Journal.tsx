import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  textData: string;
}

const NUM_OF_LINES = 5;

export default function Journal({ textData }: Props) {
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
          <View style={styles.memoContainer}>
            <Text
              style={styles.memoText}
              numberOfLines={isExpand ? lines : NUM_OF_LINES}
              ellipsizeMode="tail"
            >
              {textData}
            </Text>
            {showMore && !isExpand && (
              <Text style={{ color: "ghostwhite" }}>...</Text>
            )}
          </View>
        </Pressable>
      ) : (
        <Text
          onTextLayout={({ nativeEvent: { lines } }) => {
            setLines(lines.length);
            setShowMore(lines.length > NUM_OF_LINES);
          }}
        >
          {textData}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  memoContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  memoText: {
    color: "ghostwhite",
    fontWeight: "500",
    fontSize: 16,
  },
});
