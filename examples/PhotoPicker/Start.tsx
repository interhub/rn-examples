import React, {useState} from 'react'
import {Button, Image, SafeAreaView} from 'react-native'
import ImagePicker, {Options} from 'react-native-image-crop-picker'
import * as MediaLibrary from 'expo-media-library'

/**
 better picker example

 Installation
 1) > yarn add expo-media-library && yarn add react-native-image-crop-picker && npx pod-install
 2) write native code (Info.plist and build.gradle & AndroidManifest.xml) by doc from https://github.com/ivpusic/react-native-image-crop-picker
 3) copy paste it module and usage
 */
export default function Start() {
    const [imageUri, setImageUri] = useState('')

    const IMAGE_SIZE = 500

    const reqPermissions = async () => {
        const {granted} = await MediaLibrary.requestPermissionsAsync()
        return granted
    }

    const options: Options = {
        multiple: false,
        cropping: true,
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        includeBase64: true,
        mediaType: 'photo',
        useFrontCamera: false,
        waitAnimationEnd: true,
        maxFiles: 1,
        minFiles: 1,
    }

    const base64ToUri = (base: any = ''): string => {
        if (!base) return base
        return 'data:image/jpg;base64,' + base
    }

    const selectPhoto = async () => {
        const access = await reqPermissions()
        if (!access) return
        ImagePicker.openPicker(options).then(image => {
            setImageUri(base64ToUri(image.data))
        })
    }
    const takePhoto = async () => {
        const access = await reqPermissions()
        if (!access) return
        ImagePicker.openCamera(options).then(image => {
            setImageUri(base64ToUri(image.data))
        })
    }

    const imageExist = !!imageUri

    return (
        <SafeAreaView style={{flex: 1}}>
            {imageExist && <Image
                style={{height: 300, width: 300, alignSelf: 'center'}}
                source={{uri: imageUri}}
            />}
            <Button title="Select Photo" onPress={() => selectPhoto()}/>
            <Button title="Take Photo" onPress={() => takePhoto()}/>
        </SafeAreaView>
    )
}
