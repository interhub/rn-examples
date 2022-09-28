import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

const LoadingFullScreen = ({color}: {color?: string}) => {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size={'small'} color={color || '#fff'} />
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
