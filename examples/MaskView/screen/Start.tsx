import React, {useEffect} from 'react'
import {Image, Platform, Text, View} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

export default function () {
    const posY = useSharedValue(0)
    const posX = useSharedValue(0)
    useEffect(() => {
        posY.value = withRepeat(withSequence(withTiming(SIZE.height /2, {duration: 3000}), withTiming(0, {duration: 3000})), -1, true)
    }, [])
    const textStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))


    return (
        <MaskedView
            style={{flex: 1}}
            maskElement={
                <Animated.Text
                    style={[{
                        fontSize: 130,
                        color: 'black',
                        fontWeight: 'bold',
                    }, textStyle]}
                >
                    Basic Mask
                </Animated.Text>
            }
        >
            <Image source={require('../img/bg.jpg')} style={{width: '100%', height: '100%'}}/>
        </MaskedView>
    )
}
