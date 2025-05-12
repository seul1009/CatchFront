import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { setCustomText } from 'react-native-global-props';
import { StatusBar, Text } from 'react-native';
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