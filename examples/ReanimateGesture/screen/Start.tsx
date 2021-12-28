import React from 'react'
import {StyleSheet, View} from 'react-native'

import GesturBox from '../components/GesturBox'
import TextItem from '../components/TextItem'

const Start = () => {
  return (
    <View style={styles.container}>
      <GesturBox>
        <TextItem />
      </GesturBox>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Start
