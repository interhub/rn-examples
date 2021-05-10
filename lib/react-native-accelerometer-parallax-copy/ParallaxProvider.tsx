import React, {useContext, useEffect} from 'react'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {Accelerometer} from 'expo-sensors'

const AccelerometerContext = React.createContext<{ posX: Animated.SharedValue<number>, posY: Animated.SharedValue<number> }>({} as any)

export const ParallaxProvider = ({children}: { children: React.ReactNode }) => {
    const PERIOD = 50

    const fixedRound = (num: number) => {
        const DEC = 1
        'worklet'
        return parseFloat(Number(num || 0).toFixed(DEC))
    }

    const [posX, posY] = [useSharedValue(0), useSharedValue(0)]

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

    return <AccelerometerContext.Provider value={{posX, posY}}>
        {children}
    </AccelerometerContext.Provider>
}

export type ParallaxConfig = {
    speed?: number
}

export type ParallaxObject = {
    animStyle: { transform: [{ translateX: number }, { translateY: number }] },
    posY: Animated.SharedValue<number>,
    posX: Animated.SharedValue<number>,
}

export const useParallax = (config?: ParallaxConfig): ParallaxObject => {
    const speed = config?.speed || 1
    const {posY, posX} = useContext(AccelerometerContext)

    const animStyle = useAnimatedStyle(() => ({
        transform: [{translateY: posY.value * speed || 0}, {translateX: posX.value * speed || 0}]
    }))

    // @ts-ignore
    return {animStyle, posX, posY}
}
