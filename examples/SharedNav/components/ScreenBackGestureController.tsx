import React, {useRef} from 'react'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolate,
} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

import SIZE from '../../../src/config/SIZE'

/**
 * percent X or Y is mean need swipe distance from device size percent
 * by default X=20% Y=20%
 */
const ScreenBackGestureController = ({
  children,
  isFlex = false,
  percentY = 20,
  percentX = 20,
  disableX = false,
  disableY = false,
}: {
  children: React.ReactNode
  isFlex?: boolean
  percentX?: number
  percentY?: number
  disableX?: boolean
  disableY?: boolean
}) => {
  const y = useSharedValue(0)
  const x = useSharedValue(0)
  const {goBack} = useNavigation()

  const checkShouldGoBackAndMove = () => {
    try {
      const backValueX = (SIZE.width * percentX) / 100
      const backValueY = (SIZE.height * percentY) / 100
      const isBackX = x.value >= backValueX
      const isBackY = y.value <= -backValueY || y.value >= backValueX
      const isShouldBack = isBackX || isBackY
      if (isShouldBack) {
        goBack()
      } else {
        y.value = withSpring(0, {damping: 20})
        x.value = withSpring(0, {damping: 20})
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {startY: number; startX: number}>({
    onStart: (_, ctx) => {
      ctx.startY = y.value
      ctx.startX = x.value
    },
    onActive: (event, ctx) => {
      if (!disableY) y.value = ctx.startY + event.translationY
      if (!disableX) x.value = ctx.startX + event.translationX
    },
    onEnd: (event) => {
      runOnJS(checkShouldGoBackAndMove)()
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    const MAX_DIST = SIZE.height / 2
    const scale = interpolate(y.value, [-MAX_DIST, 0, MAX_DIST], [0.5, 1, 0.5], Extrapolate.CLAMP)
    return {
      transform: [{translateX: x.value}, {translateY: y.value}, {scale}],
    }
  })
  const flex = isFlex ? 1 : 0

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={{flex}}>
        <Animated.View style={[animatedStyle, {flex}]}>{children}</Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default ScreenBackGestureController
