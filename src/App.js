import React, { useState, useEffect, useRef  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { setCustomText } from 'react-native-global-props';
import { StatusBar, AppState  } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 개발 중 로그인 건너뜀 (이후 false로 수정)
  const appState = useRef(AppState.currentState);

    useEffect(() => {
      setCustomText({
        style: {
          fontFamily: 'BlackHanSans-Regular',
        },
      });
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