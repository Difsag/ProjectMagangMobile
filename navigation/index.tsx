/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import LupaPasswordScreen from "../screens/LupaPasswordScreen";
import Welcome from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeSreen";
import ListScreen from "../screens/ListScreen";
import ProjectsByTeam from "../screens/ProjectsByTeam";
import { RootStackParamList } from "../types";
import AkunScreen from "../screens/AkunScreen";
import MembersByTeam from "../screens/MembersByTeam";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LupaPassword" component={LupaPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Akun" component={AkunScreen} />
      <Stack.Screen name="ProjectsByTeam" component={ProjectsByTeam} />
      <Stack.Screen name="MembersByTeam" component={MembersByTeam} />
    </Stack.Navigator>
  );
}
