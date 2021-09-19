import React, {useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as MediaLibrary from 'expo-media-library'

import ButtonCustom from '../../../components/ButtonCustom'
import Message from '../../../src/config/Message'
import SIZE from '../../../src/config/SIZE'

const IMAGE_SIZE = 200
const NUM_COL = 3
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
      if (!uris?.length) return Message('Фото не найдено 🤷‍♂️ ⛔️ ')
      setPhotos(uris)
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
        numColumns={NUM_COL}
        windowSize={SHOW_COUNT}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Show local images list</Text>
            <ButtonCustom m={20} onPress={showPhotos}>
              Show photos
            </ButtonCustom>
          </View>
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
  const onPressImage = () => {
    console.log('was press image', uri)
  }

  return (
    <TouchableOpacity onPress={onPressImage}>
      <Image source={{uri}} style={styles.img} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7be354',
  },
  img: {width: SIZE.width / NUM_COL, height: IMAGE_SIZE},
  title: {textAlign: 'center', marginTop: 10, color: '#133213', fontSize: 20, fontWeight: 'bold'},
})
