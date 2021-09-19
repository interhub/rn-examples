import React from 'react'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay} from 'react-native-reanimated'
import {canvas2Polar, Vector} from 'react-native-redash'
import {StyleSheet, useWindowDimensions} from 'react-native'

const CameraBox = ({children}: {children: React.ReactNode}) => {
  const rotate = useSharedValue(0)
  const {width, height} = useWindowDimensions()
  const center: Vector = {x: width / 2, y: height / 2}

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {rotateStart: number}>({
    onStart: (event, ctx) => {
      // const {x, y} = event
      // const {theta, radius} = canvas2Polar({x, y}, center)
      // const alpha = (theta / Math.PI) * 180
      // console.log(radius, alpha, 'RT', {x, y}, 'center = ', center)
      // rotate.value = withSpring(alpha)
    },
    onActive: (event, ctx) => {
      const {x, y} = event
      const {theta, radius} = canvas2Polar({x, y}, center)
      const alpha = (theta / Math.PI) * 180
      console.log(radius, alpha, 'RT', {x, y}, 'center = ', center)
      rotate.value = alpha
    },
    onEnd: (event) => {
      const {x, y} = event
      const unitX = x > center.x ? -1 : 1
      const unitY = y > center.y ? -1 : 1
      const {velocityX, velocityY} = event
      const speed = Math.max(velocityY, velocityX)
      rotate.value = withDecay({velocity: speed})
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${-rotate.value}deg`,
        },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFillObject}>
        <Animated.View style={[{height, width}, animatedStyle]}>{children}</Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default CameraBox
