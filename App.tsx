import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUpScreen from "@screens/SignUp";
import LoginScreen from "@screens/SignIn";
import HomeScreen from "@screens/Home";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
