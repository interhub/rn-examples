import React from 'react'
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'

const HEADER_SIZE = 100

export default function () {
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={{paddingTop: HEADER_SIZE}}>
        {new Array(300).fill(1).map((_, key) => {
          return <Text key={key}>{key + ' hello'}</Text>
        })}
      </ScrollView>
    </View>
  )
}

const ImageListItem = ({uri}: {uri: string}) => {
  return (
    <View>
      <Image source={{uri}} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7be354',
  },
  img: {width: '100%', height: 300},
})
