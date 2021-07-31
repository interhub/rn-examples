import React, {useContext, useEffect, useState} from 'react'
import useCodePush from '../hooks/useCodePush'
import WaitUpdateAlert from '../components/WaitUpdateAlert'
import codePush from 'react-native-code-push'

interface CodePushContextType {
    isUpdating: boolean;
    syncCodePush: (isProduction: boolean) => void
}

//@ts-ignore
const CodePushContext = React.createContext<CodePushContextType>({})

const CodePushWrapper = ({children}: { children: React.ReactNode }) => {
    const {syncCodePush, isUpdating} = useCodePush()
    useEffect(() => {
        syncCodePush(true)
    }, [])

    if (isUpdating) {
        return <WaitUpdateAlert/>
    }
    return <CodePushContext.Provider value={{isUpdating, syncCodePush}}>{children}</CodePushContext.Provider>
}

export const useCodePushDynamicSync = () => {
    const {syncCodePush, isUpdating} = useContext(CodePushContext)
    return {syncCodePush, isUpdating}
}

export default CodePushWrapper
