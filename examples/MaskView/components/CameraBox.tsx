import React from 'react'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay} from 'react-native-reanimated'

const CameraBox = ({children}: {children: React.ReactNode}) => {
  const y = useSharedValue(0)
  const x = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {startY: number; startX: number}>({
    onStart: (_, ctx) => {
      ctx.startY = y.value
      ctx.startX = x.value
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY
      x.value = ctx.startX + event.translationX
    },
    onEnd: (event) => {
      y.value = withDecay({velocity: event.velocityY})
      x.value = withDecay({velocity: event.velocityX})
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View>
        <Animated.View style={[animatedStyle, {width: 300, height: 300}]}>{children}</Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default CameraBox
