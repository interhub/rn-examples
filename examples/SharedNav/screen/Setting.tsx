import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import Start from './Start'
import Header from '../components/Header'

const ItemDetail = () => {

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.imgBox}>
                <SharedElement id="image">
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require('../img/bg.jpg')}
                    />
                </SharedElement>
            </View>
            <SharedElement id="text">
                <Text style={styles.text}>
                    SHARED ELEMENT PAGE
                </Text>
            </SharedElement>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000'
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
