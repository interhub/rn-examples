import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'

const LoadingFullScreen = () => {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  )
}
const styles = StyleSheet.create({
  loadingBox: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingFullScreen
