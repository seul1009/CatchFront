import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { setCustomText } from 'react-native-global-props';
import { StatusBar, Text, Platform, Alert, Linking } from 'react-native';
import { requestCallPermissions } from './utils/permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 개발 중 로그인 건너뜀 (이후 false로 수정)
  
  useEffect(() => {
    
    const customTextProps = {
      style: {
        fontFamily: 'BlackHanSans-Regular',
      },
    };
    setCustomText(customTextProps);
    
    requestCallPermissions();

    // 오버레이 권한 체크
    const checkOverlayPermission = () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        console.log("오버레이 권한 체크 실행");
        Alert.alert(
          '다른 앱 위에 표시 권한 필요',
          '통화 중 녹음 안내 메시지를 표시하려면\n다른 앱 위에 표시 권한이 필요합니다.\n설정에서 권한을 허용해주세요.',
          [
            { text: '취소', style: 'cancel' },
            { text: '설정', onPress: () => Linking.openSettings() },
          ]
        );
      }
    };

    checkOverlayPermission();

    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true); 
      }
    };

    checkLoginStatus();

  }, []);
  return (
    <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden={false} />
        <NavigationContainer>
        <StackNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </NavigationContainer>
    </>
  );
}