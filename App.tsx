import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUpScreen from "@screens/SignUp";
import LoginScreen from "@screens/SignIn";
import HomeScreen from "@screens/Home";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewScreen from "@screens/New";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
          initialParams={{ signUpSuccess: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="New"
          component={NewScreen}
          options={{
            title: "새로운 일기 작성",
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
