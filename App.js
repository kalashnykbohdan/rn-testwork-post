import React from "react";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "NativeBase: The contrast ratio of",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import { Provider } from "react-redux";
import { store } from "./redax/store";

import Main from "./components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
