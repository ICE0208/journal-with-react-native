import { TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";

interface UserButtonProps {
  size?: number;
  onPress?: () => void;
}

export default function UserButtn({ size = 32, onPress }: UserButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: size, height: size }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6"
        >
          <Path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}
