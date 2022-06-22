import React from 'react';
import { Image, StyleSheet, Text,Linking, View, TouchableOpacity, PermissionsAndroid, Alert, SafeAreaView, Pressable, Platform, ActivityIndicator, Modal } from 'react-native';
import { Avatar } from 'react-native-elements'
//import { AppImages } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorContext } from '../../navigation/NavigatorContext';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { classBody } from '@babel/types';



const Profile = (props: any) => {

    const [role, setRole] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
    }, [])
    const _LogOut = async () => {
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.setItem('isLogin', '0');
        await AsyncStorage.removeItem('License');
    }

    return (
        <SafeAreaView style={_style.container}>
            <View style={_style.view_Info}>
                <View style={_style.view_image}>
                    <Image //AppImages.AVATAR 
                        source={require('../../assets/images/LOGO.png')}
                        style={{ top: 100, width: 170, height: 150, resizeMode: 'stretch', justifyContent: 'center', alignItems: "center", alignSelf: 'center', position: 'absolute' }}
                    />
                </View>
                <View style={_style.view_info_text}>
                    <Text style={{ fontSize: 22, color: 'blue' }}>Model: Z-Radict
                    </Text>
                    <Text style={{fontSize: 16}}>version 1.0</Text>
                </View>
                <View style={_style.view_copyright}>
                    <Text style={{ fontSize: 16, color: 'black' }}>Copyright ATE-ASEAN
                    </Text>
                    <Text style={{}}>25 Dec 2021</Text>
                </View>
                <View style={_style.view_copyright1}>
                    <Text style={{  color: 'black' }}>Xem hướng dẫn cài đặt sử dụng                 
                    </Text>
                    <Text
                            style={_style.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL('https://docs.google.com/document/d/1F6YA-T9FBVy0VuW7e3mY0ZfDdK8yoxTS/edit?us...&sd=true');
                            }}>
                             tại đây                        
                        </Text>
                </View>
            </View>

            {/* <TouchableOpacity style={[_style.button,{marginTop:50}]} >
                <Text style={_style.button_text}>Đăng xuất</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}
export default Profile;

const IconSize = 23
const _style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    contain: {
        justifyContent: 'center',
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
        width: '95%',
        height: 55,
        marginVertical: 5,
    },
    textView: {
        marginHorizontal: 10,
        fontSize: 16,
        //color: 'blue'
        color: '#4f4f4f'
    },
    button_Style: {
        marginTop: 30, width: 200,
        backgroundColor: '#51D8C7',
        flexDirection: 'row',
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
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
    avatar_style: {
        position: 'relative'
    },
    view_Info: {
        flexDirection: 'column',
        marginHorizontal: 16,
        marginTop: 20,
        width: '95%',
        height: 100,
        //borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_image: {
        marginVertical: 0,
        marginLeft: 0,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_info_text: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 15,
        top: 300,
    },
    view_copyright: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 15,
        top: 400,
    },
    view_copyright1: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 15,
        top: 400,
        flexDirection:'row',
        fontSize: 16,
    },
    camera: {
        //position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#ffff',
        width: IconSize,
        height: IconSize,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: IconSize * 0.5,
        borderLeftWidth: 0.5
    },
    view_Activity: {
        flex: 1,
        justifyContent: "center",
    },
    hyperlinkStyle: {
        color: 'blue',
        marginLeft: 3
    },
})