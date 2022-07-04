import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

import LoginScreen from "./screen/auth/LoginScreen.js";
import RegisterScreen from "./screen/auth/RegisterScreen.js";

import PostScreen from "./screen/main/PostScreen";
// import NestedPostScreen from "./screen/main/NestedPostScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <AuthStack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <PostScreen />
    // <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
    //   <MainTab.Screen
    //     name="Posts"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focus, size, color }) => (
    //         <MaterialCommunityIcons
    //           name="post-outline"
    //           size={30}
    //           color="#7477ff"
    //         />
    //       ),
    //     }}
    //     component={PostScreen}
    //     f
    //   />
    //   <MainTab.Screen
    //     name="Photo"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focus, size, color }) => (
    //         <FontAwesome name="photo" size={size} color="#7477ff" />
    //       ),
    //     }}
    //     component={NestedPostScreen}
    //   />
    // </MainTab.Navigator>
  );
};
