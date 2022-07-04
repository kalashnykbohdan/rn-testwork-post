import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPhotoScreen from "../nestedScreens/DefaultPhotoScreen";
import PhotoNestedScreen from "../nestedScreens/PhotoNestedScreen";

const NestedScreen = createStackNavigator();

const NestedPostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        options={{ headerShown: false }}
        component={DefaultPhotoScreen}
      />
      <NestedScreen.Screen name="PhotoNested" component={PhotoNestedScreen} />
    </NestedScreen.Navigator>
  );
};

export default NestedPostScreen;
