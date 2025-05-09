import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from "../components/Header";
import HomeImage from '../assets/img/home1.png';
import CatImage from '../assets/img/cat.jpg';

function HomeScreen() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [newsList, setNewsList] = useState([]);

    const newsImages = [
      require('../assets/img/news/news1.png'),
      require('../assets/img/news/news2.png'),
      require('../assets/img/news/news3.png')
    ];

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

        
        const getNews = async () => {
          try {
            const token = await AsyncStorage.getItem('token'); 

            const res = await axios.get('http://192.168.0.4:8080/api/news', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setNewsList(res.data);
          } catch (e) {
            console.error('뉴스 로드 실패:', e);
          }
        };


        getData();
        getNews();
    }, []);

    return (
        <>
          <Header />
            <ScrollView style = {styles.Color}>
            <Image source={HomeImage} style={styles.home1} />
            <View style={styles.container}>
                <Text style={styles.Text1}>보이스피싱 의심 건</Text>
                <View style={styles.row}>
                    <Text style={styles.Text2}>
                        <Text style={{ fontSize: 35, color: 'red' }}>{message}</Text>
                        <Text> 개를 발견했어요</Text>
                    </Text>
                </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Image source={CatImage} style={styles.cat} />
            </View>
            {newsList.slice(0, 3).map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              onPress={() =>
                navigation.navigate('NewsDetail', {
                  title: item.title,
                  content: item.content,
                })
              }>
              <Image source={newsImages[index]} style={styles.newsImage} />
            </TouchableOpacity>
          ))}

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
          padding: 50,
        },
        home1: {
          position: 'absolute',
          top: 100,
          left: 9,
          width: 100,
          height: 100,
          resizeMode: 'contain',
          zIndex: 10,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'baseline',
          marginTop: 10,
        },
        Text1: {
          fontSize: 35,
          marginRight: 45,
          fontFamily: 'BlackHanSans-Regular',
        },
        Text2: {
          fontSize: 35,
          marginLeft: 45,
          fontFamily: 'BlackHanSans-Regular',
        },
        cat: {
          width: 280,   
          height: 336,  
          alignSelf: 'center',
          paddingBottom: 40,
        },
        newsImage: {
          width: '70%',         
          aspectRatio: 16 / 9, 
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: -30,
          marginBottom: -30,
        },
    
      });

export default HomeScreen;
