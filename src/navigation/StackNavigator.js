import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CallHistoryScreen from '../screens/CallHistoryScreen';
import ReportScreen from '../screens/ReportScreen';
import InfoScreen from '../screens/InfoScreen';
import HomeIcon from '../assets/img/home.png';
import CallIcon from '../assets/img/call.png';
import ReportIcon from '../assets/img/report.png';
import InfoIcon from '../assets/img/info.png';
import CallDetailScreen from '../screens/CallDetailScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === '홈') {
            iconSource = HomeIcon;
          } else if (route.name === '통화 내역') {
            iconSource = CallIcon;
          } else if (route.name === '신고') {
            iconSource = ReportIcon;
          } else if (route.name === '정보') {
            iconSource = InfoIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                marginTop: 10, 
                tintColor: focused ? '#355DFF' : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#355DFF', 
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 8, 
          textAlign: 'center',
        },
        tabBarStyle: {
          height: 70, 
        },
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="통화 내역" component={CallHistoryScreen} />
      <Tab.Screen name="신고" component={ReportScreen} />
      <Tab.Screen name="정보">
        {() => <InfoScreen setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const StackNavigator = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ? 'BottomTabs' : 'Login'}> 
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="BottomTabs">
        {() => <BottomTabNavigator setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="CallDetail" component={CallDetailScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
