import React, {useState} from 'react'
import {Alert, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import * as MediaLibrary from 'expo-media-library'

import ButtonCustom from '../../../components/ButtonCustom'
import Message from '../../../src/config/Message'
import SIZE from '../../../src/config/SIZE'

const IMAGE_SIZE = 200
const SHOW_COUNT = Math.ceil(SIZE.height / IMAGE_SIZE || 0) + 1

export default function () {
  const [photos, setPhotos] = useState<string[]>([])

  const showPhotos = async () => {
    try {
      const {granted} = await MediaLibrary.requestPermissionsAsync()
      console.log(granted)
      if (!granted) return Message('Доступ не был предоставлен 🤷‍♂️ ⛔️ ')

      const {assets} = await MediaLibrary.getAssetsAsync({first: 30, mediaType: 'photo'})
      const uris = assets.map(({uri}) => uri)
      setPhotos(uris)
      // console.log('[showPhotos]',uris)
    } catch (e) {
      console.log(e, 'err')
      return Message('Ошибка 🤷‍♂️ ⛔️ ')
    }
  }
  return (
    <View pointerEvents={'box-none'} style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => String(index)}
        initialNumToRender={SHOW_COUNT}
        windowSize={SHOW_COUNT}
        ListHeaderComponent={
          <ButtonCustom m={20} onPress={showPhotos}>
            Show photos
          </ButtonCustom>
        }
        data={photos}
        renderItem={({item: uri}) => {
          return <ImageListItem uri={uri} />
        }}
      />
    </View>
  )
}

const ImageListItem = ({uri}: {uri: string}) => {
  return (
    <View collapsable={false}>
      <Image source={{uri}} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7be354',
  },
  img: {width: '100%', height: IMAGE_SIZE},
})
