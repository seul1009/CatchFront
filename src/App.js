import React, { useState, useEffect, useRef  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { setCustomText } from 'react-native-global-props';
import { StatusBar, AppState  } from 'react-native';
import { setNavigator } from './components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 개발 중 로그인 건너뜀 (이후 false로 수정)
  const appState = useRef(AppState.currentState);
  const navigationRef = React.useRef();

    useEffect(() => {
      setCustomText({
        style: {
          fontFamily: 'BlackHanSans-Regular',
        },
      });
    }, []);

    const handleReady = async () => {
      setNavigator(navigationRef.current);
      
      const token = await AsyncStorage.getItem('token');
      const initialRoute = token ? 'BottomTabs' : 'Login';
      setIsLoggedIn(!!token);

      navigationRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: initialRoute }],
        })
      );
    };
   

  return (
    <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden={false} />
        <NavigationContainer 
           ref={navigationRef}
          onReady={handleReady} 
      >
        <StackNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </NavigationContainer>
    </>
  );
}