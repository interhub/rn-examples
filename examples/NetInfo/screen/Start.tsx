import React from 'react'
import {StyleSheet, View} from 'react-native'
import TextLine from '../../../components/TextLine'
import {useNetInfo} from '@react-native-community/netinfo'

const NetInfoExample = () => {
    const {isConnected, type, isInternetReachable, details} = useNetInfo()
    return (
        <View style={styles.container}>
            <TextRow keyName={'isConnected'} value={isConnected}/>
            <TextRow keyName={'isInternetReachable'} value={isInternetReachable}/>
            <TextRow keyName={'ip'} value={(details as any)?.ipAddress}/>
            <TextRow keyName={'type'} value={type}/>
        </View>
    )
}

const TextRow = ({keyName, value}: { keyName: string, value: any }) => {
    return <TextLine>{keyName} :<TextLine bold>{`${value}`}</TextLine></TextLine>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe028',
    }


})

export default NetInfoExample
