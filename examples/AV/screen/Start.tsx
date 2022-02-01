import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Button, ScrollView, StyleProp, StyleSheet, View} from 'react-native'
import {Video} from 'expo-av'
import ButtonCustom from '../../../components/ButtonCustom'
import DividerCustom from '../../../components/DividerCustom'
import * as VideoThumbnails from 'expo-video-thumbnails'
import FastImage, {ImageStyle} from 'react-native-fast-image'
import useLoadingHandler from '../../../src/hooks/useLoadHandler'

//TODO
// create video player native
// create video player with buttons
// create vide player with horizontal list
// create audio module with buttons

const VIDEO_HEIGHT = 250
const VIDEO_URI = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

const VideoThumbItem = ({uri, style}: { uri: string, style: StyleProp<ImageStyle> }) => {
    const [image, setImage] = useState('')
    const {isLoading, handleLoad} = useLoadingHandler()
    const generateThumbnail = async (uri: string) => {
        try {
            const {uri} = await handleLoad(VideoThumbnails.getThumbnailAsync(
                'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                {
                    time: 15000,
                }
            ))
            setImage(uri)
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        generateThumbnail(uri)
    }, [])


    return (
        <View>
            {isLoading && <View style={[style, {justifyContent: 'center', alignSelf: 'center'}]}>
                <ActivityIndicator color={'#dcdcdc'}/></View>}
            {!isLoading && <FastImage source={{uri: image}} style={style}/>}
        </View>
    )
}

const NativeVideoItem = () => {
    return (
        <View>
            <Video
                style={{
                    width: '100%',
                    height: VIDEO_HEIGHT
                }}
                source={{
                    uri: VIDEO_URI
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
            />
        </View>
    )
}

const HighLevelVideoItem = () => {
    const video = React.useRef<Video>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => {
        console.log({isPlaying})
        if (isPlaying) {
            console.log('call play')
            video?.current?.playAsync()
        } else {
            video?.current?.unloadAsync()
        }
    }, [isPlaying])

    return (
        <View>
            {!isPlaying && <VideoThumbItem uri={VIDEO_URI} style={{height: VIDEO_HEIGHT, width: '100%'}}/>}
            {isPlaying && <Video
                ref={video}
                style={{
                    width: '100%',
                    height: VIDEO_HEIGHT
                }}
                source={{
                    uri: VIDEO_URI,
                }}
                resizeMode="contain"
                isLooping
                // onPlaybackStatusUpdate={(status: any) => setIsPlaying(status.isPlaying || false)}
            />}
            <ButtonCustom
                m={10}
                onPress={() => {
                    video?.current?.pauseAsync()
                }}>
                Pause
            </ButtonCustom>
            <ButtonCustom
                m={10}
                onPress={() => {
                    setIsPlaying(true)
                    if(isPlaying){
                        video?.current?.playAsync()
                    }
                }}>
                Play
            </ButtonCustom>
            <ButtonCustom
                m={10}
                onPress={async () => {
                    setIsPlaying(false)
                }}>
                Unload
            </ButtonCustom>
        </View>
    )
}

const AV = () => {
    return <ScrollView style={styles.container}>
        <NativeVideoItem/>
        <DividerCustom/>
        {new Array(10).fill(1).map((_, key) => {
            return <HighLevelVideoItem key={key}/>
        })}
        <DividerCustom/>
        <NativeVideoItem/>
        <DividerCustom/>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d'
    },
})

export default AV
