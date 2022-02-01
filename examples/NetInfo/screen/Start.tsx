import React from 'react'
import {StyleSheet, View} from 'react-native'
import TextLine from '../../../components/TextLine'
import useNetInfo from '../hook/useNetInfo'

const NetInfoExample = () => {
    const {isConnected, isWork, ip, type} = useNetInfo()
    return (
        <View style={styles.container}>
            <TextLine>{`isConnected : ${isConnected}`}</TextLine>
            <TextLine>{`isWork : ${isWork}`}</TextLine>
            <TextLine>{`ip : ${ip}`}</TextLine>
            <TextLine>{`type : ${type}`}</TextLine>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe028',
    },
})

export default NetInfoExample
