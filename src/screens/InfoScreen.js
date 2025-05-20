import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, InteractionManager, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from "../components/Header";

const InfoScreen = ( { setIsLoggedIn } ) => {
  const [user, setUser] = useState({email: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.0.4:8080/api/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        setUser(response.data);
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          console.error('Error fetching call history:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <> 
      <Header/>
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>이메일</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              InteractionManager.runAfterInteractions(() => {
                Alert.alert(
                  '로그아웃',
                  '로그아웃하시겠어요?',
                  [
                    {
                      text: '확인',
                      onPress: async () => {
                        await AsyncStorage.removeItem('token');
                        NativeModules.LoginStatusModule.setLoggedIn(false);
                        setIsLoggedIn(false);
                      },
                    },
                    { text: '취소', style: 'cancel' },
                  ],
                  { cancelable: true }
                );
              });
            }}
          >
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.footerText}>이용약관</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.footerText}>개인정보 처리 방침</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}
            onPress={() => {
              setTimeout(() => {
                Alert.alert(
                  '회원 탈퇴',
                  '정말 탈퇴하시겠어요? 탈퇴 시 되돌릴 수 없습니다.',
                  [
                    {
                      text: '탈퇴',
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          const token = await AsyncStorage.getItem('token');
                          await axios.delete('http://192.168.0.4:8080/user', {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          await AsyncStorage.removeItem('token');
                          NativeModules.LoginStatusModule.setLoggedIn(false);
                          setIsLoggedIn(false);
                        } catch (error) {
                          console.error('탈퇴 실패:', error);
                        }
                      },
                    },
                    { text: '취소', style: 'cancel' },
                  ],
                  { cancelable: true }
                );
              }, 100);
            }}
          >
            <Text style={styles.footerText}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  infoBox: {
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd',
    paddingVertical: 10, marginBottom: 30,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 4,
  },
  label: { fontSize: 16, color: '#555' },
  value: { fontSize: 16, fontWeight: '600', color: '#111' },
  actions: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginBottom: 40,
  gap: 20,
},
  button: {
    backgroundColor: '#ccc', alignSelf: 'center',
    paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, marginBottom: 40,
  },
  footer: { borderTopWidth: 1, borderColor: '#eee' },
  footerItem: { paddingVertical: 16, borderBottomWidth: 1, borderColor: '#eee' },
  footerText: { fontSize: 16, textAlign: 'center', color: '#333' },
});
