import { RootStackParamList } from "@myTypes/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ImageSvg from "assets/svgs/ImageSvg";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

type ImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Image"
>;
type ImageScreenRouteProp = RouteProp<RootStackParamList, "Image">;

type Props = {
  navigation: ImageScreenNavigationProp;
  route: ImageScreenRouteProp;
};

export default function ImageScreen({ navigation, route }: Props) {
  return (
    <View style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable
          style={{ flex: 1, paddingHorizontal: 20 }}
          onPress={() => navigation.pop()}
        >
          <Image
            source={{ uri: route.params.imageURL }}
            resizeMode="contain"
            borderRadius={40}
            style={{
              width: "100%",
              flex: 1,
              //   backgroundColor: "rgb(153, 153, 153)",
            }}
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
