import {LongPressGestureHandler, State, TapGestureHandler, TapGestureHandlerStateChangeEvent} from 'react-native-gesture-handler'
import React, {useRef} from 'react'
import {Animated} from 'react-native'

import SIZE from './src/config/SIZE'

interface StoriesGestureControllerProps {
  children: React.ReactNode
  nextStory: () => void
  prevStory: () => void
  onPressIn: () => void
  onPressOut: () => void
}

const StoriesGestureController = ({onPressIn, onPressOut, nextStory, prevStory, children}: StoriesGestureControllerProps) => {
  const onHandlerStateChangeTap = ({nativeEvent: {state, absoluteX}}: TapGestureHandlerStateChangeEvent) => {
    // console.log(State, 'event', state, 'onHandlerStateChangeTap');
    switch (state) {
      case State.BEGAN:
        onPressIn()
        break
      case State.END:
        const isNext = absoluteX > SIZE.width / 2
        isNext ? nextStory() : prevStory()
        onPressOut()
        break
    }
  }

  const onHandlerStateChangeLong = ({nativeEvent: {state}}: TapGestureHandlerStateChangeEvent) => {
    // console.log(State, 'event', state, 'onHandlerStateChangeLong');
    switch (state) {
      case State.ACTIVE:
        onPressIn()
        break
      case State.END:
        onPressOut()
        break
    }
  }

  const longRef = useRef<LongPressGestureHandler>(null)

  return (
    <TapGestureHandler waitFor={longRef} onHandlerStateChange={onHandlerStateChangeTap}>
      <LongPressGestureHandler ref={longRef} onHandlerStateChange={onHandlerStateChangeLong}>
        <Animated.View style={{flex: 1}}>{children}</Animated.View>
      </LongPressGestureHandler>
    </TapGestureHandler>
  )
}

export default StoriesGestureController
