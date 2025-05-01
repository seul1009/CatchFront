import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from "../components/Header";
import HomeImage from '../assets/img/home1.png';
import CatImage from '../assets/img/home2.png';

function HomeScreen() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();
    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token);

                if (token) {
                    axios.get('http://192.168.0.4:8080/api/home', {
                        headers: {
                            'Authorization': `Bearer ${token}` 
                        }
                    })
                        .then((response) => {
                            setMessage(response.data);
                        })
                        .catch((error) => {
                            console.error(
                              error instanceof Error ? error.stack : 'Non-standard error:', error
                            );
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
            <ScrollView style = {styles.Color}>
            <Image source={HomeImage} style={styles.icon} />
            <View style={styles.container}>
                <Text style={styles.Text1}>보이스피싱 의심 건</Text>
                <View style={styles.row}>
                    <Text style={styles.Text2}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'red' }}>{message}</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> 개를 발견했어요</Text>
                    </Text>
                </View>
            </View>
            <Image source={CatImage} style={styles.cat} />
            <TouchableOpacity onPress={() => navigation.navigate('PhishingDetail', {
                title: '뉴스1',
                content: '뉴스1 상세 내용입니다...'
                })}>
                <Image source={require('../assets/img/news/news1.png')} style={styles.newsImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('PhishingDetail', {
                title: '뉴스2',
                content: '뉴스2 상세 내용입니다...'
                })}>
                <Image source={require('../assets/img/news/news2.png')} style={styles.newsImage} />
                </TouchableOpacity>
            </ScrollView>
        </>
      );
    }

    const styles = StyleSheet.create({
        Color: {
          backgroundColor: '#fff',
        },
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          paddingTop: 30,
        },
        icon: {
          width: 150,
          height: 150,
          resizeMode: 'contain',
          marginBottom: 10,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'baseline',
          marginTop: 10,
        },
        Text1: {
          fontSize: 30,
          fontWeight: 900,
          color: '#000',
          marginRight:30,
        },
        Text2: {
            marginLeft:30,
        },
        cat: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        },

        newsImage: {
            width: 400,
            height: 230, 
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: -10,
          },
    
      });

export default HomeScreen;
