import React,  { useEffect }  from 'react';
import { Button, Alert } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const KakaoLoginButton = () => {
  const navigation = useNavigation();

  const handleKakaoLogin = async () => {
    try {

      const result = await KakaoLogin.login();
      const token = result.accessToken;

      if (!accessToken) throw new Error("accessToken 없음");

      const response = await axios.post("http://192.168.0.4:8080/auth/kakao", {
        accessToken
      });

      const { jwtToken, nickname } = response.data;

      if (!jwtToken) {
        throw new Error("서버 응답에 jwtToken 없음");
      }

      await AsyncStorage.setItem("token", jwtToken);
      Alert.alert("로그인 성공", `환영합니다 ${nickname || ""}님`);
      navigation.navigate("Home");

    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      Alert.alert("로그인 실패", error.message || "카카오 로그인에 실패했습니다.");
    }
  };

  return (
    <Button title="카카오 로그인" color="#FEE500" onPress={handleKakaoLogin} />
  );
};

export default KakaoLoginButton;
