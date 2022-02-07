import {StyleSheet, View} from 'react-native'
import React from 'react'

import MyView from '../components/MyView'

export default function () {
  return (
    <View style={styles.container}>
      <MyView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2b2b2',
  },
})
