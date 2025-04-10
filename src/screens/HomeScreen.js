import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage 모듈
import Header from "../components/Header";

function HomeScreen() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 로컬 스토리지 대신 AsyncStorage에서 JWT 토큰 가져오기
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (token) {
                    axios.get('http://localhost:8080/api/home', {
                        headers: {
                            'Authorization': `Bearer ${token}` // JWT 토큰을 헤더에 포함
                        }
                    })
                        .then((response) => {
                            setMessage(response.data);
                        })
                        .catch((error) => {
                            setError('Failed to load data');
                        });

                } else {
                    setError('No token found');
                }
            } catch (e) {
                setError('Failed to get token');
            }
        };

        getData();
    }, []);

    return (
        <>
            <Header />
            <View style={styles.main}>
                <Text style={styles.hansFont}>보이스피싱 의심 건</Text>
                <Text style={styles.font1}>{message}</Text>
                <Text style={styles.hansFont}>개를 발견했어요</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
    },
    hansFont: {
        fontFamily: 'Hans', // 원하는 폰트 적용
        fontSize: 18,
    },
    font1: {
        fontFamily: 'Font1', // 원하는 폰트 적용
        fontSize: 16,
    },
});

export default HomeScreen;
