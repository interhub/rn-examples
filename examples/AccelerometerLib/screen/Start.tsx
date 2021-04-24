import React, {useContext, useEffect, useMemo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Accelerometer} from 'expo-sensors'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

export default function App() {

    const POINT_MATCH = 30

    return (
        <ParallaxProvider>
            <View style={styles.container}>
                <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
                {new Array(POINT_MATCH).fill(1).map((_, index) => {
                    return <BoxItem key={index}/>
                })}
            </View>
        </ParallaxProvider>
    )
}

const BoxItem = React.memo(() => {
    const POINT_SIZE = 20


    const getRandomCoord = () => {
        'worklet'
        const diff = (POINT_SIZE / 2)
        const {width, height} = SIZE
        const x = Math.random() * width - diff
        const y = Math.random() * height - diff
        return {x, y}
    }

    const {x: left, y: top} = useMemo(() => getRandomCoord(), [])

    const {animStyle} = useParallax()

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

const AccelerometerContext = React.createContext<{ posX: Animated.SharedValue<number>, posY: Animated.SharedValue<number> }>({} as any)

const ParallaxProvider = ({children}: { children: React.ReactNode }) => {

    const PERIOD = 200

    const fixedRound = (num: number) => {
        'worklet'
        return parseFloat(Number(num || 0).toFixed(3))
    }

    const setUpNewPos = ({x, y}: { x: number, y: number }) => {
        'worklet'
        const SPEED = 100
        const newX = fixedRound(x * SPEED)
        const newY = fixedRound(y * SPEED)
        const config: Animated.WithTimingConfig = {duration: PERIOD, easing: Easing.linear}
        posX.value = withTiming(-newX, config)
        posY.value = withTiming(newY, config)
    }

    useEffect(() => {
        Accelerometer.setUpdateInterval(PERIOD)

        const sub = Accelerometer.addListener(({x, y}) => {
            'worklet'
            setUpNewPos({x, y})
        })
        return () => {
            sub.remove()
        }
    }, [])

    const [posX, posY] = [useSharedValue(0), useSharedValue(0)]

    return <AccelerometerContext.Provider value={{posX, posY}}>
        {children}
    </AccelerometerContext.Provider>
}

const useParallax = () => {
    const {posY, posX} = useContext(AccelerometerContext)

    const animStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value}, {translateX: posX.value}]
    }))

    return {animStyle}
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
})
