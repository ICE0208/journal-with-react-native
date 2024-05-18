import React, { useState } from "react";
import { Text, TextInput, View, Button, Pressable } from "react-native";
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
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          placeholder="abc123@gmail.com"
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="1234*#"
        />
      </View>
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
