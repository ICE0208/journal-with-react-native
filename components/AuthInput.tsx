import React from "react";
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
} from "react-native";
import { TextInput, View } from "react-native";

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "TEXT" | "PASSWORD";
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
}

export default function AuthInput({
  label = "Input",
  value,
  onChangeText,
  placeholder = "",
  type = "TEXT",
  onEndEditing,
}: Props) {
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        // 애플의 강력한 암호 제안을 취소했을 때
        // onChangeText가 트리거 되지 않는 문제때문에 onEndEditing으로 임시 해결
        onEndEditing={onEndEditing}
        secureTextEntry={type === "PASSWORD"}
        onFocus={() => {
          if (type === "PASSWORD" && Platform.OS === "ios") {
            onChangeText("");
          }
        }}
        placeholder={placeholder}
        placeholderTextColor="rgb(200, 200, 200)"
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
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
});
