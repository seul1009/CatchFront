import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { StatusBar } from 'react-native';
import { requestCallPermissions } from './utils/permissions';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 개발 중 로그인 건너뜀 (이후 false로 수정)
  useEffect(() => {
    requestCallPermissions();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        hidden={false}
        />
        <NavigationContainer>
        <StackNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </NavigationContainer>
    </>
  );
}