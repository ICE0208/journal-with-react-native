import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Keyboard } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";
import AuthInput from "components/AuthInput";
import Toast from "react-native-toast-message";
import { RouteProp } from "@react-navigation/native";
import KeyboardDismissWrapper from "components/KeyboardDismissWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;
type SignInScreenRouteProp = RouteProp<RootStackParamList, "SignIn">;

type Props = {
  navigation: SignInScreenNavigationProp;
  route: SignInScreenRouteProp;
};

export default function LoginScreen({ navigation, route }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        setMessageColor("green");
        navigation.replace("Home", {
          userName: userCredential.user.displayName ?? "NULL",
        });
      })
      .catch((error: { message: string }) => {
        Toast.show({
          type: "error",
          text1: "로그인 실패",
          text2: `${error.message}`,
        });
      });
  };

  useEffect(() => {
    if (route.params.signUpSuccess) {
      Toast.show({
        type: "success",
        text1: "회원가입 성공",
        text2: "회원가입에 성공했습니다",
      });
    }
  }, []);

  return (
    <KeyboardDismissWrapper>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        extraHeight={80} // For Android
        extraScrollHeight={80} // For IOS
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <AuthInput
            label="Email ID"
            value={id}
            onChangeText={(v) => setId(v)}
            placeholder="abc123@gmail.com"
          />
          <AuthInput
            label="Password"
            value={password}
            onChangeText={(v) => setPassword(v)}
            placeholder="1234*#"
            type="PASSWORD"
          />
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              { width: "100%", display: "flex", alignItems: "center" },
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            style={({ pressed }) => [
              { width: "100%", display: "flex", alignItems: "center" },
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </View>
          </Pressable>
          <Toast topOffset={70} />
        </View>
      </KeyboardAwareScrollView>
    </KeyboardDismissWrapper>
  );
}
