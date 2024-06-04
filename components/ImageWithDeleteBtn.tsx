import React from "react";
import { Image, ImageProps, Pressable, Text, View } from "react-native";

const DELETE_BTN_SIZE = 24;

interface ImagePreviewProps extends ImageProps {
  onDelete?: () => void;
}

export const ImageWithDeleteBtn = ({
  onDelete,
  ...props
}: ImagePreviewProps) => (
  <View style={{ position: "relative" }}>
    <Image
      source={props.source}
      style={[props.style]} // 추가된 스타일을 병합합니다.
      onLoadEnd={props.onLoadEnd}
      {...props} // 나머지 props를 추가합니다.
    />
    <Pressable
      onPress={onDelete}
      hitSlop={8}
      style={{
        width: DELETE_BTN_SIZE,
        height: DELETE_BTN_SIZE,
        borderRadius: DELETE_BTN_SIZE / 2,
        backgroundColor: "rgb(53, 53, 53)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 6,
        left: 6,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>×</Text>
    </Pressable>
  </View>
);
