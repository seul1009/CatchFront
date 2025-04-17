import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default ErrorMessage;
