import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'

import Header from '../components/Header'

const imageSource = require('../img/bg.jpg')

const ItemDetail = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.imgBox}>
        <SharedElement id="image">
          <FastImage style={styles.image} resizeMode="contain" source={imageSource} />
        </SharedElement>
      </View>
      <SharedElement id="text">
        <Text style={styles.text}>SHARED ELEMENT PAGE</Text>
      </SharedElement>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3d6d5c',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {fontSize: 30, color: '#FFF', fontWeight: 'bold', marginVertical: 100},
  imgBox: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: -1,
  },
})

export default ItemDetail
