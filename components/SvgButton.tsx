import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";

interface SvgButtonProps {
  size?: number;
  onPress?: () => void;
  SvgComponent: ReactElement;
}

export default function SvgButton({
  size = 32,
  onPress,
  SvgComponent,
}: SvgButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: size, height: size }}>{SvgComponent}</View>
    </TouchableOpacity>
  );
}
