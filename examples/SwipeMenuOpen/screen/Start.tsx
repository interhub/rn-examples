import React from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {inRange} from 'lodash'

import SIZE from '../../../src/config/SIZE'

const BOX_SIZE = 100
const REACT_MIN_SPEED = 1000
const HALF_SCREEN = SIZE.getVH(50)
const downPosition = SIZE.height - 2 * BOX_SIZE

export default function () {
  const y = useSharedValue(0)
  const x = useSharedValue(0)

  const setInRange = (speed: number = 0) => {
    const isMoreHalf = !inRange(y.value, 0, HALF_SCREEN)
    const isFast = Math.abs(speed) >= REACT_MIN_SPEED
    if (isFast) {
      y.value = isMoreHalf ? withTiming(0) : withTiming(downPosition)
    } else {
      y.value = isMoreHalf ? withTiming(downPosition) : withTiming(0)
    }
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {startY: number; startX: number}>({
    onStart: (_, ctx) => {
      ctx.startY = y.value
      ctx.startX = x.value
    },
    onActive: (event, ctx) => {
      y.value = event.translationY + ctx.startY
      x.value = event.translationX + ctx.startX
    },
    onEnd: (event) => {
      const speed = event.velocityY
      // y.value = withDecay({velocity: event.velocityY})
      // x.value = withDecay({velocity: event.velocityX})
      runOnJS(setInRange)(speed)
      x.value = withTiming(0)
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   translateX: x.value,
        // },
        {
          translateY: y.value,
        },
      ],
      // opacity: interpolate(y.value, [0, downPosition], [0, 1], Extrapolate.CLAMP),
      backgroundColor: interpolateColor(y.value, [0, downPosition], ['#9a9999', '#41503d']),
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Animated.View style={[styles.swipeBox]}>
            <Text>Swipe It</Text>
          </Animated.View>
          <Animated.View style={[styles.colorPanel, animatedStyle]} />
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
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  colorPanel: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
  },
})
