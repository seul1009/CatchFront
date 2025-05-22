import React, { useState, useCallback  } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, NativeModules  } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import LoginEmailIcon from "../assets/img/login_email_icon.png";
import LoginPasswordIcon from "../assets/img/login_password_icon.png";
 
const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      setErrorMessage("");
    }, [])
  );
  
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.0.4:8080/user/login", { email, password }, {
      headers: { "Content-Type": "application/json" },
    });

    const token = response.data.token;

    if (token){
      await AsyncStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigation.reset({
        index: 0,
        routes: [{name: "BottomTabs"}],
      });
    } else {
        throw new Error("토큰이 응답에 없습니다.");
      }
    } catch (error) {
    if (error.response?.status === 401) {
      const message = error.response.data?.message || "로그인 실패: 아이디 또는 비밀번호를 확인하세요.";
      setErrorMessage(message);
    } else {
      setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> 보이스피싱을 잡다.</Text>
      <View style={styles.separator} />
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

      <View style={{ height: 20, marginTop: 5 }}>
        {errorMessage ? (
          <Text style={{ color: "red", fontSize: 15 }}>{errorMessage}</Text>
        ) : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.linkText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
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
  color: #355DFF;
  font-weight: bold;
  font-size: 18px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#355DFF",
    padding: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: 'BlackHanSans-Regular',
    color: '#FEF842'
  },
  separator: {
    width: 150,
    height: 1,
    backgroundColor: '#fff',
    margin: 15,
  },
  logoWrapper: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
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
  signupButton: {
    backgroundColor: "#5C7CFF",
    padding: 10,
    width: 80,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
