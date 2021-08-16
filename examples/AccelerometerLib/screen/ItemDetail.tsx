import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {useNavigation,} from '@react-navigation/native'
import ButtonCustom from '../../../components/ButtonCustom'
import {useParallax} from 'react-native-accelerometer-parallax'

import Animated, {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

const ItemDetail = () => {

    const {goBack} = useNavigation()
    const {animStyle, posY} = useParallax({sensitivity: 0.5})

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(posY.value, [-20, 20], [0, 1], Extrapolate.CLAMP),
            transform: [{scale: interpolate(posY.value, [-40, 40], [1.5, 0.8], Extrapolate.CLAMP),}]
        }
    })

    return (
        <View style={styles.container}>
            <Animated.View style={animStyle}>
                <Image
                    style={[styles.image]}
                    resizeMode={'cover'}
                    source={require('../img/bg.jpeg')}
                />
            </Animated.View>
            <ButtonCustom m={10} onPress={goBack}>
                back
            </ButtonCustom>
            <Animated.Text style={[styles.text, animatedTextStyle]}>
                ELEMENT PAGE
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        width: '100%',
        height: SIZE.height,
        transform:[{scale:1.3}]
    },
    text: {fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign:'center'},
})

export default ItemDetail
