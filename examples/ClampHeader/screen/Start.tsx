import React, {useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native'

const HEADER_SIZE = 100

export default function () {
  const scrollY = useRef(new Animated.Value(0)).current

  const headerTranslate = Animated.diffClamp(scrollY, 0, HEADER_SIZE).interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  })

  useEffect(() => {
    scrollY.addListener(({value}) => {
      console.log(value, 'val', headerTranslate)
    })
    return () => {
      scrollY.removeAllListeners()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Text style={styles.title}>Title</Text>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        contentContainerStyle={{paddingTop: HEADER_SIZE}}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}>
        {new Array(300).fill(1).map((_, key) => {
          return <Text key={key}>{key + ' hello'}</Text>
        })}
      </Animated.ScrollView>
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
