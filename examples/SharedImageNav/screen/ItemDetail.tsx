import React, {useRef} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import Header from '../components/Header'
import {useSharedImageTo} from '../navigators/SharedNavigator'
import IMG_URI from '../img/IMG_URI'

const imageSource = require('../img/bg.jpg')

const ItemDetail = () => {
    const ref = useRef(null)
    useSharedImageTo(ref, IMG_URI)
    return (
        <View style={{flex: 1}}>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.text}>SHARED ELEMENT TEXT</Text>
                <View style={styles.imgBox}>
                    <View ref={ref}>
                        <FastImage style={styles.image} resizeMode="cover" source={{uri: IMG_URI}}/>
                    </View>
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
        backgroundColor: '#3d6d5c',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
    imgBox: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        zIndex: -1,
    },
})

export default ItemDetail
