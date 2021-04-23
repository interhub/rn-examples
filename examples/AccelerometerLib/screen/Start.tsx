import React, {useEffect, useMemo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Accelerometer} from 'expo-sensors'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

export default function App() {
    const _slow = () => {
        Accelerometer.setUpdateInterval(1000)
    }

    const _fast = () => {
        Accelerometer.setUpdateInterval(200)
    }

    useEffect(() => {
        const sub = Accelerometer.addListener(({x, y}) => {
            'worklet'
            setUpNewPos({x, y})
        })
        return () => {
            sub.remove()
        }
    }, [])


    const [posX, posY] = [useSharedValue(0), useSharedValue(0)]

    const fixedRound = (num: number) => {
        'worklet'
        return parseFloat(Number(num || 0).toFixed(3))
    }
    const setUpNewPos = ({x, y}: { x: number, y: number }) => {
        'worklet'
        const SPEED = 200
        const newX = fixedRound(x * SPEED)
        const newY = fixedRound(y * SPEED)
        const config: Animated.WithTimingConfig = {duration: 500, easing: Easing.linear}
        posX.value = withTiming(-newX, config)
        posY.value = withTiming(newY, config)
    }


    const POINT_MATCH = 30

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
            {new Array(POINT_MATCH).fill(1).map((_, index) => {
                return <BoxItem posX={posX} posY={posY} key={index}/>
            })}
        </View>
    )
}

const BoxItem = React.memo(({posY, posX}: { posY: Animated.SharedValue<any>, posX: Animated.SharedValue<any> }) => {
    const POINT_SIZE = 20

    const animStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))

    const getRandomCoord = () => {
        'worklet'
        const diff = (POINT_SIZE / 2)
        const {width, height} = SIZE
        const x = Math.random() * width - diff
        const y = Math.random() * height - diff
        return {x, y}
    }

    const {x: left, y: top} = useMemo(() => getRandomCoord(), [])

    return <Animated.View
        style={[{
            width: POINT_SIZE,
            height: POINT_SIZE,
            backgroundColor: 'red',
            position: 'absolute',
            left,
            top
        }, animStyle]}/>
}, () => true)

function round(n: any) {
    if (!n) {
        return 0
    }
    return Math.floor(n * 100) / 100
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
})
