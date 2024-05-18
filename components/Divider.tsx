import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  color?: string;
  marginTop?: number;
  marginBottom?: number;
}

const Divider = ({
  color = "rgba(255,255,255,0.3)",
  marginTop = 8,
  marginBottom = 8,
}: Props) => {
  return (
    <View
      style={[
        styles.divider,
        { borderBottomColor: color, marginBottom, marginTop },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    borderBottomWidth: 1.4,
  },
});

export default Divider;
