import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
        navigation.navigate("Login");
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
      />
      {message ? <Text style={{ color: messageColor }}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    width: "100%",
    paddingHorizontal: 8,
  },
});
