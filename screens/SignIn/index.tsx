import React, { useEffect, useRef, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Unsubscribe, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";
import AuthInput from "components/AuthInput";
import Toast from "react-native-toast-message";
import { RouteProp } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseError } from "firebase/app";
import { validateId, validatePassword } from "utils/validateData";
import { StatusBar } from "expo-status-bar";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;
type SignInScreenRouteProp = RouteProp<RootStackParamList, "SignIn">;

type Props = {
  navigation: SignInScreenNavigationProp;
  route: SignInScreenRouteProp;
};

let firstLoaded = true;

export default function LoginScreen({ navigation, route }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    let unSubscribe: Unsubscribe | null = null;
    if (firstLoaded) {
      firstLoaded = false;
      unSubscribe = auth.onAuthStateChanged((user) => {
        if (unSubscribe) unSubscribe();
        if (user) {
          // 로그인 된 상태일 경우
          navigation.replace("Home", {
            userName: user.displayName ?? "NULL",
          });
        } else {
          // 로그아웃 된 상태일 경우
          setIsInitLoading(false);
        }
      });
    }

    return () => {
      if (unSubscribe) unSubscribe();
    };
  }, []);

  const handleLogin = () => {
    if (isSubmitLoading) return;
    setIsSubmitLoading(true);

    const idValidateResponse = validateId(id);
    if (idValidateResponse.ok === false) {
      Toast.show({
        type: "error",
        text1: "로그인 실패",
        text2: idValidateResponse.msg,
      });
      return setIsSubmitLoading(false);
    }

    const passwordValidateResponse = validatePassword(password);
    if (passwordValidateResponse.ok === false) {
      Toast.show({
        type: "error",
        text1: "로그인 실패",
        text2: passwordValidateResponse.msg,
      });
      return setIsSubmitLoading(false);
    }

    signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        navigation.replace("Home", {
          userName: userCredential.user.displayName ?? "NULL",
        });
      })
      .catch((error) => {
        let text2 = "잠시후 다시 시도해주세요.";
        if (error instanceof FirebaseError) {
          text2 = error.message;
        }
        Toast.show({
          type: "error",
          text1: "로그인 실패",
          text2,
        });
      })
      .finally(() => setIsSubmitLoading(false));
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
    <>
      <StatusBar style="dark" />
      {firstLoaded && isInitLoading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>Loading...</Text>
        </View>
      ) : (
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
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={handleLogin}
                hitSlop={5}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.8 : 1 },
                  styles.loginButton,
                ]}
              >
                <Text style={styles.loginButtonText}>
                  {isSubmitLoading ? "Loading..." : "Login"}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("SignUp")}
                hitSlop={5}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1 },
                  styles.signUpButton,
                ]}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </Pressable>
            </View>
            <Toast topOffset={70} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}
