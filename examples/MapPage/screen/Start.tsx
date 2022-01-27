import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import ButtonCustom from '../../../components/ButtonCustom'
import Message from '../../../src/config/Message'
import MapFill from '../components/MapFill'

/**
 * to work this module you have to set up NSFaceIDUsageDescription Value in Info.plist file
 */

const MapPage = () => {
    return (
        <View style={styles.container}>
            <MapFill/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default MapPage
