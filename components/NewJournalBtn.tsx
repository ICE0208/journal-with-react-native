import { GestureResponderEvent, Pressable, Text, View } from "react-native";

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

export default function NewJournalBtn({ onPress }: Props) {
  return (
    <View
      style={{
        bottom: 40,
        // alignSelf: "center",
        position: "absolute",
        alignSelf: "center",
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: "royalblue",
            width: 70,
            height: 70,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
          },
          { opacity: pressed ? 0.6 : 0.9 },
        ]}
      >
        <Text
          style={{
            color: "ghostwhite",
            padding: 12,
            paddingBottom: 22,
            fontWeight: 600,
            fontSize: 36,
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}
