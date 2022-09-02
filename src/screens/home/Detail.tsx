import * as React from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
const Detail = (props: any) => {
    const params = props.route.params.params;
    console.log('params', params);
    const renderVI = () => {
        return (
            <>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red', marginLeft: 5 }}>{params.key_vn}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue', marginLeft: 5 }}>{params.key_ru}</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <Text>{params.des_ru.split(";").join("; \n")}</Text>
                </View>
            </>
        )
    }
    const renderRU = () => {
        return (
            <ScrollView>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue', marginLeft: 5 }}>{params.key_ru}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red', marginLeft: 5 }}>{params.key_vn}</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <Text>{params.des_vn.split(";").join("; \n")}</Text>
                </View>
            </ScrollView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
            {params.ngonngu === 'VI'? renderVI() : renderRU()}
        </SafeAreaView>
    )
}
export default Detail;