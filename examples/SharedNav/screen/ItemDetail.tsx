import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'

import Start from './Start'

import Header from '../components/Header'

const ItemDetail = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <SharedElement id="text">
          <Text style={styles.text}>SHARED ELEMENT PAGE</Text>
        </SharedElement>
        <View style={styles.imgBox}>
          <SharedElement id="image">
            <Image style={styles.image} resizeMode="cover" source={require('../img/bg.jpg')} />
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
    backgroundColor: '#000',
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
