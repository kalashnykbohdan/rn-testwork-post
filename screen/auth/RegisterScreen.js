import React from "react";
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
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { authSignUpUser } from "./../../redax/auth/authOperations";
import { useDispatch } from "react-redux";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  handlevalidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name not specified";
    }
    if (!values.email) {
      errors.email = "E-mail not specified";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Wrong E-mail";
    }
    if (!values.chekpassword) {
      errors.chekpassword = "Password not specified";
    } else if (
      values.chekpassword.length < 6 ||
      values.chekpassword.length > 12
    ) {
      errors.chekpassword = "Password should contain 6-12 characters";
    }
    if (!values.password) {
      errors.password = "Repeat password not specified";
    } else if (values.chekpassword !== values.password) {
      errors.password = "Password do not match";
    }
    return errors;
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Formik
              initialValues={{
                name: "",
                email: "",
                chekpassword: "",
                password: "",
              }}
              validate={handlevalidate}
              onSubmit={({ name, email, password }) => {
                Keyboard.dismiss();

                dispatch(authSignUpUser(name, email, password));
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <View style={styles.form}>
                  <View style={styles.header}>
                    <Text style={styles.titleLogin}>
                      Welcome to registration
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      value={values.name}
                      onChangeText={handleChange("name")}
                    />
                    <Text style={styles.errorText}>
                      {touched.name && errors.name}
                    </Text>
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                    <Text style={styles.errorText}>
                      {touched.email && errors.email}
                    </Text>
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      secureTextEntry={true}
                      value={values.chekpassword}
                      onChangeText={handleChange("chekpassword")}
                    />
                    <Text style={styles.errorText}>
                      {touched.chekpassword && errors.chekpassword}
                    </Text>
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputText}>Repeat password</Text>
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                    />
                    <Text style={styles.errorText}>
                      {touched.password && errors.password}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textButton}>Registration</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.wrapTextButtonRegistr}>
                    <Text
                      style={styles.textButtonRegistr}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Back to login
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
    flex: 1,
    justifyContent: "center",
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
    // fontFamily: "Asap-Regular"
  },
  form: {
    marginTop: 70,
    justifyContent: "center",
    marginHorizontal: 60,
  },
  inputText: {
    color: "#7477ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7477ff",
    color: "#7477ff",
    height: 45,
    borderRadius: 6,
    fontSize: 18,
    // fontFamily: "Asap-Regular"
  },
  button: {
    backgroundColor: "#3faaff",
    marginHorizontal: 60,
    borderRadius: 10,
    height: 45,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#ffff",
    fontSize: 18,
    // fontFamily: "Asap-Regular"
  },
  wrapTextButtonRegistr: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  textButtonRegistr: {
    color: "#3faaff",
  },
  errorText: {
    color: "#FF0000",
  },
});
