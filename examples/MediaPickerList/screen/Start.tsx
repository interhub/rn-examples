import React, {useEffect, useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import {Video} from 'expo-av'
import _ from 'lodash'
import {Ionicons} from '@expo/vector-icons'
import * as VideoThumbnails from 'expo-video-thumbnails'

import ButtonCustom from '../../../components/ButtonCustom'
import Message from '../../../src/config/Message'
import SIZE from '../../../src/config/SIZE'

/**
 * TODO solwe problem
 * 1) show video with photos and select it settings
 * 2) android top swipe problem screen
 */

const IMAGE_SIZE = 200
const NUM_COL = 3
const SHOW_COUNT = Math.floor((SIZE.height * 3) / IMAGE_SIZE || 0) + 1
console.log(SHOW_COUNT, 'SHOW_COUNT')

export default function () {
  const [files, setFiles] = useState<MediaLibrary.Asset[]>([])

  const getSortedAssets = (assets: MediaLibrary.Asset[]) => {
    return _.sortBy(_.clone(assets), (a) => -a.creationTime)
  }

  const showMedia = async () => {
    try {
      const {granted} = await MediaLibrary.requestPermissionsAsync()
      if (!granted) return Message('Доступ не был предоставлен 🤷‍♂️ ⛔️ ')
      const first = 1000
      const {assets: videoAssets} = await MediaLibrary.getAssetsAsync({first, mediaType: 'video'})
      const {assets: photoAssets} = await MediaLibrary.getAssetsAsync({first, mediaType: 'photo'})
      const assetSorted = getSortedAssets(videoAssets.concat(photoAssets))
      if (!assetSorted?.length) return Message('Фото не найдено 🤷‍♂️ ⛔️ ')
      setFiles(assetSorted)
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
        windowSize={NUM_COL}
        removeClippedSubviews
        data={files}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Show local images list</Text>
            <ButtonCustom m={10} onPress={showMedia}>
              Show media
            </ButtonCustom>
          </View>
        }
        renderItem={({item: asset}) => {
          const isVideo = asset?.mediaType === 'video'
          if (isVideo) return <VideoAssetListItem asset={asset} />
          if (!isVideo) return <ImageAssetListItem asset={asset} />
          return null
        }}
      />
    </View>
  )
}

const ImageAssetListItem = ({asset}: {asset?: MediaLibrary.Asset}) => {
  const onPressImage = () => {
    console.log('was press image', asset)
  }

  const uri = asset?.uri || ''

  const isExist = !!uri
  if (!isExist) return null

  return (
    <TouchableOpacity onPress={onPressImage}>
      <Image source={{uri}} style={styles.media} />
    </TouchableOpacity>
  )
}

const VideoAssetListItem = ({asset}: {asset?: MediaLibrary.Asset}) => {
  const [isPlay, setIsPlay] = useState(false)
  const videoRef = React.useRef<Video>(null)

  const onPressImage = async () => {
    if (isPlay) return setIsPlay(false)
    setIsPlay(true)
  }

  useEffect(() => {
    if (isPlay) videoRef?.current?.playAsync()
    if (!isPlay) {
      videoRef?.current?.stopAsync()
      videoRef?.current?.unloadAsync()
    }
  }, [isPlay])

  useEffect(() => {
    return () => setIsPlay(false)
  }, [])

  const uri = asset?.uri || ''

  const {thumbUri, isLoadedThumb} = useThumbnalVideo(uri)

  const isExist = !!uri
  if (!isExist) return null

  return (
    <TouchableOpacity onPress={onPressImage}>
      <Ionicons name={'play'} size={15} color={'#8e8f90'} style={styles.camIcon} />
      {!isPlay && isLoadedThumb && <Image source={{uri: thumbUri}} style={styles.media} />}
      {isPlay && (
        <Video
          ref={videoRef}
          style={styles.media}
          source={{
            uri,
          }}
          resizeMode={'cover'}
          isLooping
        />
      )}
    </TouchableOpacity>
  )
}

const useThumbnalVideo = (videoUri?: string) => {
  const [thumbUri, setThumbUri] = useState('')

  const generateThumbnail = async () => {
    try {
      if (!videoUri) return
      const {uri = ''} = await VideoThumbnails.getThumbnailAsync(videoUri, {time: 100})
      if (!uri) return
      setThumbUri(uri)
    } catch (e) {
      console.warn(e)
    }
  }
  useEffect(() => {
    generateThumbnail()
  }, [])

  return {thumbUri, isLoadedThumb: !!thumbUri}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#655b25',
  },
  media: {width: SIZE.width / NUM_COL, height: IMAGE_SIZE},
  title: {textAlign: 'center', marginTop: 10, color: '#c0d7c0', fontSize: 20, fontWeight: 'bold'},
  camIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 3,
    backgroundColor: '#fefefe',
    padding: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
})
