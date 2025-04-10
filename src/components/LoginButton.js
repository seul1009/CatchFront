import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LoginButton = ({ onPress, label }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#355DFF",
    fontWeight: "bold",
  },
});

export default LoginButton;
