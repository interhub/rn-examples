import React, {useRef, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {FlatList} from 'react-native-gesture-handler'

import SIZE from '../../../src/config/SIZE'
import StoriesGestureController from '../components/StoriesGestureController'
import TopTimerIndicator from '../components/TopTimerIndicator'
import LoadingFullScreen from '../components/LoadingFullScreen'

const images = [
  'https://w-dog.ru/wallpapers/10/2/548658425817633/ozero-derevya-gory.jpg',
  'https://cdn1.ozone.ru/s3/multimedia-0/6054403776.jpg',
  'https://content-20.foto.my.mail.ru/mail/madoroff/_cover/b-3.jpg',
  'https://i.pinimg.com/originals/f3/df/4a/f3df4a82b4782c0be372e673c7ca3df4.jpg',
  'https://w-dog.ru/wallpapers/10/2/548658425817633/ozero-derevya-gory.jpg',
]

export default function () {
  const scrollRef = useRef<FlatList>(null)
  const [index, setIndex] = useState(0)
  const [isScrollingProcess, setIsScrollingProcess] = useState(false)
  const [isStop, setIsStop] = useState(false)
  const {goBack} = useNavigation()
  const setScrollToIndex = (index: number) => {
    if (!images[index]) return goBack()
    setIsScrollingProcess(true)
    setTimeout(() => {
      setIsScrollingProcess(false)
    }, 250)
    scrollRef?.current?.scrollToIndex({index, animated: true})
    setIndex(index)
  }

  return (
    <View style={styles.container}>
      <LoadingFullScreen />
      <StoriesGestureController
        disabled={isScrollingProcess}
        onPressIn={() => setIsStop(true)}
        onPressOut={() => setIsStop(false)}
        nextStory={() => setScrollToIndex(index + 1)}
        prevStory={() => setScrollToIndex(index - 1)}>
        <FlatList
          onScrollBeginDrag={() => setIsStop(true)}
          onMomentumScrollEnd={({
            nativeEvent: {
              contentOffset: {x},
            },
          }) => {
            const index = Math.ceil(x / SIZE.width)
            setScrollToIndex(index)
            setIsStop(false)
          }}
          decelerationRate={'fast'}
          snapToInterval={SIZE.width}
          scrollEnabled={!isScrollingProcess}
          ref={scrollRef}
          bounces={false}
          horizontal
          data={images}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => <FastImage source={{uri: item}} style={styles.image} />}
        />
      </StoriesGestureController>
      <TopTimerIndicator isStop={isStop} index={index} time={3000} len={images.length} setNext={() => setScrollToIndex(index + 1)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#134342',
  },
  image: {
    width: SIZE.width,
    height: '100%',
  },
})
