import React, {useRef} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import TouchableScale from 'react-native-touchable-scale'
import FastImage from 'react-native-fast-image'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import {useSharedImageFrom} from '../navigators/SharedNavigator'
import IMG_URI from '../img/IMG_URI'

const imageSource = require('../img/bg.jpg')
console.log({imageSource})

const Start = () => {
    const {navigate} = useNavigation()
    const goToDetail = () => {
        navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
    }
    const ref = useRef(null)
    useSharedImageFrom(ref, IMG_URI)

    return (
        <View style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <Text style={styles.text}>SHARED ELEMENT TEXT</Text>
            </View>
            <TouchableScale friction={5} tension={0.5} activeScale={0.9} onPress={goToDetail} style={styles.imgBox}>
                <View ref={ref}>
                    <FastImage style={styles.image} resizeMode="cover" source={{uri: IMG_URI}}/>
                </View>
            </TouchableScale>
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
    text: {fontSize: 15, color: '#fff', fontWeight: 'bold'},
    imgBox: {
        width: 200,
        height: 300,
    },
    image: {width: '100%', height: '100%', borderRadius: 0},
})

export default Start
