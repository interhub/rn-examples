import React, {MutableRefObject, useRef} from 'react'
import {Button, StyleSheet, View, Text} from 'react-native'
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'

type Coord = {
    x: number,
    y: number,
    width: number
    height: number
}

const config: Animated.WithTimingConfig = {duration: 500}

const Start = () => {

    const oneRef = useRef<View>(null)
    const twoRef = useRef<View>(null)

    const getCoordDiff = (coordOne: Coord, coordTwo: Coord): { x: number, y: number, size: number } => {
        'worklet'
        const diffX = (coordTwo.x - coordOne.x) || 0
        const diffY = (coordTwo.y - coordOne.y) || 0
        const size = (coordTwo.width + coordTwo.height) / (coordOne.width + coordOne.height)
        return {x: diffX, y: diffY, size}
    }

    const getCoordByRef = async (ref: MutableRefObject<any>): Promise<Coord> => {
        return await new Promise((ok) => {
            return ref?.current?.measureInWindow((x: any, y: any, width: any, height: number) => {
                const centerX = x + (width / 2)
                const centerY = y + (height / 2)
                console.log(x, y, width, height, centerX, centerY, 'w')
                return ok({x: centerX, y: centerY, width, height})
            })
        })
    }

    const [posX, posY, scale, opacity] = [useSharedValue(0), useSharedValue(0), useSharedValue(1), useSharedValue(1)]

    const show = () => {
        'worklet'
        opacity.value = 1
    }
    const hide = () => {
        'worklet'
        opacity.value = 0
    }

    const move = async () => {
        const coordOne = await getCoordByRef(oneRef)
        const coordTwo = await getCoordByRef(twoRef)
        const diff = getCoordDiff(coordOne, coordTwo)
        posX.value = withTiming(diff.x, config)
        posY.value = withTiming(diff.y, config)
        scale.value = withTiming(diff.size, config, () => {
            hide()
        })

        console.log(diff, 'diff')
    }
    const reset = () => {
        show()
        posX.value = withTiming(0, config)
        posY.value = withTiming(0, config)
        scale.value = withTiming(1, config)
    }

    const oneStyle = useAnimatedStyle(() => ({
        transform: [{translateX: posX.value}, {translateY: posY.value}, {scale: scale.value}],
        opacity: opacity.value
    }))

    return (
        <View style={styles.container}>
            <Animated.View style={{opacity: 1, marginBottom: 100, marginLeft: -20}} ref={oneRef as any}
                           collapsable={false}>
                <Animated.Text style={[{fontSize: 70, color: '#000'}, oneStyle]}>hello world!</Animated.Text>
            </Animated.View>
            <Button title={'move'} onPress={move}/>
            <Button title={'reset'} onPress={reset}/>
            <Animated.View collapsable={false} ref={twoRef as any}>
                <Animated.Text style={[{fontSize: 40, color: '#000'}]}>hello world!</Animated.Text>
            </Animated.View>
        </View>
    )
}

// const Title = () => {
//     return <Text>hello world!</Text>
// }

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
        width: '100%',
        height: '100%',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10
    }
})

export default Start

