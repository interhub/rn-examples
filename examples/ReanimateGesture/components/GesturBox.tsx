import clamp from 'clamp'
import React, {useRef} from 'react'
import {Button, ScrollView, Text, useWindowDimensions, View} from 'react-native'
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated'

interface GesturBoxProps {
  children: React.ReactNode
}

const AnimatedScrollView = Animated.ScrollView

const GesturBox = ({children}: GesturBoxProps) => {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
    // console.log(scrollY.value)
  })

  // const boxStyle = useAnimatedStyle(() => ({
  //     transform: [{translateY: scrollY.value * 2}],
  //     position: 'absolute',
  //     top: 0,
  // }))
  const {width, height} = useWindowDimensions()

  const pageSize = height * 2

  const ref = useRef<ScrollView>(null)

  const scrollTo = (size: number, startPos = 1, speed = 5) => {
    if (startPos >= size) return
    const speedDiff = Math.sin((2 * Math.PI) / startPos) * 10000
    console.log(speedDiff, 'diff')
    ref.current?.scrollTo({x: 0, y: speedDiff, animated: false})
    startPos += speed
    requestAnimationFrame(() => scrollTo(size, startPos))
  }

  const onScrollPress = () => {
    const SCROLL_SIZE = 700
    scrollTo(SCROLL_SIZE)
  }

  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at atque blanditiis eum fugit libero molestias numquam praesentium quae quisquam, reiciendis sapiente voluptates voluptatum? Aliquam consequuntur expedita fugiat itaque vero!'
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      <ScrollView ref={ref} style={{backgroundColor: 'red'}} scrollEventThrottle={5}>
        <View style={{height: pageSize, backgroundColor: '#4649ad', paddingTop: 200}}>
          <Button color={'red'} title={'scroll'} onPress={onScrollPress} />
          <Text>{text}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

console.log(clamp(0, 0.1, 2))

export default GesturBox
