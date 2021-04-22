import React, {useLayoutEffect, useState} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated'

const Start = () => {


    const {navigate} = useNavigation()
    const goToDetail = () => {
        navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
    }

    const [count, setCount] = useState(0)

    const [posImg, posTxt] = [useSharedValue(0), useSharedValue(0)]
    const imageStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posImg.value}]
    }))
    const textStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posTxt.value}]
    }))

    useShowScreen((show) => {
        console.log('call show', show)
        const new_pos = show ? 0 : 500
        posImg.value = withDelay(100, withTiming(new_pos))
        posTxt.value = withTiming(new_pos)
    })

    const increment = () => {
        setCount(count + 1)
    }

    return (
        <View style={styles.container}>
            <Button title={'navigate'} onPress={goToDetail}/>
            <Button title={'increment'} onPress={increment}/>
            <Animated.Text style={[{fontSize: 40, color: '#000', opacity: 1}, textStyle]}>
                hello world! HELLO
            </Animated.Text>
            <Animated.Image source={require('../img/bg.jpg')} style={[styles.image, imageStyle]}/>
        </View>
    )
}


const useShowScreen = (effect: (show: boolean) => void) => {
    const isFocused = useIsFocused()

    useLayoutEffect(() => {
        if (effect)
            effect(isFocused)
    }, [isFocused])
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#78bdd0',
    },
    imgBox: {
        width: 200, height: 300,
    },
    image: {
        width: 200,
        height: 100,
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        alignSelf: 'center'
    }
})

export default Start

