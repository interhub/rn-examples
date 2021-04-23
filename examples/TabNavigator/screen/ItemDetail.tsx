import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import Header from '../components/Header'

const ItemDetail = () => {

    return (
        <View style={{flex: 1}}>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.text}>
                    ELEMENT PAGE DETAIL
                </Text>
                <View style={styles.imgBox}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require('../img/bg.jpg')}
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36bd36'
    },
    image: {
        width: '100%', height: '100%'
    },
    text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
    imgBox: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        zIndex: -1
    }
})

export default ItemDetail
