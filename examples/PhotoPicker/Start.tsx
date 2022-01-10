import React, {useState} from 'react'
import {Image, ScrollView} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import ButtonCustom from '../../components/ButtonCustom'
import TextLine from '../../components/TextLine'
import Message from '../../src/config/Message'
import ImagePickerTool from './tools/ImagePickerTool'
import {map} from 'lodash'

/**
 better picker example

 Installation
 1) > yarn add expo-media-library && yarn add react-native-image-crop-picker && npx pod-install
 2) write native code (Info.plist and build.gradle & AndroidManifest.xml) by doc from https://github.com/ivpusic/react-native-image-crop-picker
 3) copy paste it module and usage
 */
export default function Start() {
    const [imagesUri, setImagesUri] = useState<string[]>([])
    const [localPaths, setLocalPaths] = useState<string[]>([])

    const selectOnePhoto = async () => {
        const {isSuccess, isCanceled, localPath, base64} = await ImagePickerTool.selectOnePhoto()
        if (isCanceled) return Message('Отменено')
        if (!isSuccess) return Message('Не удалось выброать изображение')
        setImagesUri([base64])
        setLocalPaths([localPath])
    }

    const selectMultiplePhoto = async () => {
        const {isSuccess, isCanceled, images} = await ImagePickerTool.selectMultiplePhoto(4, 2)
        if (isCanceled) return Message('Отменено')
        if (!isSuccess) return Message('Не удалось выбрать изображение')
        setImagesUri(map(images, 'base64'))
        setLocalPaths(map(images, 'localPath'))
    }

    const takeOnePhoto = async () => {
        const {isSuccess, isCanceled, localPath, base64} = await ImagePickerTool.takeOnePhoto()
        if (isCanceled) return Message('Отменено')
        if (!isSuccess) return Message('Не удалось сделать изображение')
        setImagesUri([base64])
        setLocalPaths([localPath])
    }

    const imagesExist = !!imagesUri.length

    return (
        <ScrollView>
            {imagesExist && imagesUri.map((uri, key) => {
                return <Image style={{height: 200, width: 200, alignSelf: 'center'}} source={{uri}} key={key}/>
            })}
            <ButtonCustom m={10} onPress={() => selectOnePhoto()}>
                Select One Photo 🌇
            </ButtonCustom>
            <ButtonCustom m={10} onPress={() => selectMultiplePhoto()}>
                Select Multiple Photo 🌇 🌇 🌇
            </ButtonCustom>
            <ButtonCustom m={10} onPress={() => takeOnePhoto()}>
                Take One Photo
            </ButtonCustom>
            <ButtonCustom
                disabled={!localPaths[0]} m={10}
                onPress={() => ImagePickerTool.saveImageToMedia(localPaths[0]).then((isSuccess) => Message(isSuccess ? 'Успешно сохранено' : 'Не успешно'))}>
                Save first Photo To Media
            </ButtonCustom>
            {/*DISPLAY STATE*/}
            <TextLine style={{marginVertical: 10}}>
                {localPaths.join('\n_________\n\n')}
            </TextLine>
        </ScrollView>
    )
}
