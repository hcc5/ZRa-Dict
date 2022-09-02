import React from 'react';
import {
  Image, StyleSheet
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Profile from '../screens/profile/Profile';
import HometackNavigator from './HomeStackNavigator';

const BottomTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13 },
        tabBarStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
      }}>
      <BottomTab.Screen
        component={HometackNavigator}
        name= 'Tra cứu thuật ngữ'
        options={{
          title: "Trang chủ",
          headerTitle:"Tra cứu thuật ngữ",
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Cá nhân"
        component={Profile}
        options={{
          title: 'Cá nhân',
          headerTitle:"Thông tin cá nhân",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          //headerStyle:{backgroundColor:'#2FA2C1'}
        }}
      />
    </BottomTab.Navigator>
  );
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}