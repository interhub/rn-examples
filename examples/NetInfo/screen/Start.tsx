import React from 'react'
import {StyleSheet, View} from 'react-native'
import TextLine from '../../../components/TextLine'
import useNetInfo from '../hook/useNetInfo'

const NetInfoExample = () => {
    const {isConnected, isWork, ip, type} = useNetInfo()
    return (
        <View style={styles.container}>
            <TextRow keyName={'isConnected'} value={isConnected}/>
            <TextRow keyName={'isWork'} value={isWork}/>
            <TextRow keyName={'ip'} value={ip}/>
            <TextRow keyName={'type'} value={type}/>
        </View>
    )
}

const TextRow = ({keyName, value}: { keyName: string, value: string | boolean }) => {
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
