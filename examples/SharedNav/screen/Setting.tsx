import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'

import Header, {HEADER_HEIGHT} from '../components/Header'

const ItemDetail = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SharedElement id={'card'} style={{...StyleSheet.absoluteFillObject, zIndex: -1, top: HEADER_HEIGHT}}>
        <View style={styles.cardFill} />
      </SharedElement>
      <View style={styles.imgBox}>
        <SharedElement id="image">
          <FastImage style={styles.image} resizeMode="contain" source={require('../img/bg.jpg')} />
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
    backgroundColor: '#000',
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
  cardFill: {
    flex: 1,
    backgroundColor: '#85acd3',
  },
})

export default ItemDetail
