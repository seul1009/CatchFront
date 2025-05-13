import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setConfirmCode("");
      setNewPassword("");
      setCodeSent(false);
      setCodeVerified(false);
      setErrorMessage("");
      setTimer(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, [])
  );

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
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
   }
    try {
      await axios.post("http://192.168.0.4:8080/user/send-for-reset", { email: email.trim() });
      Alert.alert("인증 코드 전송", "인증 코드가 발송되었습니다!");
      setCodeSent(true);
      setCodeVerified(false);
      startTimer();
      setVerifiedEmail("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data || "인증 코드 발송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post("http://192.168.0.4:8080/user/code", { 
        email: email.trim(),
        confirmCode: confirmCode.trim(),
      });
      if (res.data === true) {
        Alert.alert("확인", "이메일 인증이 완료되었습니다.");
        setCodeVerified(true);
        clearInterval(intervalRef.current); // 인증 성공 시 타이머 정지
        setVerifiedEmail(email);
        setErrorMessage("");
      } else {
        setErrorMessage("인증 코드가 올바르지 않습니다.");
        }
      } catch (error) {
        setErrorMessage(error.response?.data || "이메일 인증에 실패했습니다.");
        }
  };

  const handleResetPassword = async () => {
    if (!newPassword) return Alert.alert("오류", "새 비밀번호를 입력해주세요.");
    if (!verifiedEmail || email !== verifiedEmail) {
      setErrorMessage("이메일을 다시 인증해주세요.");
      return;
    }

    try {
      await axios.post("http://192.168.0.4:8080/user/reset", { 
        email: email.trim(),
        newPassword: newPassword.trim(),
      });
      setErrorMessage("");
      Alert.alert("완료", "비밀번호가 재설정되었습니다.");
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
    const data = error.response?.data;
    const msg = typeof data === "string"
      ? data
      : data?.message || "비밀번호 재설정 중 알 수 없는 오류가 발생했습니다.";
    setErrorMessage(msg);
  }
};

  useEffect(() => {
    if (codeVerified && email !== verifiedEmail) {
      setErrorMessage("이메일이 변경되었습니다. 다시 인증해주세요.");
      setCodeVerified(false);
      setVerifiedEmail("");
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>비밀번호 재설정</Text>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
          <Text style={styles.buttonText}>인증코드 전송</Text>
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
        <TextInput
            style={styles.inputWithTimer}
            placeholder="인증코드 입력"
            value={confirmCode}
            onChangeText={setConfirmCode}
            editable={codeSent}
        />
        {timer > 0 && (
            <Text style={styles.timerTextAbsolute}>
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </Text>
        )}
        </View>

        <TouchableOpacity
          style={[styles.button, !codeSent && styles.disabledButton]}
          onPress={handleVerifyCode}
          disabled={!codeSent}
        >
          <Text style={styles.buttonText}>인증 확인</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="새 비밀번호"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          editable={codeVerified}
        />

        <TouchableOpacity
          style={[styles.button, !codeVerified && styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={!codeVerified}
        >
          <Text style={styles.buttonText}>비밀번호 재설정</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20, marginTop: 10 }}>
        <Text style={{ color: 'red', fontSize: 15, textAlign: 'center' }}>
          {errorMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formWrapper: {
    width: "100%",
    maxWidth: 270,
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#355dff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  timerText: {
    color: "#355dff",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
  },
  inputWrapper: {
  position: "relative",
  marginBottom: 15,
    },
    inputWithTimer: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    paddingRight: 60, 
    borderRadius: 5,
    width: "100%",
    },
    timerTextAbsolute: {
    position: "absolute",
    right: 15,
    top: 12,
    fontSize: 14,
    color: "#355dff",
    fontWeight: "600",
    },
});

export default ForgotPasswordScreen;
