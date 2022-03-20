import codePush from 'react-native-code-push'
import {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

import {CodePushContextType} from '../wrappers/CodePushWrapper'
import IS_IOS from '../config/IS_IOS'

/**
 TIME BEFORE RESET APP START (AFTER UPDATE) for sync code push
 */
const SLEEP_TIME = 1000

/**
 code push dev keys
 */
enum CODE_PUSH_KEYS_IOS {
  STAGING = 'cNG5Y9IF9Yd1tmpMfARSQU0t2A2QC_7nDnD-8',
  PRODUCTION = 'y4ad57B9UBuP607WlBgqLj-Vupwhfq5pF2Ukb',
}

enum CODE_PUSH_KEYS_ANDROID {
  STAGING = '_Lrxh_pnDHqPrvl1CvjD45CCVv7Yfi8cUYTAc',
  PRODUCTION = '8y5XGRB7QRHIL4pRKtjryZnGnrzLiFw7Pcnse',
}

/**
 @hooks for code push reload and update
 */
const useCodePush = (): CodePushContextType & {updatePercent: number} => {
  //Set default false if should show loading screen for initial (or add additional state for other loading)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [updatePercent, setUpdatePercent] = useState(0)

  const stopUpdating = () => {
    setIsUpdating(false)
    setIsChecking(false)
  }

  const startUpdating = () => {
    setIsUpdating(true)
  }

  const getDeploymentKey = async (): Promise<string> => {
    const isProduction = await isProductionTool.checkIsProd()
    const deploymentKey: string = isProduction
      ? IS_IOS
        ? CODE_PUSH_KEYS_IOS.PRODUCTION
        : CODE_PUSH_KEYS_ANDROID.PRODUCTION
      : IS_IOS
      ? CODE_PUSH_KEYS_IOS.STAGING
      : CODE_PUSH_KEYS_ANDROID.STAGING
    return deploymentKey
  }

  const checkIsConnected = async (): Promise<boolean> => NetInfo.fetch().then((s) => !!s.isConnected)

  const checkIsUpdate = async (): Promise<boolean> => {
    const isConnected = await checkIsConnected()
    if (!isConnected) {
      stopUpdating()
      return false
    }
    setIsChecking(true)
    const deploymentKey = await getDeploymentKey()
    const isExistUpdate = !!(await codePush.checkForUpdate(deploymentKey))
    if (!isExistUpdate) {
      setTimeout(() => {
        setIsChecking(false)
      }, 100)
    }
    return isExistUpdate
  }

  const syncCodePush = async (): Promise<any> => {
    if (__DEV__) {
      return stopUpdating()
    }
    startUpdating()
    const deploymentKey = await getDeploymentKey()

    return new Promise((ok) => {
      codePush
        .sync(
          {installMode: codePush.InstallMode.IMMEDIATE, deploymentKey},
          (status) => {
            ok()
            switch (status) {
              case codePush.SyncStatus.UP_TO_DATE:
                return stopUpdating()
              case codePush.SyncStatus.UNKNOWN_ERROR:
                return stopUpdating()
              case codePush.SyncStatus.SYNC_IN_PROGRESS:
                return startUpdating()
            }
          },
          async (progress) => {
            if (progress) {
              const percent = (progress.receivedBytes / progress.totalBytes) * 100 || 0
              setUpdatePercent(Math.floor(percent))
            }
            if (progress.receivedBytes === progress.totalBytes) {
              setTimeout(ok, SLEEP_TIME)
            }
          },
        )
        .catch((e) => {
          console.log('catch code push updates', e)
        })
    })
  }

  const switchProd = async (isProdTo: boolean) => {
    const isProdAlready = await isProductionTool.checkIsProd()
    if (isProdAlready === isProdTo) {
      return
    }
    await isProductionTool.setIsProd(isProdTo)
    await syncCodePush()
  }

  return {syncCodePush, isUpdating, switchProd, checkIsUpdate, isChecking, updatePercent}
}

//TODO replace to server side checking isProduction switcher instead of AsyncStorage (after web admin page support)
export const isProductionTool = {
  checkIsProd: async () => {
    try {
      const isProdStorage = await AsyncStorage.getItem('is_prod')
      //true by default
      return isProdStorage === null || JSON.parse(isProdStorage) === true
    } catch (e) {
      console.log(e)
      return true
    }
  },
  setIsProd: async (isProd: boolean) => {
    try {
      await AsyncStorage.setItem('is_prod', JSON.stringify(isProd))
    } catch (e) {
      console.log(e)
    }
  },
}

export default useCodePush
