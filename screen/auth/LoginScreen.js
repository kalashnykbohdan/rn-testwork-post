import React, { useState, useEffect, useCallback } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { authSignInUser } from "./../../redax/auth/authOperations";
import { useDispatch } from "react-redux";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  handlevalidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "E-mail not specified";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Wrong E-mail";
    }
    if (!values.password) {
      errors.password = "Password not specified";
    } else if (values.password.length < 6 || values.password.length > 12) {
      errors.password = "Password should contain 6-12 characters";
    }
    return errors;
  };

  const [heightY, setHeightY] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const onChange = () => {
      const height = Dimensions.get("window").height;
      setHeightY(height);
    };
    dimensionsSubscription = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsSubscription?.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={handlevalidate}
              onSubmit={({ email, password }) => {
                Keyboard.dismiss();
                dispatch(authSignInUser(email, password));
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <View
                  style={{
                    ...styles.form,
                    marginTop: heightY / 4,
                  }}
                >
                  <View style={styles.header}>
                    <Text style={styles.titleLogin}>Welcome to Login</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      value={values.email}
                      placeholder="Email"
                      placeholderTextColor="white"
                      onChangeText={handleChange("email")}
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {touched.email && errors.email}
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      secureTextEntry={true}
                      value={values.password}
                      placeholder="Password"
                      placeholderTextColor="white"
                      onChangeText={handleChange("password")}
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {touched.password && errors.password}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textButton}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.wrapTextButtonRegistr}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.textButtonNavig}>
                New to application?
                <Text style={styles.textButtonRegistr}> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#fff",
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  titleLogin: {
    fontSize: 24,
    color: "#7477ff",
    // fontFamily: "Asap-Regular",
  },
  form: {
    // marginTop: 100,
    justifyContent: "center",
    marginHorizontal: 60,
  },
  input: {
    backgroundColor: "#7477ff",
    height: 45,
    borderRadius: 6,
    color: "#ffff",
    fontSize: 18,
    // fontFamily: "Asap-Regular",
  },
  button: {
    backgroundColor: "#3faaff",
    marginHorizontal: 60,
    borderRadius: 10,
    height: 45,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#ffff",
    fontSize: 18,
    // fontFamily: "Asap-Regular",
  },
  wrapTextButtonRegistr: {
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 10,
  },
  textButtonNavig: {
    color: "#7477ff",
  },
  textButtonRegistr: {
    color: "#3faaff",
  },
  errorText: {
    color: "#FF0000",
  },
});
