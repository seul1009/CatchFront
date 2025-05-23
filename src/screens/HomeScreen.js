import React, { useEffect, useState, useCallback  } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from "../components/Header";
import CatImage from '../assets/img/cat.jpg';
import api from '../components/api';

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
    useFocusEffect(
      useCallback(() => {
            const getData = async () => {
                try {
                    const response = await api.get('/home');
                    setMessage(response.data);
                    console.log('홈 API 응답:', response.data);
                } catch(error){
                  console.error(error instanceof Error ? error.stack : 'Non-standard error:', error);
                  setError('홈 데이터 로딩 실패'); 
                }
          };

        
        const getNews = async () => {
          try {
            const res = await api.get('/news');
            setNewsList(res.data);
          } catch (e) {
            console.error('뉴스 로드 실패:', e);
          }
        };
        getData();
        getNews();
    }, [])
  );

    return (
        <>
          <Header />
            <ScrollView style = {styles.Color}>
            <View style={styles.container}>
                <Text style={styles.Text1}>보이스피싱 의심 건</Text>
                <View style={styles.row}>
                    <Text style={styles.Text2}>
                        <Text style={{ fontSize: 37, color: 'red' }}>{message === 0 ? '0' : message}</Text>
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
          paddingTop: 50,
          paddingBottom: 50,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'baseline',
          marginTop: 12,
        },
        Text1: {
          fontSize: 35,
          marginRight: 45,
          fontFamily: 'BlackHanSans-Regular',
        },
        Text2: {
          fontSize: 36,
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
          width: '80%',         
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: -30,
          marginBottom: -30,
        },
    
      });

export default HomeScreen;
