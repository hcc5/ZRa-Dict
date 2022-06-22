import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Detail from '../screens/home/Detail';
import Welcome from '../screens/auth/Welcome';
import ThuatNguRaDa from '../screens/home/ThuatNguRaDa';
import ChuyenNganhKyThuat from '../screens/home/ChuyenNganhKyThuat';
import Detail_KyThuat from '../screens/home/Detail_KyThuat';

const Stack = createNativeStackNavigator<any>();
// const language = ["VI", "RU"]
const HometackNavigator = (props: any) => {
    // const _onChangeLanguage = async (value:string)=>{
    //     await AsyncStorage.setItem('language', value);
    // }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: 'Tra cứu thuật ngữ',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }} />
            <Stack.Screen name="Welcome" component={Welcome}
                options={{
                    title: 'License',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="ThuatNguRaDa" component={ThuatNguRaDa}
                options={{
                    title: 'Tra cứu thuật ngữ rađa',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <Stack.Screen name="ChuyenNganhKyThuat" component={ChuyenNganhKyThuat}
                options={{
                    title: 'Tra cứu thuật ngữ kỹ thuật',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <Stack.Screen name="Detail" component={Detail}
                options={{
                    title: 'Chi tiết',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <Stack.Screen name="Detail_KyThuat" component={Detail_KyThuat}
                options={{
                    title: 'Chi tiết',
                    headerStyle: {
                        backgroundColor: '#2FA2C1',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
        </Stack.Navigator>
    );
}
export default HometackNavigator;