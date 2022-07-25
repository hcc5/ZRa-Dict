import * as React from 'react';
import { useState } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, 
} from 'react-native';

const Home = (props: any) => {
    React.useEffect(() => {
    }, [])
    return (
        <View style={_style.container}>
            <View style={_style.contain}>
                <Image style={_style.logo} source={require('../../assets/images/LOGO.png')} />
                <TouchableOpacity style={_style.button} onPress={()=>props.navigation.navigate('ThuatNguRaDa')}>
                    <Image style={_style.imageStyle} source={require('../../assets/images/Rada.png')} />
                    <View style={_style.textView}>
                        <Text style={_style._text}>Thuật ngữ rađa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={_style.button} onPress={()=>props.navigation.navigate('ChuyenNganhKyThuat')}>
                    <Image style={_style.imageStyle} source={require('../../assets/images/KyThuat.png')} />
                    <View style={_style.textView}>
                        <Text style={_style._text}>Chuyên ngành kỹ thuật</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
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
        top:50,
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
        color:'blue'
    },
    _text:{
        fontSize: 14,
        color:'blue',
        textAlign:'center'
    },
    imageStyle: {
        marginTop:10,
        width:40, height:40
    },
})