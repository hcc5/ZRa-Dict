import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import AuthenStackNavigator from './AuthenStackNavigator';
//import LinkingConfiguration from './LinkingConfiguration';
import MainStackNavigator from './MainStackNavigator';
import MainTabNavigator from './MainTabNavigator';
import { NavigatorContext } from './NavigatorContext';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  React.useEffect(() => {
    const checkLogin = async () => {
      const Login_STRING = await AsyncStorage.getItem('isLogin');
      console.log('Login_STRING', Login_STRING)
      if (Login_STRING === '1') {
        setIsAuthorized(true);
      }
    };
    checkLogin();
  }, [])
  return (
    <NavigatorContext.Provider value={{ setIsAuthorized}}>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <MainStackNavigator /> */}
        {/* {isAuthorized ? <MainTabNavigator /> : <AuthenStackNavigator />} */}
        { <MainTabNavigator />}
      </NavigationContainer>
    </NavigatorContext.Provider>
  );
}
