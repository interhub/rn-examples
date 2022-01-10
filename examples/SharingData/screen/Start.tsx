import React, {useState} from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import ButtonCustom from '../../../components/ButtonCustom'
import TextLine from '../../../components/TextLine'
import DividerCustom from '../../../components/DividerCustom'
import SharingTool from '../tools/SharingTool'
import Message from '../../../src/config/Message'

export default function () {

    const textToShare = 'expo-sharing allows you to share files directly with other compatible applications.'
    const linkToShare = 'https://reactnative.dev'
    const imageToShare = 'https://cdn.fishki.net/upload/post/201507/22/1604768/tn/67.jpg'
    const videoLinkToShare = 'https://2ch.hk/b/arch/2021-12-13/src/259494525/16393322465121.mp4'

    const [pasteText, setPasteText] = useState('Here is able be your text')
    const startPasteState = async () => {
        const text = await SharingTool.readClipboardText()
        setPasteText(text)
    }
    const [progressValue, setProgressValue] = useState(0)

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 200}}>
            {/*TEXT BLOCK*/}
            <TextLine selectable color={'#a2a2a2'} style={{marginBottom: 10}}>
                Обычный тест: {textToShare}
            </TextLine>
            <ButtonCustom onPress={() => SharingTool.shareText(textToShare)}>
                Share Text
            </ButtonCustom>
            <DividerCustom margin={10}/>
            {/*LINK BLOCK*/}
            <TextLine selectable color={'#7df3ff'} style={{marginBottom: 10}}>
                Ссылка на сайт: {linkToShare}
            </TextLine>
            <ButtonCustom onPress={() => SharingTool.shareLink(linkToShare)}>
                Share Link
            </ButtonCustom>
            {/*IMAGE BLOCK*/}
            <DividerCustom margin={10}/>
            <Image source={{uri: imageToShare}} style={{width: 300, height: 200, marginBottom: 10}}/>
            <ButtonCustom onPress={() => SharingTool.shareFileRemote(imageToShare)}>
                Share Image By Remote Link
            </ButtonCustom>
            <View style={{margin: 5}}/>
            <ButtonCustom
                onPress={() => SharingTool.downloadFile(imageToShare).then(() => Message('Успешно загружено'))}>
                Download Image By Remote Link
            </ButtonCustom>
            {/*VIDEO BLOCK*/}
            <DividerCustom margin={10}/>
            <TextLine selectable color={'#7df3ff'} style={{marginBottom: 10}}>
                Видео: {videoLinkToShare}
            </TextLine>
            <TextLine color={'#8c8c8c'} style={{marginBottom: 10}}>
                Прогресс загрузки: {progressValue.toFixed()}%
            </TextLine>
            <ButtonCustom onPress={() => SharingTool.shareFileRemote(videoLinkToShare, setProgressValue)}>
                Share Video By Remote Link
            </ButtonCustom>
            {/*COPY BLOCK*/}
            <DividerCustom margin={10}/>
            <TextLine selectable color={'#8c8c8c'} style={{marginBottom: 10}}>
                {textToShare}
            </TextLine>
            <ButtonCustom onPress={() => SharingTool.writeClipboardText(textToShare)}>
                Copy Text
            </ButtonCustom>
            {/*PASTE BLOCK*/}
            <DividerCustom margin={10}/>
            <TextLine selectable color={'#8c8c8c'} style={{marginBottom: 10}}>
                {pasteText}
            </TextLine>
            <ButtonCustom onPress={() => startPasteState()}>
                Paste Text
            </ButtonCustom>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09184f',
        padding: 10
    },
})
