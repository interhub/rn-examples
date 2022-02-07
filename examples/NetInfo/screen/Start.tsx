import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useNetInfo} from '@react-native-community/netinfo'

import TextLine from '../../../components/TextLine'

//doc install and mock https://github.com/react-native-netinfo/react-native-netinfo#usenetinfo

const NetInfoExample = () => {
  const {isConnected, type, isInternetReachable, details} = useNetInfo()
  const color = isInternetReachable ? '#81e757' : '#ffce56'
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <TextRow keyName={'isConnected'} value={isConnected} />
      <TextRow keyName={'isInternetReachable'} value={isInternetReachable} />
      <TextRow keyName={'ip'} value={(details as any)?.ipAddress} />
      <TextRow keyName={'type'} value={type} />
    </View>
  )
}

const TextRow = ({keyName, value}: {keyName: string; value: any}) => {
  return (
    <TextLine>
      {keyName} :<TextLine bold>{`${value}`}</TextLine>
    </TextLine>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NetInfoExample
