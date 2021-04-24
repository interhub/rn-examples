import React, {useContext, useEffect, useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Accelerometer} from 'expo-sensors'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'

export default function App() {

    const POINT_MATCH = 50

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

    const minSpeed = 0.2
    const maxSpeed = 3
    const randomSpeed = (Math.random() + minSpeed) * maxSpeed

    const {animStyle} = useParallax({speed: randomSpeed})

    const SIZE_DIFF = POINT_SIZE + ((POINT_SIZE / 2) * (randomSpeed))

    return <Animated.View
        style={[{
            width: SIZE_DIFF,
            height: SIZE_DIFF,
            backgroundColor: '#50068d',
            position: 'absolute',
            left,
            top,
            elevation: 10,
            shadowRadius: 10,
            shadowOpacity: 2,
        }, animStyle]}/>
}, () => true)

const AccelerometerContext = React.createContext<{ posX: Animated.SharedValue<number>, posY: Animated.SharedValue<number> }>({} as any)

const ParallaxProvider = ({children}: { children: React.ReactNode }) => {

    const PERIOD = 200

    const fixedRound = (num: number) => {
        const DEC = 1
        'worklet'
        return parseFloat(Number(num || 0).toFixed(DEC))
    }

    const setUpNewPos = ({x, y}: { x: number, y: number }) => {
        'worklet'
        const DEFAULT_SPEED = 200
        const newX = fixedRound(x * DEFAULT_SPEED)
        const newY = fixedRound(y * DEFAULT_SPEED)
        const config: Animated.WithTimingConfig = {duration: 500, easing: Easing.linear}
        posX.value = withTiming(-newX, config)
        posY.value = withTiming(newY, config)
    }

    useEffect(() => {
        Accelerometer.setUpdateInterval(PERIOD)

        const sub = Accelerometer.addListener(({x, y}) => {
            'worklet'
            console.log('x,y', x, y)
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

const useParallax = (config?: { speed?: number }) => {
    const speed = config?.speed || 1
    const {posY, posX} = useContext(AccelerometerContext)

    const animStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value * speed}, {translateX: posX.value * speed}]
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
