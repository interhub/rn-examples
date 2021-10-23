import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import {useNavigation} from '@react-navigation/native'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'

export const HEADER_HEIGHT = 50

const Header = () => {
  const {navigate, goBack} = useNavigation()
  const goToSetting = () => navigate(SCREEN_NAME_SHARED.SETTING)
  return (
    <View style={[styles.container]}>
      <TouchableScale onPress={goBack}>
        <Text style={styles.text}>BACK</Text>
      </TouchableScale>
      <TouchableScale onPress={goToSetting}>
        <Text style={styles.text}>SETTING</Text>
      </TouchableScale>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#285343',
    zIndex: 1000,
    paddingHorizontal: 15,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
})

export default Header
