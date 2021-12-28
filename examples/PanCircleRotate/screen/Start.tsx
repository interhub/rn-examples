import React from 'react'
import {Image, StyleSheet, View} from 'react-native'

import CameraBox from '../components/CameraBox'

const Start = () => {
  return (
    <View style={styles.container}>
      <CameraBox>
        <Image style={styles.image} resizeMode="contain" source={require('../img/bg.jpg')} />
      </CameraBox>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78bdd0',
  },
  imgBox: {
    width: 200,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
})

export default Start
