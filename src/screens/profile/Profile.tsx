import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Alert, SafeAreaView, Pressable, Platform, ActivityIndicator, Modal } from 'react-native';
import { Avatar } from 'react-native-elements'
//import { AppImages } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorContext } from '../../navigation/NavigatorContext';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { classBody } from '@babel/types';

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


const Profile = (props: any) => {
    const { setIsAuthorized } = React.useContext(NavigatorContext)
    const [username, setUsername] = React.useState('')
    const [fullname, setFullname] = React.useState('')
    const [role, setRole] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const getData = async () => {
        const user = await AsyncStorage.getItem('userProfile');
        console.log('user -profile', user)
        let profile_Data = JSON.parse(user);
        console.log('profile_Data', profile_Data)
        for (let i = 0; i < profile_Data.length; i++) {
            setUsername(profile_Data[i].username);
            setFullname(profile_Data[i].fullname);
            if (profile_Data[i].role === '2') {
                setRole('Người dùng');
            }
            else {
                setRole('Quản trị');
            }
        }
    };
    const addData = (id: any, key_vn: any, description_vn: any, key_ru: any, description_ru: any, is_rada: any) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into dictionary(id, key_vn, description_vn, key_ru, description_ru, is_rada) values (?, ?, ?, ?, ?, ?);", [id, key_vn, description_vn, key_ru, description_ru, is_rada]);
                tx.executeSql("select max(id) from dictionary ;", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
        );
    };
    const getData_Api = async () => {
        try {
            await fetch('https://z119.info/api/getdictionarys', {
                method: 'POST',
                headers: {
                },
            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    setIsLoading(true);
                    //console.log('responseJson', responseJson.success.length);
                    let countTotal = responseJson.success.length;
                    db.transaction(
                        (tx) => {
                            tx.executeSql(`delete from dictionary;`, []);
                        },
                    );

                    responseJson.success.forEach(function (element) {
                        addData(element.id, element.key_vn, element.description_vn, element.key_ru, element.description_ru, element.is_rada);
                    })
                    setTimeout(() => {
                        setIsLoading(false);
                    }, countTotal*10);
                })
                .catch((error) => {
                    console.error('error', error);
                });
        } catch (error) {
            alert("Không thể kết nối máy chủ dữ liệu");
        }
    };
    React.useEffect(() => {
        getData()
    }, [])
    const _LogOut = async () => {
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.setItem('isLogin', '0');
        await AsyncStorage.removeItem('License');
        setIsAuthorized(false);
    }
    const renderActivity = React.useCallback(() => {
        return (
            <Modal visible={isLoading} transparent>
                <View style={_style.view_Activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{textAlign:'center', color:'blue', fontSize:20}}>Đang đồng bộ dữ liệu...</Text>
                </View>
            </Modal>
        )
    }, [isLoading])
    return (
        <SafeAreaView style={_style.container}>
            <View style={_style.view_Info}>
                <View style={_style.view_image}>
                    <Image //AppImages.AVATAR 
                        source={require('../../assets/images/Avatar.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <View style={_style.view_info_text}>
                    <Text style={{ fontSize: 20, color: 'blue' }}> {username}
                    </Text>
                </View>
            </View>
            <View style={[_style.contain, { marginTop: 30 }]}>
                <Text style={_style.textView}>{fullname}</Text>
            </View>
            <View style={_style.contain}>
                <Text style={_style.textView}>{role}</Text>
            </View>
            {/* <View style={{ width: '95%', marginTop: 20 }}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 16, color: 'red' }}
                    onPress={_LogOut}
                >Đăng xuất</Text>
            </View> */}
            <TouchableOpacity style={[_style.button, { backgroundColor: 'pink' }]} onPress={getData_Api}>
                <Text style={_style.button_text}>Đồng bộ dữ liệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_style.button,{marginTop:50}]} onPress={_LogOut}>
                <Text style={_style.button_text}>Đăng xuất</Text>
            </TouchableOpacity>
            {renderActivity()}
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
        marginLeft: 15,
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
        top: 250
    },
})