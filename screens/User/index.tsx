import { RootStackParamList } from "@myTypes/RootStackParamList";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useFirestoreSub } from "hooks/useFirestoreSub";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, "User">;
type UserScreenRouteProp = RouteProp<RootStackParamList, "User">;

type Props = {
  navigation: UserScreenNavigationProp;
  route: UserScreenRouteProp;
};

export default function UserScreen({ navigation, route }: Props) {
  const { userName } = route.params;
  const { unSubscribe } = useFirestoreSub();

  const handleLogoutBtn = async () => {
    try {
      // 일기 데이터 구독 해제
      unSubscribe();
      // 로그아웃 처리
      await signOut(auth);
      // 모든 네비게이션을 SignIn 페이지 하나로 초기화하기
      const targetScreenName: keyof RootStackParamList = "SignIn";
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: targetScreenName }],
        })
      );
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      <SafeAreaView />
      <View>
        <Text>Hi, {userName}</Text>
        <Button
          title="Back"
          onPress={() => navigation.pop()}
        />
        <Button
          title="Logout"
          onPress={handleLogoutBtn}
        />
      </View>
    </>
  );
}
