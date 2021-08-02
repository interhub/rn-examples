import React from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import Animated, {
    Extrapolate,
    interpolate, interpolateColor,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import SIZE from '../../../src/SIZE'
import {inRange} from 'lodash'
import {integerColor} from 'react-native-svg/lib/typescript/lib/extract/extractColor'

const BOX_SIZE = 100
const HALF_SCREEN = SIZE.getVH(50)
const downPosition = SIZE.height - 2 * BOX_SIZE

export default function () {

    const y = useSharedValue(0)
    const x = useSharedValue(0)

    const setInRange = () => {
        const isMoreHalf = !inRange(y.value, 0, HALF_SCREEN)
        console.log(y.value, 'y.value', HALF_SCREEN, isMoreHalf)
        y.value = isMoreHalf ? withSpring(downPosition) : withSpring(0)
    }

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number, startX: number }>({
        onStart: (_, ctx) => {
            ctx.startY = y.value
            ctx.startX = x.value
        },
        onActive: (event, ctx) => {
            y.value = event.translationY + ctx.startY
            x.value = event.translationX + ctx.startX
        },
        onEnd: (event) => {
            console.log(y.value, 'y.value')
            // y.value = withDecay({velocity: event.velocityY})
            // x.value = withDecay({velocity: event.velocityX})
            runOnJS(setInRange)()
            x.value = withSpring(0)
        },
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            // transform: [
            //     {
            //         translateX: x.value
            //     },
            //     {
            //         translateY: y.value
            //     },
            // ],
            // opacity: interpolate(y.value, [0, downPosition], [0, 1], Extrapolate.CLAMP),
            backgroundColor: interpolateColor(y.value, [0, downPosition], ['#9a9999', '#41503d'])
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View>
                    <Animated.View style={[styles.swipeBox,]}>
                        <Text>Swipe It</Text>
                    </Animated.View>
                    <Animated.View style={[styles.colorPanel, animatedStyle]}/>
                </Animated.View>
            </PanGestureHandler>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    swipeBox: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        backgroundColor: 'green',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#222222'
    },
    colorPanel: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'red'
    }
})
