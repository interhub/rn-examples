import React, {useEffect} from 'react'
import {Image, SafeAreaView} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

import SIZE from '../../../src/config/SIZE'
import ButtonCustom from '../../../components/ButtonCustom'

export default function () {
  const {animatedStyle, gestureHandler} = useGestureTranslate()
  const {goBack} = useNavigation()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{flex: 1}}>
          <MaskedView
            style={{flex: 1}}
            maskElement={
              <Animated.Text
                numberOfLines={3}
                style={[
                  {
                    fontSize: SIZE.width / 4,
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  },
                  animatedStyle,
                ]}>
                Basic Mask Example
              </Animated.Text>
            }>
            <Image source={require('../img/bg.jpg')} style={{width: '100%', height: '100%'}} />
          </MaskedView>
        </Animated.View>
      </PanGestureHandler>
      <ButtonCustom onPress={goBack} m={10}>
        Back
      </ButtonCustom>
    </SafeAreaView>
  )
}

const useGestureTranslate = () => {
  const y = useSharedValue(0)
  const x = useSharedValue(0)

  const setUpAutoAnimate = () => {
    x.value = withTiming(0, {duration: 3000})
    y.value = withRepeat(withSequence(withTiming(SIZE.height / 2.5, {duration: 3000}), withTiming(0, {duration: 3000})), -1, true)
  }
  const setTimer = () => {
    setTimeout(() => {
      setUpAutoAnimate()
    }, 1000)
  }

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
      runOnJS(setTimer)()
    },
    onFinish: (event) => {
      console.log(event.y, 'finish')
    },
  })

  useEffect(() => {
    setUpAutoAnimate()
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    }
  })

  return {animatedStyle, gestureHandler}
}
