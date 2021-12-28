import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'

import Header from '../components/Header'

const imageSource = require('../img/bg.jpg')

const ItemDetail = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <SharedElement id="text">
          <Text style={styles.text}>SHARED ELEMENT TEXT</Text>
        </SharedElement>
        <View style={styles.imgBox}>
          <SharedElement id="image">
            <FastImage style={styles.image} resizeMode="cover" source={imageSource} />
          </SharedElement>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d6d5c',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
  imgBox: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: -1,
  },
})

export default ItemDetail
