import { ReactElement } from "react";
import { Insets, TouchableOpacity, View } from "react-native";

interface SvgButtonProps {
  size?: number;
  onPress?: () => void;
  SvgComponent: ReactElement;
  hitSlop?: number | Insets | null | undefined;
}

export default function SvgButton({
  size = 32,
  onPress,
  SvgComponent,
  hitSlop,
}: SvgButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}
    >
      <View style={{ width: size, height: size }}>{SvgComponent}</View>
    </TouchableOpacity>
  );
}
