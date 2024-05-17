// LoginScreen.tsx
import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";

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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      {message ? <Text style={{ color: messageColor }}>{message}</Text> : null}
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}
