import React, {useEffect} from 'react'
import {Image, Text, View} from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'

export default function () {
    const posY = useSharedValue(0)
    const posX = useSharedValue(0)
    useEffect(() => {
        posY.value = withRepeat(withSequence(withTiming(100, {duration: 2000}), withTiming(-100, {duration: 2000})), -1, true)
    }, [])
    const textStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))


    return (
        <MaskedView
            style={{flex: 1, flexDirection: 'row', height: '100%'}}
            maskElement={
                <View
                    style={{
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Animated.Text
                        style={[{
                            fontSize: 130,
                            color: 'black',
                            fontWeight: 'bold',
                        }, textStyle]}
                    >
                        Basic Mask
                    </Animated.Text>
                </View>
            }
        >
            <Image source={require('../img/bg.jpg')} style={{width: '100%', height: '100%'}}/>
        </MaskedView>
    )
}
