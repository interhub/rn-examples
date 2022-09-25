import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

const LoadingFullScreen = () => {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size={'small'} color={'#fff'} />
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
