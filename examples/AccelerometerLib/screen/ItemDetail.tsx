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
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <ButtonCustom m={10} onPress={goBack}>
                    back
                </ButtonCustom>
                <Animated.Text style={[styles.text, animatedTextStyle]}>
                    ELEMENT PAGE
                </Animated.Text>
                <Animated.View style={animStyle}>
                    <Image
                        style={[styles.image]}
                        resizeMode="cover"
                        source={require('../img/bg.jpg')}
                    />
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd',
    },
    image: {
        width: SIZE.width * 0.8, height: SIZE.width / 2
    },
    text: {fontSize: 30, color: '#000', fontWeight: 'bold'},
})

export default ItemDetail
