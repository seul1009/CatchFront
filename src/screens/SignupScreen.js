import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import emailIcon from "../assets/img/email_icon.png";
import emailCheckIcon from "../assets/img/checkEmail_icon.png";
import passwordIcon from "../assets/img/password_icon.png";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    confirmCode: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmCodeSent, setConfirmCodeSent] = useState(false);
  const [confirmCodeCheckSent, setConfirmCodeCheckSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");
 
   useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); 
    };
  }, []);

  const startTimer = () => {
    setTimer(300); // 5분
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setConfirmCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    const { email, confirmCode, password, confirmPassword } = formData;
    if (
      !email.trim() || 
      !confirmCode.trim() || 
      !password.trim() || 
      !confirmPassword.trim()
    ) {
    setErrorMessage("모든 필드를 입력해주세요.");
    return;
    } 
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!confirmCodeSent || !confirmCodeCheckSent) {
      setErrorMessage("이메일 인증을 완료해주세요.");
      return;
    }

    if (!verifiedEmail || formData.email !== verifiedEmail) {
      setErrorMessage("이메일을 다시 인증해주세요.");
      return;
}

    try {
      await axios.post("http://192.168.0.4:8080/user/signup", {
        email: verifiedEmail,
        password: formData.password
      });
      console.log({
      email: formData.email,
      verifiedEmail,
      confirmCodeCheckSent,
      confirmCodeSent
    });
      Alert.alert("회원가입 완료", "회원가입이 성공적으로 완료되었습니다!");
      setErrorMessage("");
      navigation.navigate("Login");
    } catch (error) {
      const data = error.response?.data;
      const msg = typeof data === "string" ? data : data?.message || "회원가입에 실패했습니다.";
      setErrorMessage(msg);
    }
  };


  const sendConfirmCode = async () => {
    if (!formData.email) return Alert.alert("오류", "이메일을 입력해주세요.");
    try {
      await axios.post("http://192.168.0.4:8080/user/send", { email: formData.email });
      setConfirmCodeSent(true);
      setConfirmCodeCheckSent(false); // 이전 인증 여부 초기화
      setVerifiedEmail(""); 
      startTimer();

      Alert.alert("인증 코드 전송", "인증 코드가 발송되었습니다!");
    } catch (error) {
      const msg = error.response?.data || "인증 코드 발송에 실패했습니다.";
      setErrorMessage(msg); 
    }
  };

  
  const confirmCode = async () => {
    try {
      const res = await axios.post("http://192.168.0.4:8080/user/code", {
        email: formData.email,
        confirmCode: formData.confirmCode
      });
      if (res.data === true) {
        setConfirmCodeCheckSent(true);
        setVerifiedEmail(formData.email);

        if (intervalRef.current) {
          clearInterval(intervalRef.current); 
          intervalRef.current = null;         
        }
        setTimer(0);
        Alert.alert("성공", "이메일 인증이 완료되었습니다.");
        setErrorMessage("");
      } else {
        setErrorMessage("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      setErrorMessage("이메일 인증에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo style={{ tintColor: '#355DFF' }} />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputBox}>
          <Image source={emailIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <TouchableOpacity style={styles.sideButton} onPress={sendConfirmCode}>
          <Text style={styles.buttonText}>인증</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputBox}>
          <Image source={emailCheckIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="이메일 인증 코드 입력"
            value={formData.confirmCode}
            onChangeText={(text) => handleInputChange("confirmCode", text)}
          />
          {timer > 0 && (
            <Text style={styles.timerText}>
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.sideButton} onPress={confirmCode}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
      </View>

      <View style={{ height: 20, marginTop: 10 }}>
        <Text style={{ color: 'red', fontSize: 15 }}>
          {errorMessage}
        </Text>
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  logoWrapper: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 280,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 225,
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  sideButton: {
    backgroundColor: "#355dff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#aaa",
  },
  input: {
    height: 40,
    color: "#333",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#355dff",
    padding: 10,
    width: 250,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
  },
  timerText: {
  color: "#355dff",
  fontSize: 15,
  marginLeft: 10,
  },
});

export default SignupScreen;