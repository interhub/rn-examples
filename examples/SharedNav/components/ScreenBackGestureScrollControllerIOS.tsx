import React, {useRef} from 'react'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolate,
  withTiming,
  useDerivedValue,
  runOnUI,
} from 'react-native-reanimated'
import {NativeViewGestureHandler, PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

import SIZE from '../../../src/config/SIZE'
import IS_IOS from '../../../src/config/IS_IOS'

/**
 * FOR IOS Only
 * percent X or Y is mean need swipe distance from device size percent
 * by default X=20% Y=20%
 */
const ScreenBackGestureScrollControllerIOS = ({
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
  const isEnabledScrollValue = useSharedValue(true)
  const gestureRef = useRef<PanGestureHandler>(null)
  const scrollRef = useRef<ScrollView>(null)

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
      if (!IS_IOS) return
      const sumTransY = ctx.startY + event.translationY
      const IS_CANCEL = sumTransY <= 0
      if (IS_CANCEL) {
        y.value = withTiming(0)
        x.value = withTiming(0)
        return
      }
      if (isEnabledScrollValue && isEnabledScrollValue?.value) {
        y.value = withTiming(0, {duration: 300})
        x.value = withTiming(0, {duration: 300})
        ctx.startY = -event.translationY
        ctx.startX = -event.translationX
        return
      }
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
    <PanGestureHandler simultaneousHandlers={scrollRef} ref={gestureRef} onGestureEvent={gestureHandler}>
      <Animated.View style={{flex}}>
        <Animated.View style={[animatedStyle, {flex}]}>
          <ScrollView
            overScrollMode={'never'}
            simultaneousHandlers={gestureHandler}
            enabled={isEnabledScrollValue.value}
            onScroll={({nativeEvent}) => {
              const y = nativeEvent.contentOffset.y || 0
              const isDisabledScroll = y < 0
              isEnabledScrollValue.value = !isDisabledScroll
            }}
            ref={scrollRef}
            scrollEnabled
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default ScreenBackGestureScrollControllerIOS
