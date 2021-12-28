import React, {useEffect, useRef} from 'react'
import {Animated, PanResponder, useWindowDimensions} from 'react-native'
import clamp from 'clamp'

interface GesturBoxProps {
  children: React.ReactNode
}

const GesturBox = ({children}: GesturBoxProps) => {
  const useNativeDriver = false

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current

  const val = Animated.diffClamp(pan, -100, 100)

  const panGesture = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
        })
        pan.setValue({x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver}),
      onPanResponderRelease: (e, {vx, vy}) => {
        pan.flattenOffset()
        Animated.decay(pan, {velocity: {x: vx, y: vy}, deceleration: 0.997, useNativeDriver}).start(() => {
          console.log('END ANIM PAN')
        })
      },
    }),
  ).current

  // useEffect(() => {
  //     pan.addListener((e) => {
  //         console.log(e, 'e')
  //     })
  // }, [])

  const {height, width} = useWindowDimensions()

  const contentSize = 1500

  const translateY = pan.y.interpolate({inputRange: [-contentSize, 0], outputRange: [-3 * contentSize, 0], extrapolate: 'clamp'})
  const rotateX = pan.y.interpolate({inputRange: [0, height], outputRange: ['0deg', '360deg'], extrapolate: 'clamp'})

  return (
    <Animated.View {...panGesture.panHandlers} style={{flex: 1, backgroundColor: 'lightblue'}}>
      <Animated.View style={{transform: [{translateY}]}}>{children}</Animated.View>
    </Animated.View>
  )
}

console.log(clamp(0, 0.1, 2))

export default GesturBox
