import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

const Loadingspin = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap_spinner}>
        <Text style={styles.text}>POSTSs</Text>
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="#7477ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffff",
  },
  wrap_spinner: {
    justifyContent: "center",
  },
  text: {
    color: "#7477ff",
    fontSize: 24,
  },
  spinner: {
    paddingTop: 10,
    alignContent: "center",
  },
});

export default Loadingspin;
