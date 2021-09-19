import React, {useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useNavigation} from '@react-navigation/native'
import {useParallax} from 'react-native-accelerometer-parallax'

import SIZE from '../../../src/config/SIZE'
import {SCREEN_NAME_ACCELEROMETER} from '../constants/SCREEN_NAME_ACCELEROMETER'
import ButtonCustom from '../../../components/ButtonCustom'

export default function Start() {
  const POINT_MATCH = 10
  const {navigate} = useNavigation()
  const goNext = () => {
    navigate(SCREEN_NAME_ACCELEROMETER.ITEM_DETAIL)
    // console.log('press')
  }

  const {animStyle} = useParallax({sensitivity: 0.5})

  return (
    <View style={styles.container}>
      <Animated.View style={[animStyle, {width: '100%'}]}>
        <ButtonCustom onPress={goNext}>Go Next</ButtonCustom>
      </Animated.View>
      {new Array(POINT_MATCH).fill(1).map((_, index) => {
        return <BoxItem key={index} />
      })}
    </View>
  )
}

const BoxItem = React.memo(
  () => {
    const POINT_SIZE = 20

    const getRandomCoord = useMemo(
      () => () => {
        const diff = POINT_SIZE / 2
        const {width, height} = SIZE
        const x = Math.random() * width - diff
        const y = Math.random() * height - diff
        return {x, y}
      },
      [],
    )

    const {x: left, y: top} = useMemo(() => getRandomCoord(), [])

    const minSpeed = 0.2
    const maxSpeed = 3
    const randomSpeed = useMemo(() => (Math.random() + minSpeed) * maxSpeed, [])

    const {animStyle} = useParallax({sensitivity: randomSpeed})

    const SIZE_DIFF = POINT_SIZE + (POINT_SIZE / 2) * randomSpeed

    return (
      <Animated.View
        style={[
          {
            width: SIZE_DIFF,
            height: SIZE_DIFF,
            backgroundColor: '#50068d',
            position: 'absolute',
            left,
            top,
            elevation: 10,
            shadowRadius: 10,
            shadowOpacity: 2,
            zIndex: SIZE_DIFF,
          },
          animStyle,
        ]}>
        <Text numberOfLines={1} style={styles.text}>
          NEXT
        </Text>
      </Animated.View>
    )
  },
  () => true,
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  text: {
    textAlign: 'center',
    color: '#999999',
  },
  pressBox: {
    flex: 1,
    justifyContent: 'center',
  },
})
