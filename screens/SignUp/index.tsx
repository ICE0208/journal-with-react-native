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

  const handleSignUp = () => {
    if (isLoading) return;
    setIsLoading(true);

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "비밀번호 불일치",
        text2: "비밀번호와 비밀번호 확인을 같게 해주세요.",
      });
      return;
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
          label="Password"
          value={password}
          onChangeText={(v) => setPassword(v)}
          placeholder="1234*#"
          type="PASSWORD"
        />
        <AuthInput
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
