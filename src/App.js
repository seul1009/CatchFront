import React, { useState, useEffect, useRef  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackNavigator';
import { setCustomText } from 'react-native-global-props';
import { StatusBar, Text, Platform, Alert, Linking, NativeModules, BackHandler, AppState  } from 'react-native';
import { requestCallPermissions } from './utils/permissions';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 개발 중 로그인 건너뜀 (이후 false로 수정)
  const appState = useRef(AppState.currentState);
  
    useEffect(() => {
      
      setCustomText({
        style: {
          fontFamily: 'BlackHanSans-Regular',
          },
        });
    
    
    requestCallPermissions();


    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 앱이 설정 화면 등에서 다시 돌아왔을 때
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          const granted = await NativeModules.OverlayPermissionModule.checkOverlayPermission();
          if (!granted) {
            Alert.alert(
              '권한 미허용',
              '다른 앱 위에 표시 권한이 없으면 앱 기능이 제한됩니다.',
              [{ text: '설정', onPress: () => Linking.openSettings() }]
            );
          }
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
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