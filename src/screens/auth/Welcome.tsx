import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, TextInput, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { NavigatorContext_License } from '../../navigation/NavigatorContext_License';
let KEY = 'bD2LzTuWzr-hxPnQPS5di-evNOoxSmS8-LwvIing7Dw-nuOX5YlOgj-Q7kdDeBsAA'
const Welcome = (props: any) => {
    const { navigation } = props;
    const { setIsLicense } = React.useContext(NavigatorContext_License)
    const [license, setLicense] = React.useState('bD2LzTuWzr-hxPnQPS5di-evNOoxSmS8-LwvIing7Dw-nuOX5YlOgj-Q7kdDeBsAA')
    const _onBegin = async () => {
        if (license === KEY) {
            await AsyncStorage.setItem('License', JSON.stringify(license));
            console.log('License:', JSON.stringify(license));
            //navigation.navigate('SignIn')
            setIsLicense(true);
        }
        else {
            alert('License không chính xác!!');
        }
    };
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
                    <Text style={_styles.button_text}>Bắt đầu</Text>
                </TouchableOpacity>
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
})