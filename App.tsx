import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUpScreen from "@screens/SignUp";
import LoginScreen from "@screens/SignIn";
import HomeScreen from "@screens/Home";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewScreen from "@screens/New";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import EditScreen from "@screens/Edit";
import UserScreen from "@screens/User";
import { Unsubscribe } from "firebase/firestore";
import FirestoreSubProvider from "components/FirestoreSubProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <FirestoreSubProvider>
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
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{
                title: "일기 수정",
                headerShown: false,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="User"
              component={UserScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
          </Stack.Navigator>
        </FirestoreSubProvider>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}
