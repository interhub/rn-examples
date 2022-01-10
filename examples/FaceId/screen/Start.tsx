import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import ButtonCustom from '../../../components/ButtonCustom'
import Message from '../../../src/config/Message'

/**
 * to work this module you have to set up NSFaceIDUsageDescription Value in Info.plist file
 */
const showResMessage = (isSuccess: boolean) => Message(isSuccess ? 'Успешно ✅' : 'Не успешно 🤷‍♂️')
const localAuthDetect = async (): Promise<{ isSuccess: boolean; isSupport: boolean; isActive: boolean, isError?: boolean }> => {
    try {
        const isExistHardware = await LocalAuthentication.hasHardwareAsync()
        if (!isExistHardware) return {isSuccess: false, isActive: false, isSupport: false}
        const isEnrolledAnyAuth = await LocalAuthentication.isEnrolledAsync()
        if (!isEnrolledAnyAuth) return {isSuccess: false, isSupport: true, isActive: false}
        const {success} = await LocalAuthentication.authenticateAsync()
        return {isSuccess: success, isActive: true, isSupport: true}
    } catch (e) {
        console.log(e)
        return {isSuccess: false, isSupport: true, isActive: true, isError: true}
    }
}

const FaceId = () => {
    return (
        <View style={styles.container}>
            <ButtonCustom m={10} onPress={() => localAuthDetect().then((res) => showResMessage(res.isSuccess))}>
                Login Face Id
            </ButtonCustom>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

export default FaceId
