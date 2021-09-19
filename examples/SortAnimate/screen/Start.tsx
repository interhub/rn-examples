import React from 'react'
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native'
import Animated, {useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'

import SIZE from '../../../src/config/SIZE'

const BOX_SIZE = SIZE.width * 0.5

type Coord = {
  x: number
  y: number
}

class PositionControl {
  getOrderByCoord({x, y}: Coord): number {
    'worklet'
    const isRight = x >= BOX_SIZE
    const numCol = isRight ? 1 : 0
    const numRow = Math.floor(y / BOX_SIZE)
    return numRow * 2 + numCol
  }

  getCoordByOrder(order: number): Coord {
    'worklet'
    const IS_DEC = order % 2 === 0
    const ORDER_Y = Math.floor(order / 2)
    const x = IS_DEC ? 0 : BOX_SIZE
    const y = BOX_SIZE * ORDER_Y
    return {x, y}
  }
}

const posController = new PositionControl()

const data = new Array(9).fill({})

const Start = () => {
  const positions = new Array(10).fill(0).map((_, key) => {
    const {x, y} = posController.getCoordByOrder(key)
    return {x: useSharedValue(x), y: useSharedValue(y)}
  })

  return (
    <SafeAreaView style={[styles.container]}>
      {data.map((item, index) => {
        return <ImgItem key={index} index={index} positions={positions} />
      })}
    </SafeAreaView>
  )
}

interface ItemPropsType {
  index: number
  positions: {
    x: Animated.SharedValue<number>
    y: Animated.SharedValue<number>
  }[]
}

const ImgItem = ({index, positions}: ItemPropsType) => {
  const positionValues = positions[index]

  const zIndexAnim = useSharedValue(1)

  const boxRef = useAnimatedRef<Animated.View>()
  const onPress = () => {}

  const zIndexControl = {
    up() {
      'worklet'
      zIndexAnim.value = 1000
    },
    down() {
      'worklet'
      zIndexAnim.value = 1
    },
  }

  const resort = (startOrder: number, {x, y}: Coord) => {
    'worklet'
    zIndexControl.down()
    const occupiedIndex = positions.findIndex((pos) => pos.x.value === x && pos.y.value === y)
    if (occupiedIndex === -1) return
    const occupiedItem = positions[occupiedIndex]
    if (occupiedItem) {
      const prevCoord = posController.getCoordByOrder(startOrder)
      occupiedItem.x.value = withSpring(prevCoord.x)
      occupiedItem.y.value = withSpring(prevCoord.y)
    }
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {startX: number; startY: number; startOrder: number}>({
    onStart: (_, ctx) => {
      ctx.startX = positionValues.x.value
      ctx.startY = positionValues.y.value
      ctx.startOrder = posController.getOrderByCoord({x: positionValues.x.value, y: positionValues.y.value})
      zIndexControl.up()
    },
    onActive: (event, ctx) => {
      positionValues.x.value = ctx.startX + event.translationX
      positionValues.y.value = ctx.startY + event.translationY
      const newOrder = posController.getOrderByCoord({x: positionValues.x.value, y: positionValues.y.value})
      const occupedPos = posController.getCoordByOrder(newOrder)
      resort(ctx.startOrder, occupedPos)
    },
    onEnd: (_, ctx) => {
      const currentCoord = {x: positionValues.x.value, y: positionValues.y.value}
      const newOrder = posController.getOrderByCoord({x: currentCoord.x, y: currentCoord.y})
      const {x, y} = posController.getCoordByOrder(newOrder)
      positionValues.x.value = withSpring(x)
      positionValues.y.value = withSpring(y)
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionValues.x.value,
        },
        {
          translateY: positionValues.y.value,
        },
      ],
      zIndex: zIndexAnim.value,
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View onTouchStart={onPress} ref={boxRef} style={[styles.imageBox, animatedStyle]}>
        <Text style={styles.textItem}>Item Index is {index}</Text>
        <Image style={[styles.image]} source={require('../img/bg.jpg')} />
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78bdd0',
  },
  imageBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: 'center',
  },
  textItem: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1000,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
})

export default Start
