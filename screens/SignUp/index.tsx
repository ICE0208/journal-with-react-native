import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";
import AuthInput from "components/AuthInput";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseError } from "firebase/app";
import { validateId, validateName, validatePassword } from "utils/validateData";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password 입력이 끝났을 때 password와 confirmPassword가 리렌더링 되도록하는 Key 상태값
  // 리렌더링 이유: IOS 비밀번호 제안 때문에 발생하는 입력 문제
  const [dateKey, setDateKey] = useState(Date.now());

  const handleSignUp = () => {
    if (isLoading) return;
    setIsLoading(true);

    const nameValidateResponse = validateName(name);
    if (nameValidateResponse.ok === false) {
      Toast.show({
        type: "error",
        text1: "회원가입 실패",
        text2: nameValidateResponse.msg,
      });
      return setIsLoading(false);
    }

    const idValidateResponse = validateId(id);
    if (idValidateResponse.ok === false) {
      Toast.show({
        type: "error",
        text1: "회원가입 실패",
        text2: idValidateResponse.msg,
      });
      return setIsLoading(false);
    }

    const passwordValidateResponse = validatePassword(password);
    if (passwordValidateResponse.ok === false) {
      Toast.show({
        type: "error",
        text1: "회원가입 실패",
        text2: passwordValidateResponse.msg,
      });
      return setIsLoading(false);
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "비밀번호 불일치",
        text2: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      });
      return setIsLoading(false);
    }

    createUserWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
        });
      })
      .then(() => {
        navigation.replace("SignIn", { signUpSuccess: true });
      })
      .catch((error) => {
        let text2 = "잠시후 다시 시도해주세요.";
        if (error instanceof FirebaseError) {
          text2 = error.message;
        }
        Toast.show({
          type: "error",
          text1: "가입 실패",
          text2,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#fff" }}
      extraHeight={80} // For Android
      extraScrollHeight={80} // For IOS
    >
      <View style={styles.container}>
        <AuthInput
          label="Name"
          value={name}
          onChangeText={(v) => setName(v)}
          placeholder="abc123"
        />
        <AuthInput
          label="Email ID"
          value={id}
          onChangeText={(v) => setId(v)}
          placeholder="abc123@gmail.com"
        />
        <AuthInput
          key={dateKey + "-password"}
          label="Password"
          value={password}
          onChangeText={(v) => setPassword(v)}
          placeholder="1234*#"
          type="PASSWORD"
          onEndEditing={(e) => {
            setPassword(e.nativeEvent.text);
            setDateKey(Date.now());
            if (confirmPassword !== e.nativeEvent.text) {
              setConfirmPassword("");
            }
          }}
        />
        <AuthInput
          key={dateKey + "-confirmPassword"}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(v) => setConfirmPassword(v)}
          placeholder="1234*#"
          type="PASSWORD"
        />
        <Pressable
          onPress={handleSignUp}
          style={({ pressed }) => [
            { width: "100%", display: "flex", alignItems: "center" },
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <View style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.pop()}
          style={({ pressed }) => [
            { width: "100%", display: "flex", alignItems: "center" },
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </Pressable>
        <Toast
          topOffset={20}
          config={{}}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
