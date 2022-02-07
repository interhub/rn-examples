import {useEffect, useState} from 'react'
import NetInfo from '@react-native-community/netinfo'

const useNetInfo = () => {
  const [netInfoState, setNetInfoState] = useState({isConnected: true, isWork: true, type: '', ip: ''})
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      //@ts-ignore
      const ip: string = state?.details?.ipAddress || ''
      const isConnected: boolean = state?.isConnected || false
      const isWork: boolean = state?.isInternetReachable || false
      const type: string = state?.type || ''
      setNetInfoState({isConnected, isWork, type, ip})
    })
  }, [])
  return netInfoState
}

export default useNetInfo
