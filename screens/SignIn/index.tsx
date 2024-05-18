import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";
import AuthInput from "components/AuthInput";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        setMessage("Logged in successfully!");
        setMessageColor("green");
        navigation.replace("Home", {
          userName: userCredential.user.displayName ?? "NULL",
        });
      })
      .catch((error) => {
        setMessage(error.message);
        setMessageColor("red");
      });
  };

  return (
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
      {message ? <Text style={{ color: messageColor }}>{message}</Text> : null}
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={({ pressed }) => [
          { width: "100%", display: "flex", alignItems: "center" },
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <View style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>SignUp</Text>
        </View>
      </Pressable>
    </View>
  );
}
