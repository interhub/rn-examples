import React, {useContext, useEffect} from 'react'

import useCodePush from '../hooks/useCodePush'
import WaitUpdateAlert from '../components/WaitUpdateAlert'

export interface CodePushContextType {
    isUpdating: boolean
    syncCodePush: () => void
    switchProd: (isProd: boolean) => void
}

//@ts-ignore
const CodePushContext = React.createContext<CodePushContextType>({})

const CodePushWrapper = ({children}: { children: React.ReactNode }) => {
    const {syncCodePush, isUpdating, switchProd} = useCodePush()

    useEffect(() => {
        syncCodePush()
    }, [])

    if (isUpdating) {
        return <WaitUpdateAlert/>
    }
    return <CodePushContext.Provider
        value={{isUpdating, syncCodePush, switchProd}}>{children}</CodePushContext.Provider>
}


export const useCodePushDynamicSync = (): CodePushContextType => {
    return useContext(CodePushContext)
}

export default CodePushWrapper
