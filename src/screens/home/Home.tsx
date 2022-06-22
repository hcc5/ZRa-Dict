import * as React from 'react';
import { useState } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, Platform, Modal, ActivityIndicator, SafeAreaView
} from 'react-native';




const Home = (props: any) => {
    
    React.useEffect(() => {
    }, [])


    return (
        <View style={_style.container}>
            <View style={_style.contain}>
            <Image style={_style.logo} source={require('../../assets/images/LOGO.png')} />
                <View style={{ flexDirection: 'row'}}>                  
                    <TouchableOpacity style={_style.button} onPress={() => props.navigation.navigate('ThuatNguRaDa')}>
                        <Image style={_style.imageStyle} source={require('../../assets/images/Rada.png')} />
                        <View style={_style.textView}>
                            <Text style={_style._text}>Thuật ngữ radar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={_style.button} onPress={() => props.navigation.navigate('ChuyenNganhKyThuat')}>
                        <Image style={_style.imageStyle} source={require('../../assets/images/KyThuat.png')} />
                        <View style={_style.textView}>
                            <Text style={_style._text}>Chuyên ngành kỹ thuật</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[_style.buttonSync, { backgroundColor: 'pink' }]} onPress={() => props.navigation.navigate('Welcome')}>
                    <Text style={_style.button_text}>Đồng bộ dữ liệu</Text>
                </TouchableOpacity>
            </View>
            {/* <SafeAreaView style={_style.sync}> */}
            {/* <TouchableOpacity style={[_style.buttonSync, { backgroundColor: 'pink' }]} onPress={getData_Api}> */}

            {/* {renderActivity()} */}
            {/* </SafeAreaView> */}

        </View>

    )
}
export default Home;
const _style = StyleSheet.create({
    container: {
        flex: 1,
        //margin: 5,
        backgroundColor: 'white',
    },
    contain: {
        flex: 1,
        justifyContent: 'center',
        // flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    logo: {
        top: 120, width: 170, height: 150, resizeMode: 'stretch', justifyContent: 'center', alignItems: "center", alignSelf: 'center', position: 'absolute'
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFCC',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        top: 50,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 5,
        justifyContent: "center",
        height: 100,
        width: '35%',
        marginHorizontal: 10,
    },
    textView: {
        marginVertical: 10,
        fontSize: 14,
        color: 'blue'
    },
    _text: {
        fontSize: 14,
        color: 'blue',
        textAlign: 'center'
    },
    imageStyle: {
        marginTop: 10,
        width: 40, height: 40
    },
    button_text: {
        color: 'white',
        fontWeight: '600'
    },
    view_Activity: {
        flex: 1,
        justifyContent: "center",
    },
    sync: {
        //flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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