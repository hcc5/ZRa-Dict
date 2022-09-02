import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, TextInput, Alert, PermissionsAndroid, ScrollView, Platform }
    from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import { NavigatorContext } from '../../navigation/NavigatorContext';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

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
const SignIn = (props: any) => {
    const { navigation } = props;
    const { setIsAuthorized } = React.useContext(NavigatorContext)
    const [userName, setUserName] = React.useState('')
    const [passWord, setPassWord] = React.useState('')
    const _onChangeUser = React.useCallback((value) => {
        setUserName(value)
    }, []);
    const _onChangePassWord = React.useCallback((value) => {
        setPassWord(value)
    }, []);
    const _onPressLogin = async () => {
        let encodedPassword = md5(passWord);
        db.transaction(
            (tx) => {
                tx.executeSql("select * from account where lower(username)= ? and password = ?;", [userName.toLowerCase(), encodedPassword], async (_, { rows }) => {
                    if (rows.length > 0) {
                        await AsyncStorage.setItem('userProfile', JSON.stringify(rows._array));
                        await AsyncStorage.setItem('userName', userName);
                        await AsyncStorage.setItem('isLogin', '1');
                        setIsAuthorized(true);
                    } else {
                        alert("Thông tin đăng nhập không chính xác!");
                    }
                });
            },
        );
    }
    const _loadAllUser = async () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from account", [], (_, { rows }) =>
                    console.log("All user login",JSON.stringify(rows._array))
                );
            },
        );
    }
    React.useEffect(() => {
        _loadAllUser();
        //_loadUserLocal();
    }, []);
    return (
        <ScrollView style={_styles.content}>
            <Image style={_styles.logo} source={require('../../assets/images/LOGO.png')} />
            <SafeAreaView style={_styles.container}>
                <View style={_styles.form}>
                    <View ><Text style={_styles.title_text}>Đăng nhập</Text></View>
                    <View style={_styles.view_input}>
                        <Image source={require('../../assets/images/gray-account.png')} style={_styles.image_input} />
                        <TextInput
                            value={userName}
                            placeholder='Tên đăng nhập'
                            keyboardType='name-phone-pad'
                            style={_styles.text_input}
                            onChangeText={_onChangeUser}
                        />
                    </View>
                    <View style={_styles.view_input}>
                        <Image source={require('../../assets/images/password.png')} style={_styles.image_input} />
                        <TextInput
                            value={passWord}
                            placeholder='Mật khẩu'
                            keyboardType='name-phone-pad'
                            secureTextEntry={true}
                            style={_styles.text_input}
                            onChangeText={_onChangePassWord}
                        />
                    </View>

                    <TouchableOpacity style={_styles.button} onPress={_onPressLogin}>
                        <Text style={_styles.button_text}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}
export default SignIn;

const _styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "space-between"
    },
    logo: {
        position: 'absolute', top: 120, width: 140, height: 120, resizeMode: 'stretch', justifyContent: 'center', alignItems: "center", alignSelf: 'center'
    },
    title_text: {
        fontSize: 20, fontWeight: "bold", color: '#28a745', alignSelf: "center", marginVertical: 20
    },
    form: {
        marginTop: 270,
    },
    button: {
        marginVertical: 30,
        width: '50%',
        alignSelf: 'center',
        fontSize: 14,
        backgroundColor: '#51D8C7',
        flexDirection: 'row',
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#20c997'
    },
    button_text: {
        color: 'white',
        fontWeight: '600'
    },
    view_input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginVertical: 5,
        marginHorizontal: 10,
        justifyContent: "center",
        //borderWidth: 1,
        height: 50,
    },
    image_input: { marginStart: 0, },
    text_input: {
        marginHorizontal: 10,
        flex: 1, fontSize: 14,
        color: 'blue',
        marginVertical: 5,
        alignSelf: "center",
        // borderWidth: 1,
    },
})