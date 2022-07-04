import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { authSignOutUser } from "./../redax/auth/authOperations";

const SignOut = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.wrap_title}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.LogOutBth}
        onPress={() => {
          dispatch(authSignOutUser());
        }}
      >
        <Text style={styles.LogOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  LogOutBth: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#7477ff",
    color: "#ffffff",
    borderRadius: 10,
  },
  LogOutText: {
    color: "#ffffff",
  },
  wrap_title: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#7477ff",
    alignContent: "flex-start",
  },
});

export default SignOut;
