import React, { useState } from "react";
import { Text, View, Button, Pressable } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import styles from "./style";
import AuthInput from "components/AuthInput";

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
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageColor("red");
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
        setMessage("Account created successfully!");
        setMessageColor("green");
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        setMessage(error.message);
        setMessageColor("red");
      });
  };

  return (
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
          <Text style={styles.SsignUpButtonText}>Sign Up</Text>
        </View>
      </Pressable>
      {message ? <Text style={{ color: messageColor }}>{message}</Text> : null}
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
    </View>
  );
}
