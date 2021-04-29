import React, {useEffect} from 'react'
import {Image, SafeAreaView} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

export default function () {
    const posY = useSharedValue(0)
    const posX = useSharedValue(0)
    useEffect(() => {
        posY.value = withRepeat(withSequence(withTiming(SIZE.height / 2.5, {duration: 3000}), withTiming(0, {duration: 3000})), -1, true)
    }, [])
    const textStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
            {/*<CameraBox>*/}
            <MaskedView
                onTouchStart={() => console.log('aaaa')}
                style={{flex: 1,}}
                maskElement={
                    <Animated.Text
                        numberOfLines={3}
                        style={[{
                            fontSize: SIZE.width / 4,
                            color: 'black',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }, textStyle]}
                    >
                        Basic Mask Example
                    </Animated.Text>
                }
            >
                <Image source={require('../img/bg.jpg')} style={{width: '100%', height: '100%'}}/>
            </MaskedView>
            {/*</CameraBox>*/}
        </SafeAreaView>
    )
}
