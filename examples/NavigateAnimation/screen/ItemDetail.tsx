import React from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Animated, {interpolate} from 'react-native-reanimated'

import useGetShowAnimatedStyle from '../config/useGetShowAnimatedStyle'
import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import ButtonCustom from '../../../components/ButtonCustom'

const ItemDetail = () => {
  const navigation = useNavigation()

  const [imageStyle] = useGetShowAnimatedStyle(
    (setPoints) => {
      'worklet'
      return {
        transform: [{translateY: setPoints(600, 0)}],
      }
    },
    {delay: 200},
  )

  const [titleStyle] = useGetShowAnimatedStyle(
    (setPoints) => {
      'worklet'
      return {
        transform: [{translateY: setPoints(-600, 0)}],
      }
    },
    {delay: 100},
  )

  const next = () => {
    navigation.navigate(SCREEN_NAME_SHARED.LEFT_SCREEN)
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <ButtonCustom m={10} onPress={navigation.goBack}>
          back
        </ButtonCustom>
        <ButtonCustom color={'#408f33'} m={10} onPress={next}>
          next
        </ButtonCustom>
        <Animated.Text style={[styles.text, titleStyle]}>ELEMENT PAGE</Animated.Text>
        <Animated.Image style={[styles.image, imageStyle]} resizeMode="cover" source={require('../img/bg.jpg')} />
      </View>
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
  image: {
    width: '100%',
    height: '30%',
  },
  text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
})

export default ItemDetail
