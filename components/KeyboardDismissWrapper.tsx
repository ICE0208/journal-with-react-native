import React from "react";
import { Keyboard, Pressable } from "react-native";

export default function KeyboardDismissWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </Pressable>
  );
}
