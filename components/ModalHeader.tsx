import { GestureResponderEvent, Pressable, Text, View } from "react-native";

interface Props {
  left: {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
  };
  right: {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
  };
  center: {
    text: string;
    color?: string;
  };
}

export default function ModalHeader({ left, right, center }: Props) {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Pressable
        onPress={left.onPress}
        style={({ pressed }) => [
          {
            position: "absolute",
            left: 0,
          },
          { opacity: pressed ? 0.6 : 0.8 },
        ]}
      >
        <Text
          style={{
            color: left.color ?? "gray",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          {left.text}
        </Text>
      </Pressable>
      <Text
        style={{
          color: center.color ?? "white",
          fontWeight: 600,
          fontSize: 20,
        }}
      >
        {center.text}
      </Text>
      <Pressable
        onPress={right.onPress}
        style={({ pressed }) => [
          {
            position: "absolute",
            right: 0,
          },
          { opacity: pressed ? 0.6 : 0.8 },
        ]}
      >
        <Text
          style={{
            color: right.color ?? "slateblue",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          {right.text}
        </Text>
      </Pressable>
    </View>
  );
}
