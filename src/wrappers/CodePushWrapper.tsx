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

const CodePushWrapper = ({children}: {children: React.ReactNode}) => {
  const {syncCodePush, isUpdating, switchProd, checkIsUpdate} = useCodePush()

  useEffect(() => {
    checkIsUpdate().then((isExistUpdate) => {
      if (isExistUpdate) syncCodePush()
    })
  }, [])

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

export default CodePushWrapper
