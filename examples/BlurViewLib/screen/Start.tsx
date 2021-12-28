import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {BlurView} from '@react-native-community/blur'

import SIZE from '../../../src/config/SIZE'

const image = require('../img/bg.jpg')

const BLUR_HEIGHT = SIZE.height / 4
const BLUR_WIDTH = SIZE.width * 0.8

export default () => {
  return (
    <View>
      <Image resizeMode={'cover'} style={styles.img} source={image} />
      <Text style={styles.title}>Hello world!</Text>
      <BlurView
        style={styles.blur}
        blurType={'dark'}
        blurRadius={1}
        blurAmount={1}
        reducedTransparencyFallbackColor={'#de7575'}
        overlayColor={'#fffff00'}>
        <View style={{height: BLUR_HEIGHT, width: BLUR_WIDTH, paddingTop: BLUR_HEIGHT / 2.5}}>
          <Text style={styles.title}>Hello BLUR!</Text>
        </View>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#9c83df',
  },
  img: {width: '100%', height: '100%'},
  blur: {position: 'absolute', width: BLUR_WIDTH, height: BLUR_HEIGHT, bottom: 200},
  title: {alignSelf: 'center', fontSize: 30, color: '#FFF'},
})
