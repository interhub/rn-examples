import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Accelerometer} from 'expo-sensors'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'

export default function App() {
    const [data, setData] = useState<any>({
        x: 0,
        y: 0,
        z: 0,
    })
    const _slow = () => {
        Accelerometer.setUpdateInterval(1000)
    }

    const _fast = () => {
        Accelerometer.setUpdateInterval(100)
    }

    useEffect(() => {
        const sub = Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData)
        })
        return () => {
            sub.remove()
        }
    }, [])

    const {x, y, z} = data

    const [posX, posY] = [useSharedValue(0), useSharedValue(0)]
    const posStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))
    const fixedRound = (num: number) => {
        'worklet'
        return parseFloat(Number(num || 0).toFixed(2))
    }
    const setUpNewPos = ({x, y}: { x: number, y: number }) => {
        'worklet'
        const COF = 50
        const newX = fixedRound(x * COF)
        const newY = fixedRound(y * COF)
        posX.value = withTiming(-newX, {duration: 200, easing: Easing.linear})
        posY.value = withTiming(newY, {duration: 200, easing: Easing.linear})
    }

    useEffect(() => {
        setUpNewPos({x, y})
    }, [x, y])


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            <Text style={styles.text}>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[{
                width: 40,
                height: 40,
                backgroundColor: 'red',
                position: 'absolute',
                left: 100,
                top: 200
            }, posStyle]}/>
        </View>
    )
}

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
