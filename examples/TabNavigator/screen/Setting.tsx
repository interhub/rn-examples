import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import Header from '../components/Header'

const ItemDetail = () => {

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.imgBox}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require('../img/bg.jpg')}
                />
            </View>
            <Text style={styles.text}>
                ELEMENT PAGE SETTING
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#349f6a'
    },
    image: {
        width: '100%', height: '100%'
    },
    text: {fontSize: 30, color: '#FFF', fontWeight: 'bold', marginVertical: 100},
    imgBox: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        zIndex: -1,
    }
})

export default ItemDetail
