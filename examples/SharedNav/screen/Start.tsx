import React from 'react'
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'

const Start = () => {
  const LEN = 1

  return (
    <View style={styles.container}>
      <ScrollView>
        {new Array(LEN).fill(1).map((_, key) => {
          return <ListSharedItem key={key} />
        })}
      </ScrollView>
    </View>
  )
}

const ListSharedItem = () => {
  const {navigate} = useNavigation()
  const goToDetail = () => {
    navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={goToDetail} style={styles.card}>
      <SharedElement style={StyleSheet.absoluteFillObject} id="card">
        <View style={styles.cardFill} />
      </SharedElement>
      <View style={{marginBottom: 20}}>
        <SharedElement id="text">
          <Text style={styles.text}>SHARED ELEMENT PAGE</Text>
        </SharedElement>
      </View>
      <View style={styles.imgBox}>
        <SharedElement style={{}} id="image">
          <FastImage style={styles.image} resizeMode="cover" source={require('../img/bg.jpg')} />
        </SharedElement>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {fontSize: 15, color: '#fff', fontWeight: 'bold'},
  imgBox: {
    width: 200,
    height: 300,
  },
  image: {width: '100%', height: '100%', borderRadius: 15},
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 30,
    overflow: 'hidden',
    padding: 20,
  },
  cardFill: {
    flex: 1,
    backgroundColor: '#85acd3',
    borderRadius: 30,
  },
})

export default Start
