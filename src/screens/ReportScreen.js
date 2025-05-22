import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import Header from "../components/Header";
import WarningIcon from '../assets/img/warning.png'; 
import api from '../components/api';

function ReportScreen() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/report');
      } catch(error){
        console.log('API 요청 실패: ', error?.message || error);
      }
    };
    fetchData();
  }, []);

  const handleLinkPress = () => {
    Linking.openURL('https://www.counterscam112.go.kr/');
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
      <Text style={styles.title}>보이스피싱 의심 전화번호</Text>
      <Text style={styles.report}>신고하기</Text>
        <Image source={WarningIcon} style={styles.icon} resizeMode="contain"/>
        <TouchableOpacity style={styles.button} onPress={handleLinkPress}>
          <Image
            source={require('../assets/img/police_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.buttonText}>전기통신금융사기 통합신고대응센터</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 35,
    fontFamily: 'BlackHanSans-Regular',
  },
  report: {
    fontSize: 35,
    fontFamily: 'BlackHanSans-Regular',
    paddingTop: 25,
    paddingBottom: 15,
    color:'red'
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    marginTop: 50,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
