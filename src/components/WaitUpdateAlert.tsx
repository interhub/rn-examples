import React, {useContext} from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'

const WaitUpdateAlert = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Установка обновлений</Text>
      <ActivityIndicator style={{marginTop: 20}} color={'green'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
})

export default WaitUpdateAlert
