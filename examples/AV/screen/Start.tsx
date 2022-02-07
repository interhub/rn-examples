import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ActivityIndicator, Button, FlatList, ScrollView, StyleProp, StyleSheet, View, ViewToken} from 'react-native'
import {Video} from 'expo-av'
import * as VideoThumbnails from 'expo-video-thumbnails'
import FastImage, {ImageStyle} from 'react-native-fast-image'
import {head, last} from 'lodash'

import ButtonCustom from '../../../components/ButtonCustom'
import DividerCustom from '../../../components/DividerCustom'
import useLoadingHandler from '../../../src/hooks/useLoadHandler'
import SIZE from '../../../src/config/SIZE'
import IS_IOS from '../../../src/config/IS_IOS'

//TODO
// create video player native
// create video player with buttons
// create vide player with horizontal list
// create audio module with buttons

const VIDEO_HEIGHT = 250
const VIDEO_URI = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

const VideoThumbItem = ({uri, style, isShow}: {uri: string; style: StyleProp<ImageStyle>; isShow: boolean}) => {
  const [image, setImage] = useState('')
  const {isLoading, handleLoad} = useLoadingHandler()
  const generateThumbnail = async (uri: string) => {
    try {
      const {uri} = await handleLoad(
        VideoThumbnails.getThumbnailAsync('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', {
          time: 15000,
        }),
      )
      setImage(uri)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    generateThumbnail(uri)
  }, [])

  if (!isShow) return null

  return (
    <View>
      {isLoading && (
        <View style={[style, {justifyContent: 'center', alignSelf: 'center'}]}>
          <ActivityIndicator color={'#dcdcdc'} />
        </View>
      )}
      {!isLoading && <FastImage source={{uri: image}} style={style} />}
    </View>
  )
}

const NativeVideoItem = () => {
  return (
    <View>
      <Video
        style={{
          width: '100%',
          height: VIDEO_HEIGHT,
        }}
        source={{
          uri: VIDEO_URI,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
    </View>
  )
}

const HighLevelVideoItem = ({setPlayedRef}: {setPlayedRef: (r: React.RefObject<Video>) => void}) => {
  const video = React.useRef<Video>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  useEffect(() => {
    if (isStarted) {
      setPlayedRef(video)
    }
  }, [isStarted])

  return (
    <View style={{width: SIZE.width * 0.9}}>
      <Video
        ref={video}
        style={{
          width: '100%',
          height: VIDEO_HEIGHT,
        }}
        source={{
          uri: VIDEO_URI,
        }}
        onLoad={() => setIsLoaded(true)}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status: any) => setIsStarted(status.isPlaying || false)}>
        {!isLoaded && IS_IOS && (
          <View style={[{justifyContent: 'center', alignSelf: 'center'}, StyleSheet.absoluteFillObject]}>
            <ActivityIndicator color={'#000000'} />
          </View>
        )}
      </Video>
      <ButtonCustom
        m={10}
        onPress={() => {
          video?.current?.playAsync()
        }}>
        Play
      </ButtonCustom>
      <ButtonCustom
        m={10}
        onPress={() => {
          video?.current?.pauseAsync()
        }}>
        Pause
      </ButtonCustom>
      <ButtonCustom
        m={10}
        onPress={async () => {
          video?.current?.stopAsync()
        }}>
        Stop
      </ButtonCustom>
    </View>
  )
}

const VideoPlayList = () => {
  //started video ref (set up after start video and stop when scroll event call)
  const videoStartedRef = useRef<Video>(null)
  const [visibleIndexItem, setVisibleIndexItem] = useState(-1)
  const onViewableItemsChanged = useCallback((data: {changed: ViewToken[]}) => {
    const newIndex = last(data?.changed)?.index || 0
    setVisibleIndexItem(newIndex)
  }, [])
  useEffect(() => {
    videoStartedRef?.current?.stopAsync()
  }, [visibleIndexItem])

  return (
    <FlatList
      onViewableItemsChanged={onViewableItemsChanged}
      contentContainerStyle={{paddingLeft: SIZE.width * 0.05}}
      initialNumToRender={2}
      windowSize={4}
      horizontal
      removeClippedSubviews={false}
      snapToInterval={SIZE.width * 0.9}
      decelerationRate={'fast'}
      data={new Array(10).fill(1)}
      keyExtractor={(item, index) => String(index)}
      renderItem={() => {
        return (
          <HighLevelVideoItem
            setPlayedRef={(r) => {
              //@ts-ignore
              videoStartedRef.current = r.current
            }}
          />
        )
      }}
    />
  )
}

const AV = () => {
  return (
    <ScrollView style={styles.container}>
      <NativeVideoItem />
      <DividerCustom />
      <VideoPlayList />
      <DividerCustom />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#589068',
  },
})

export default AV
