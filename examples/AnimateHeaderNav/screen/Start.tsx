import React from 'react'
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native'

import useNavigationAnimateValue from '../../../src/hooks/useNavigationAnimateValue'

const HEADER_SIZE = 100

export default function () {
  const animateValue = useNavigationAnimateValue({startOpen: -1, endOpen: 1, extra: 'clamp'})

  const animateTranslateHeaderStyle = {
    opacity: animateValue,
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, animateTranslateHeaderStyle]}>
        <Text style={styles.title}>Title</Text>
      </Animated.View>
      <ScrollView bounces={false} contentContainerStyle={{paddingTop: HEADER_SIZE}} scrollEventThrottle={16}>
        {new Array(300).fill(1).map((_, key) => {
          return <Text key={key}>{key + ' hello'}</Text>
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_SIZE,
    backgroundColor: 'blue',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: 'auto',
    color: '#FFF',
    fontSize: 20,
  },
})
