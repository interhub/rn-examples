import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'

import Header from '../components/Header'
import SIZE from '../../../src/config/SIZE'
import ScreenBackGestureController from '../components/ScreenBackGestureController'

const ItemDetail = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScreenBackGestureController isFlex>
        <View style={styles.card}>
          <SharedElement id={'card'} style={{...StyleSheet.absoluteFillObject, zIndex: -1}}>
            <View style={styles.cardFill} />
          </SharedElement>
          <SharedElement id="text">
            <Text style={styles.text}>SHARED ELEMENT PAGE</Text>
          </SharedElement>
          <View style={styles.imgBox}>
            <SharedElement id="image">
              <FastImage style={styles.image} resizeMode="cover" source={require('../img/bg.jpg')} />
            </SharedElement>
          </View>
        </View>
      </ScreenBackGestureController>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  text: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
  imgBox: {
    width: '100%',
    height: SIZE.height / 3,
    top: 0,
    position: 'absolute',
    zIndex: -1,
  },
  container: {flex: 1, backgroundColor: '#000'},
  cardFill: {
    flex: 1,
    backgroundColor: '#3d6d5c',
    borderRadius: 5,
  },
})

export default ItemDetail
