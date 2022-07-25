import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View,
    TouchableOpacity, TextInput, FlatList, ScrollView, Platform
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SelectDropdown from 'react-native-select-dropdown'
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

const language = ["VI", "RU"]
const ThuatNguRaDa = (props: any) => {
    const [search, setSearch] = React.useState('')
    const [ngonngu, setNgonNgu] = React.useState('VI')
    const [body, setBody] = useState(null);

    console.log('body', body);
    const loadDataFirt = async () =>{
        db.transaction(
            (tx) => {
                tx.executeSql(`select * from dictionary where is_rada = '1' limit 50;`, [], async (_, { rows }) => {
                    //console.log('ssss',value)
                    setBody(rows._array)
                });
            },
        );
    }
    const loadDataLocal = async () => {
        console.log('search',search);
        console.log('ngonngu',ngonngu);
        if(search === '')  {
            setBody(null);
            return;
        }
        if(ngonngu === 'VI')
        {
            db.transaction(
                (tx) => {
                    tx.executeSql(`select * from dictionary where is_rada = '1'  and lower(key_vn) like '%${search.toLowerCase()}%';`, [], async (_, { rows }) => {
                        //console.log('ssss',value)
                        setBody(rows._array)
                    });
                },
            );
        }
        else{
            db.transaction(
                (tx) => {
                    tx.executeSql(`select * from dictionary where is_rada = '1' and IFNULL(description_vn,'') <> '' and lower(key_ru) like '%${search.toLowerCase()}%' ;`, [], async (_, { rows }) => {
                        //console.log(JSON.stringify(rows))
                        setBody(rows._array)
                    });
                },
            );
        }
    }
    React.useEffect(() => {
        loadDataFirt();
    }, [props.navigation])

    const Item = ({ key_vn, des_vn, key_ru, des_ru, id }: any) => (
        <TouchableOpacity style={{ marginVertical: 7, }}
            onPress={() => props.navigation.navigate('Detail', {
                screen: 'Detail',
                params: { key_vn: key_vn, des_vn: des_vn, key_ru: key_ru, des_ru: des_ru, ngonngu:ngonngu },
            })}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginHorizontal: 5, justifyContent:'center' }}>
                    <Icon name="search" type="font-awesome" size={20} color="#00CCFF" style={{}} />
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red'}}>{ngonngu === 'VI' ? key_vn : key_ru}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'blue', marginVertical: 5 }}>{ngonngu === 'VI' ? key_ru : key_vn}</Text>
                    <Text style={{paddingRight:10}}>{ngonngu === 'VI' ? des_ru.substring(0,100) + ' ...' : des_vn.substring(0,100) + ' ...'}</Text>
                </View>
            </View>
        <Text numberOfLines={1} style={{marginTop:2, backgroundColor: '#33CC00',height:1}}></Text> 
        </TouchableOpacity>
        
    )

    const renderItem = ({ item }: any) => (
        <Item key_vn={item.key_vn} des_vn={item.description_vn}
            key_ru={item.key_ru} des_ru={item.description_ru}
            id={item.id}
        />
    );

    return (
        <View style={_style.container}>
            <View style={_style.view_Search}>
                <TextInput
                    style={_style.text_Search}
                    keyboardType='name-phone-pad' value={search}
                    onChangeText={(search) => setSearch(search)} 
                    onSubmitEditing={()=>{
                        loadDataLocal();
                    }}
                    placeholder='Tìm kiếm'
                />
                <SelectDropdown
                    data={language}
                    defaultValue="VI"
                    onSelect={(selectedItem, index) => {
                        setNgonNgu(selectedItem);
                        console.log(selectedItem, index)
                        setSearch('');
                        //setBody(null);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    //dropdownStyle={{width:60}}
                    rowStyle={{ height: 30 }}
                    rowTextStyle={{ height: 30 }}
                    buttonStyle={{ width: 60, height: 40, backgroundColor: '#fff', 
                        marginRight: 5, borderColor:'green' }}
                />
            </View>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <FlatList
                    style={{ flex: 1, backgroundColor: '#fff' }}
                    data={body}
                    
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    numColumns={1}
                />
            </View>
        </View>
    )
}
export default ThuatNguRaDa;
const _style = StyleSheet.create({
    container: {
        flex: 1,
        //margin: 5,

    },
    contain: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        //borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        width: '96%',
        height: 40,
        marginVertical: 2,
        marginHorizontal: 10,
    },
    view_Search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 2,
        justifyContent: "center",
        //borderWidth: 1,
        height: 50,
    },
    text_Search: {
        //marginHorizontal: 10, 
        flex: 1, fontSize: 14,
        color: 'blue',
        marginVertical: 5,
        marginHorizontal: 10,
        alignSelf: "center",
    },
    textView: {
        marginHorizontal: 10,
        fontSize: 14,
        flex: 1,
        //borderWidth: 1,
        textAlign: "left",
        color: 'blue',
    },
    imageStyle: {
        marginHorizontal: 10,
    },
    inputStyle: {
        marginStart: 10,
        flex: 1,
    },
    titleStyle: {
        fontSize: 24,
        //borderWidth:1,
        textAlign: 'center',
        height: '100%',
        //marginVertical:10,
        paddingVertical: 5,
        color: '#28a745',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
})