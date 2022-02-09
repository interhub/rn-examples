import React, {useContext, useEffect, useLayoutEffect, useState} from 'react'

import useCodePush, {isProductionTool} from '../hooks/useCodePush'
import WaitUpdateAlert from '../components/WaitUpdateAlert'

export interface CodePushContextType {
  isUpdating: boolean
  syncCodePush: () => Promise<void>
  switchProd: (isProd: boolean) => Promise<void>
  checkIsUpdate: () => Promise<boolean>
}

//@ts-ignore
const CodePushContext = React.createContext<CodePushContextType>({})

const CodePushProvider = ({children}: {children: React.ReactNode}) => {
  const {syncCodePush, isUpdating, switchProd, checkIsUpdate} = useCodePush()

  useEffect(() => {
    checkIsUpdate().then((isExistUpdate) => {
      console.log({isExistUpdate})
      if (isExistUpdate) {
        syncCodePush()
      }
    })
  }, [])

  //todo if need different screen when update is checking and update downloading so have to add additional param to hook return values
  if (isUpdating) {
    return <WaitUpdateAlert />
  }
  return <CodePushContext.Provider value={{isUpdating, syncCodePush, switchProd, checkIsUpdate}}>{children}</CodePushContext.Provider>
}

export const useCodePushDynamicSync = (): CodePushContextType => {
  return useContext(CodePushContext)
}

export const useIsProduction = () => {
  const [isProduction, setIsProduction] = useState(true)
  useLayoutEffect(() => {
    isProductionTool.checkIsProd().then((isProd) => {
      setIsProduction(isProd)
    })
  }, [])
  return {isProduction}
}

export default CodePushProvider
