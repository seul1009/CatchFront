import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

let navigationRef;

export const setNavigator = (nav) => {
  navigationRef = nav;
};

const api = axios.create({
    baseURL: 'http://192.168.0.4:8080/api',
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
  async (response) => {
    // const newToken = response.headers['new-token']; 
    // if (newToken) {
    //   await AsyncStorage.setItem('token', newToken);
    //   console.log('새로운 토큰 저장됨');
    // }
    return response;
  },
  async (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      await AsyncStorage.removeItem('token');

      Alert.alert(
        '세션 만료',
        '로그인이 만료되었습니다. 다시 로그인해주세요.',
        [
            {
            text: '확인',
            onPress: () => {
                navigationRef.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
                );
            },
            },
        ],
        { cancelable: false }
        );
    }
    return Promise.reject(error);
  }
);

export default api;