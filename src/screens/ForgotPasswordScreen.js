import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setEmail(e);
    };

    const handleSubmit = async () => {
        if (!email) {
            setErrorMessage('이메일을 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.0.4:8080/api/forgot-password', { email });
            setSuccessMessage('이메일로 비밀번호 재설정 링크가 전송되었습니다.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
            setSuccessMessage('');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f4f4f4' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>비밀번호 재설정</Text>
            <View style={{ width: '100%', maxWidth: 300, backgroundColor: 'white', padding: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginBottom: 15,
                        paddingLeft: 10,
                        fontSize: 16,
                    }}
                    placeholder="이메일"
                    value={email}
                    onChangeText={handleInputChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    required
                />
                {errorMessage ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text> : null}
                {successMessage ? <Text style={{ color: 'green', marginBottom: 10 }}>{successMessage}</Text> : null}
                <Button title="비밀번호 재설정 링크 보내기" onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
