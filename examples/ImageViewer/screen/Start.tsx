import React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import ImageViewerProvider, {useImageViewer} from '../components/ImageViewerProvider'

const images: string[] = [
  'https://pyuer.ru/wp-content/uploads/2021/09/img-73.jpg',
  'https://obmenvsemfiles.net/get/3467433/ComputerDesktopWallpapersCollection1672_043-nashobmen.org.jpg',
  'https://24warez.ru/uploads/posts/2014-01/1388995979_sbornik_oboev_202_100.jpg',
]

export default function () {
  return (
    <ImageViewerProvider>
      <View style={styles.container}>
        <ScrollView bounces={false}>
          {images.map((uri, key) => {
            return <ImageItem uri={uri} key={key} />
          })}
        </ScrollView>
      </View>
    </ImageViewerProvider>
  )
}

const ImageItem = ({uri}: {uri: string}) => {
  const {openPhotosViewer} = useImageViewer()
  return (
    <TouchableOpacity onPress={() => openPhotosViewer(images)}>
      <FastImage source={{uri}} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
})
