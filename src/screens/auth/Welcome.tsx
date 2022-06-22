import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, TextInput, Alert,Platform ,Modal,ActivityIndicator} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { NavigatorContext_License } from '../../navigation/NavigatorContext_License';
let KEY = 'bD2LzTuWzr-hxPnQPS5di-evNOoxSmS8-LwvIing7Dw-nuOX5YlOgj-Q7kdDeBsAA'

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

const Welcome = (props: any) => {
    const { navigation } = props;
    const { setIsLicense } = React.useContext(NavigatorContext_License)
    const [license, setLicense] = React.useState('')
    const _onBegin = async () => {
        if (license === KEY) {
            await AsyncStorage.setItem('License', JSON.stringify(license));
            console.log('License:', JSON.stringify(license));
            //navigation.navigate('SignIn')
            setIsLicense(true);
            getData_Api();
            {renderActivity()}
        }
        else {
            alert('License không chính xác!!');
        }
    };


    const [isLoading, setIsLoading] = React.useState(false)
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
                    }, countTotal * 10);
                })
                .catch((error) => {
                    console.error('error', error);
                });
        } catch (error) {
            alert("Không thể kết nối máy chủ dữ liệu");
        }
    };

    const renderActivity = React.useCallback(() => {
        return (
            <Modal visible={isLoading} transparent>
                <View style={_styles.view_Activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20 }}>Đang đồng bộ dữ liệu</Text>
                </View>
            </Modal>
        )
    }, [isLoading])

    return (
        <View style={_styles.content}>
            <Image style={_styles.logo} source={require('../../assets/images/LOGO.png')} />
            <SafeAreaView>
                <View style={_styles.form}>
                    <Text style={_styles.title_text}>Ứng dụng tra cứu thuật ngữ</Text>
                </View>
                <View style={_styles.view_input}>
                    <TextInput
                        value={license}
                        placeholder='License'
                        keyboardType='name-phone-pad'
                        style={_styles.text_input}
                        onChangeText={(value: string) => setLicense(value)}
                    />
                </View>
                <TouchableOpacity style={_styles.button} onPress={_onBegin}>
                    <Text style={_styles.button_text}>Đồng bộ</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[_styles.buttonSync, { backgroundColor: 'pink' }]} onPress={getData_Api}>
                    <Text style={_styles.button_text}>Đồng bộ dữ liệu</Text>
                </TouchableOpacity>
                 {renderActivity()} */}
            </SafeAreaView>

        </View>
    )
}
export default Welcome;

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
        position: 'absolute', top: 60, width: 140, height: 120, resizeMode: 'stretch', justifyContent: 'center', alignItems: "center", alignSelf: 'center'
    },
    title_text: {
        fontSize: 20, fontWeight: "bold", color: '#28a745', alignSelf: "center", marginVertical: 20
    },
    form: {
        marginTop: 170,
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
    text_input: {
        marginHorizontal: 10,
        flex: 1, fontSize: 14,
        color: 'blue',
        marginVertical: 5,
        alignSelf: "center",
        // borderWidth: 1,
    },
    view_Activity: {
        flex: 1,
        justifyContent: "center",
    },
    buttonSync: {
        // marginTop: 30,
        width: '50%',
        alignSelf: 'center',
        fontSize: 14,
        backgroundColor: '#51D8C7',
        // flexDirection: 'row',
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#20c997',
        bottom: 200,

        top: 150,
        elevation: 6,


    }
})