import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, InteractionManager, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import Header from "../components/Header";
import api from '../components/api';

const InfoScreen = ( { setIsLoggedIn } ) => {
  const [user, setUser] = useState({email: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/info');
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

        <View style={styles.bottomSection}>
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

                          navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{ name: 'Login' }],
                            })
                          );
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

                            navigation.dispatch(
                              CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                              })
                            );
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
              <Text style={styles.footerTextRed}>탈퇴하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff', 
    padding: 20,
    justifyContent: 'space-between'
  },
  bottomSection: {
    paddingBottom: 40, 
},
  infoBox: {
    backgroundColor: '#F4F6F9',
    padding: 18,
    borderRadius: 10,
    marginBottom: 24,
    marginTop: 10,
},
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 10,
  },
  label: {
  fontSize: 15,
  color: '#888',
  marginBottom: 4,
},
value: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#222',
},
button: {
  backgroundColor: '#B4B4B4',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 10,
  alignSelf: 'center',
  marginBottom: 30,
},
buttonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},
footer: { 
  borderTopWidth: 1, 
  borderColor: '#eee' 
},
footerItem: {
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderColor: '#eee',
  justifyContent: 'space-between',
  alignItems: 'center',
},
footerText: {
  fontSize: 16,
  color: '#333'
},
footerTextRed: {
  fontSize: 16,
  color: '#e63946',
},
});
