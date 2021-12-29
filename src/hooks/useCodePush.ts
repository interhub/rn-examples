import codePush from 'react-native-code-push'
import {useState} from 'react'
import IS_IOS from '../config/IS_IOS'
import {CodePushContextType} from '../wrappers/CodePushWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Platform} from 'react-native'

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
 @hook for code push reload and update
 */
const useCodePush = (): CodePushContextType => {
    const [isUpdating, setIsUpdating] = useState(false)
    const stopUpdating = () => {
        setIsUpdating(false)
    }

    const startUpdating = () => {
        setIsUpdating(true)
    }

    const syncCodePush = async (): Promise<any> => {
        if (__DEV__) {
            return stopUpdating()
        }

        const update = !!(await codePush.checkForUpdate())
        if (!update) return stopUpdating()

        startUpdating()

        const isProduction = await isProductionTool.checkIsProd()

        return new Promise((ok) => {

            const deploymentKey: string = isProduction ? (IS_IOS ? CODE_PUSH_KEYS_IOS.PRODUCTION : CODE_PUSH_KEYS_ANDROID.PRODUCTION) : (IS_IOS ? CODE_PUSH_KEYS_IOS.STAGING : CODE_PUSH_KEYS_ANDROID.STAGING)

            codePush.sync(
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
                    if (progress.receivedBytes === progress.totalBytes) {
                        setTimeout(ok, SLEEP_TIME)
                    }
                },
            ).catch((e) => {
                console.log('catch code push updates', e)
            })
        })
    }

    const switchProd = async (isProdTo: boolean) => {
        const isProdAlready = await isProductionTool.checkIsProd()
        if (isProdAlready === isProdTo) return
        await isProductionTool.setIsProd(isProdTo)
        await syncCodePush()
    }

    return {syncCodePush, isUpdating, switchProd}
}


export const isProductionTool = {
    checkIsProd: async () => {
        const isProdStorage = await AsyncStorage.getItem('is_prod')
        return (isProdStorage === null) || (JSON.parse(isProdStorage) === true)
    },
    setIsProd: async (isProd: boolean) => {
        await AsyncStorage.setItem('is_prod', JSON.stringify(isProd))
    },
}

export default useCodePush
