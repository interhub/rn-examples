import React from 'react'
import {Dimensions, Image, StyleSheet, Text} from 'react-native'
import Animated, {interpolate, interpolateColor, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue} from 'react-native-reanimated'

const IMG_MARGIN = 20
const IMG_SIZE = 300
const IMG_FULL_SIZE = IMG_MARGIN + IMG_SIZE

const {height, width} = Dimensions.get('screen')
const Start = () => {
  const animate = useSharedValue(0)
  const data = new Array(10).fill(1)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const animDerValue = useDerivedValue(() => {
    const start = 0
    const end = data.length * IMG_FULL_SIZE
    const center = Math.floor(end / 2)
    return interpolateColor(animate.value, [start, center, end], ['#00ff00', '#fffb0b', '#9800ff'])
  })

  const animContStyle = useAnimatedStyle(() => ({
    backgroundColor: animDerValue.value,
  }))

  const scrollHandler = useAnimatedScrollHandler((event) => {
    animate.value = event.contentOffset.y
  })

  return (
    <Animated.ScrollView
      horizontal
      snapToInterval={IMG_FULL_SIZE}
      ref={scrollRef}
      decelerationRate={'fast'}
      scrollEventThrottle={1}
      onScroll={scrollHandler}
      contentContainerStyle={{paddingVertical: height * 0.3}}
      style={[styles.container, animContStyle]}>
      {data.map(({img}, key) => {
        return <ImgItem index={key} animate={animate} key={key} />
      })}
    </Animated.ScrollView>
  )
}

const ImgItem = ({index, animate}: {index: number; animate: Animated.SharedValue<number>}) => {
  const animDerValue = useDerivedValue(() => {
    const pos = {
      init: 0,
      left: width * 0.7,
    }
    const show_diff = index * IMG_FULL_SIZE
    return interpolate(animate.value, [show_diff - IMG_FULL_SIZE, show_diff, show_diff + IMG_FULL_SIZE], [pos.left, pos.init, pos.left])
  })
  const animImgBoxStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animDerValue.value}],
  }))

  return (
    <Animated.View style={[animImgBoxStyle]}>
      <Text style={styles.textItem}>Item Index is {index}</Text>
      <Image style={[styles.image]} source={require('../img/bg.jpg')} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78bdd0',
  },
  image: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: 'center',
    marginTop: IMG_MARGIN,
  },
  textItem: {
    position: 'absolute',
    top: 40,
    left: 60,
    zIndex: 1000,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
})

export default Start
