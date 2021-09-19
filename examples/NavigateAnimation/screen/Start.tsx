import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Animated from 'react-native-reanimated'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import useGetShowAnimatedStyle from '../config/useGetShowAnimatedStyle'
import ButtonCustom from '../../../components/ButtonCustom'

const Start = () => {
  const {navigate, goBack} = useNavigation()
  const goToDetail = () => {
    navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
  }

  // const anim_state = {
  //     show: 0,
  //     hide: 500
  // }

  // const [posImg, posTxt] = [useSharedValue(anim_state.hide), useSharedValue(anim_state.hide)]
  //
  // const textStyle = useAnimatedStyle(() => ({
  //     transform: [{translateY: posTxt.value}]
  // }))
  //
  // useShowScreen((show) => {
  //     const new_pos = show ? anim_state.show : anim_state.hide
  //     const duration = 300
  //     const easing = Easing.out(Easing.sin)
  //     const animation = withSpring(new_pos, {damping: 100, stiffness: 400})
  //     posImg.value = withDelay(50, animation)
  //     posTxt.value = animation
  // })

  const [imageStyle] = useGetShowAnimatedStyle(
    (setPoints) => {
      'worklet'
      return {
        transform: [{translateY: setPoints(500, 0)}],
      }
    },
    {delay: 60},
  )
  const [textStyle] = useGetShowAnimatedStyle(
    (setPoints) => {
      'worklet'
      return {
        transform: [{translateY: setPoints(500, 0)}],
      }
    },
    {delay: 0},
  )
  const [textStyle2] = useGetShowAnimatedStyle(
    (setPoints) => {
      'worklet'
      return {
        transform: [{translateY: setPoints(-500, 0)}],
      }
    },
    {delay: 120},
  )

  return (
    <View style={styles.container}>
      <Animated.Text style={[{fontSize: 40, color: '#000', opacity: 1}, textStyle2]}>hello world! HELLO</Animated.Text>
      <ButtonCustom m={10} onPress={goBack}>
        back
      </ButtonCustom>
      <ButtonCustom color={'#408f33'} m={10} onPress={goToDetail}>
        next
      </ButtonCustom>
      <Animated.Text style={[{fontSize: 20, color: '#000', opacity: 1}, textStyle]}>hello world! HELLO</Animated.Text>
      <Animated.Image source={require('../img/bg.jpg')} style={[styles.image, imageStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffda38',
  },
  imgBox: {
    width: 200,
    height: 300,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: 'center',
  },
})

export default Start
