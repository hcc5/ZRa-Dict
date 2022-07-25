import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/auth/Welcome';
import SignIn from '../screens/auth/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from "expo-sqlite";
import { Platform } from 'react-native';
import { NavigatorContext_License } from './NavigatorContext_License';

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
}
const db = openDatabase();

const Stack = createNativeStackNavigator<any>();

const AuthenStackNavigator = (props: any) => {
    const [isLicense, setIsLicense] = React.useState(false)
    const addData = (id: any, username: any, fullname: any, password: any, role: any) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into account (id, username, fullname, password, role) values (?, ?, ?, ?, ?);", [id, username, fullname, password, role]);
            },
        );
    };
    const _loadAllUser = async () => {
        await fetch('https://z119.info/api/getusers', {
            method: 'POST',
            headers: {
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(`delete from account;`, []);
                    },
                );
                responseJson.success.forEach(function (element) {
                    addData(element.id, element.username, element.fullname, element.password, element.role);
                })
            })
            .catch((error) => {
                // alert(JSON.stringify(error));
                // console.error(error);
                //alert("Thông tin đăng nhập không chính xác!");
            });
    }
    React.useEffect(() => {
        const checkLicense = async () => {
            const License_STRING = await AsyncStorage.getItem('License');
            console.log('License_STRING', License_STRING);
            if (License_STRING) {
                console.log('License is existsing');
                setIsLicense(true);
            }
        };
        checkLicense();
        _loadAllUser();
    }, []);

    return (
        <NavigatorContext_License.Provider value={{ setIsLicense }}>
            <Stack.Navigator>
                {/* <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} /> */}
                {isLicense ? <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} /> : <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />}
            </Stack.Navigator>
        </NavigatorContext_License.Provider>
    );
}
export default AuthenStackNavigator;