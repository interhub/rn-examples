import React from 'react'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from 'react-native-reanimated'

const CameraBox = ({children}: { children: React.ReactNode }) => {
    const y = useSharedValue(0)
    const x = useSharedValue(0)

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number, startX: number }>({
        onStart: (_, ctx) => {
            ctx.startY = y.value
            ctx.startX = x.value
        },
        onActive: (event, ctx) => {
            y.value = ctx.startY + event.translationY
            x.value = ctx.startX + event.translationX
            console.log('rotate')
        },
        onEnd: (event) => {
            y.value = withDecay({velocity: event.velocityY})
            x.value = withDecay({velocity: event.velocityX})
        },
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateX: interpolate(y.value, [-500, 0, 500], [-2 * Math.PI * 180, 0, 2 * Math.PI * 180]) + 'deg',
                },
                {
                    rotateY: interpolate(-x.value, [-500, 0, 500], [-2 * Math.PI * 180, 0, 2 * Math.PI * 180]) + 'deg',
                },
            ],
        }
    })

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View>
                <Animated.View style={[{height: 300, width: 300, backgroundColor: 'green'}, animatedStyle]}>
                    {children}
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    )
}


export default CameraBox
