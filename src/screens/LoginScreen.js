import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import LoginEmailIcon from "../assets/img/login_email_icon.png";
import LoginPasswordIcon from "../assets/img/login_password_icon.png";
 
const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.0.4:8080/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
      } else {
        throw new Error("토큰이 응답에 없습니다.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo color="white" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={LoginEmailIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#aaa"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
      </View>


      <View style={styles.inputContainer}>
        <Image source={LoginPasswordIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.linkText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <Button onPress={() => navigation.navigate("Signup")}>
        <ButtonText>회원가입</ButtonText>
      </Button>
    </View>
  );
};


export const Button = styled.TouchableOpacity`
  background-color: #355dff;
  padding: 10px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#355DFF",
    padding: 20,
  },
  logoWrapper: {
    marginBottom:50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 250,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#aaa",
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
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
  linkText: {
    color: "white",
    marginTop: 10,
    marginBottom: 15,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});

export default LoginScreen;
