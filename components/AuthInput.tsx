import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput, View } from "react-native";

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "TEXT" | "PASSWORD";
}

export default function AuthInput({
  label = "Input",
  value,
  onChangeText,
  placeholder = "",
  type = "TEXT",
}: Props) {
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === "PASSWORD"}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    display: "flex",
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
});
