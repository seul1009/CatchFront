import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Logo from "../components/Logo";
import emailIcon from "../assets/img/email_icon.png";
import emailCheckIcon from "../assets/img/checkEmail_icon.png";
import passwordIcon from "../assets/img/password_icon.png";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Title = styled.View`
  margin-top: -30px;
`;

const Subtitle = styled.Text`
  font-family: "Ubuntu-Regular";
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0px 0px 0.5px rgba(0, 0, 0, 0.8);
  color: #414141;
  margin-bottom: 40px;
  padding:20px;
`;

const FormTop = styled.View`
  width: 100%;
  max-width: 300px;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  padding-left: 5px;
`;

const FormBottom = styled.View`
  width: 100%;
  max-width: 300px;
  padding:15px;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.View`
  flex-direction: row;
  width: 220px;
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  background-color: #fff;
  padding: 10px 40px;
  border: 1px solid #414141;
  border-radius: 4px;
  font-family: "Ubuntu-Regular";
  color: #333;
  width: 100%;
`;

const InputIcon = styled.Image`
  position: absolute;
  left: 10px;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-10px);
`;

const Button = styled(TouchableOpacity)`
  background-color: #355dff;
  padding: 10px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const ErrorMessage = styled.Text`
  color: red;
  font-size: 14px;
  position: absolute;
`;

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    confirmCode: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmCodeSent, setConfirmCodeSent] = useState(false);
  const [confirmCodeCheckSent, setConfirmCodeCheckSent] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    
    if (!formData.confirmCode) {
      setErrorMessage("인증 코드를 입력해주세요.");
      return;
    }
    
    if (!formData.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    
    if (!formData.confirmPassword) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (!confirmCodeSent) {
      setErrorMessage("이메일 인증을 해주세요.");
      return;
    }
    
    if (!confirmCodeCheckSent) {
      setErrorMessage("이메일 인증 코드 확인을 완료해주세요.");
      return;
    }

    try {
      await axios.post("http://192.168.0.4:8080/auth/signup", {
        email: formData.email,
        password: formData.password
      });
      alert("회원가입이 성공적으로 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 실패:", error);
      if (error.response && error.response.data) {
        // 객체 형태로 응답이 온 경우 (message 필드가 있는지 확인)
        if (typeof error.response.data === 'object' && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } 
        else {
          setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } else if (error.request) {
        setErrorMessage("서버에 연결할 수 없습니다.");
      } else {
        setErrorMessage("요청 중 오류가 발생했습니다: " + error.message);
      }
    }
  };

  const sendConfirmCode = async () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    
    try {
      await axios.post("http://192.168.0.4:8080/auth/send", {
        email: formData.email,
      });
      setConfirmCodeSent(true);
      alert("인증 코드가 발송되었습니다!");
    } catch (error) {
      console.error("인증 코드 발송 실패:", error.response || error.message);

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        alert("인증 코드 발송에 실패했습니다.");
      }
    }
  };

  const confirmCode = async () => {
    if (!confirmCodeSent) {
      setErrorMessage("이메일 인증 코드를 입력해 주세요.");
      return;
    }
    try {
      const response = await axios.post("http://192.168.0.4:8080/auth/code", {
        email: formData.email,
        confirmCode: formData.confirmCode
      });
      if (response.data === true){
        setConfirmCodeCheckSent(true);
        alert("인증이 완료되었습니다.");
      } else {
        setErrorMessage("인증코드가 올바르지 않습니다.")
      }  
    } catch (error) {
      console.error("인증 실패:", error.response || error.message);
      setErrorMessage("인증에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>
        <Logo/>
      </Title>
      <Subtitle>회원가입</Subtitle>
      <FormTop>
        <InputGroup>
          <InputIcon source={emailIcon} />
          <Input
            placeholder="이메일"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Button onPress={sendConfirmCode} style={{ marginLeft: 10, width: 70 }}>
            <ButtonText>인증</ButtonText>
          </Button>
        </InputGroup>

        <InputGroup>
          <InputIcon source={emailCheckIcon} />
          <Input
            placeholder="이메일 인증 코드 입력"
            value={formData.confirmCode}
            onChangeText={(text) => handleInputChange("confirmCode", text)}
          />
          <Button onPress={confirmCode} style={{ marginLeft: 10, width: 70 }}>
            <ButtonText>확인</ButtonText>
          </Button>
        </InputGroup>
        <InputGroup>
          <InputIcon source={passwordIcon} />
          <Input
            placeholder="비밀번호"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </InputGroup>

        <InputGroup>
          <InputIcon source={passwordIcon} />
          <Input
            placeholder="비밀번호 확인"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
        </InputGroup>
      </FormTop>
      <FormBottom>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

        <Button onPress={handleSubmit} style={{ marginTop: 20, width: 250 }}>
          <ButtonText>회원가입</ButtonText>
        </Button>
      </FormBottom>
    </Container>
  );
};

export default SignupScreen;
