import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import Welcome from '../screens/auth/Welcome';
import SignIn from '../screens/auth/SignIn';
import Detail from '../screens/home/Detail';
import AuthenStackNavigator from './AuthenStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<any>();
const MainStackNavigator = (props: any) => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="AuthenStack" component={AuthenStackNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Maintab" component={MainTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default MainStackNavigator;

