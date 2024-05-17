// HomeScreen.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@myTypes/RootStackParamList";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ route }: Props) {
  const { userName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
  },
});
