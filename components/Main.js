import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { authStateChangeUser } from "../redax/auth/authOperations";
import { useRoute } from "../router";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const { preloading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          "Abel-Reguler": require("../assets/fonts/Abel-Regular.ttf"),
          "FjallaOne-Regular": require("../assets/fonts/FjallaOne-Regular.ttf"),
          "Asap-Regular": require("../assets/fonts/Asap-Regular.ttf"),
        });

        dispatch(authStateChangeUser());
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function checkAppIsReady() {
      if (!preloading) {
        await SplashScreen.hideAsync();
      }
    }
    checkAppIsReady();
  }, [preloading]);

  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
