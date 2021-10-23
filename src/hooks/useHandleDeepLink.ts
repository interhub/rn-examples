import * as Linking from 'expo-linking'
import {useEffect, useMemo, useState} from 'react'
import {useLinkTo} from '@react-navigation/native'

import openLink from '../config/openLink'

/**
 * use inside navigation wrapper to handle deep params
 */
const useHandleDeepLink = () => {
  const [isRemoved, setIsRemoved] = useState(false)
  const deepUrl: string = Linking.useURL() || ''

  const removeURL = () => {
    setIsRemoved(true)
  }
  const params: DeepParamsTypes = useMemo(() => (deepUrl ? Linking.parse(deepUrl)?.queryParams : {}), [deepUrl])
  const linkTo = useLinkTo()
  useEffect(() => {
    if (isRemoved || !deepUrl) {
      return
    }
    try {
      if (params?.link) {
        setTimeout(() => {
          linkTo(params?.link || '')
        }, 200)
        return
      }
      if (params?.browser) {
        openLink(params?.browser)
        return
      }
    } catch (e) {
    } finally {
      removeURL()
    }
  }, [deepUrl])
  // console.log({deepUrl, params});
  return {deepUrl, params}
}

type DeepParamsTypes = {
  //stayfitt.app://?link=nontab/rubric/1
  link?: string
  //stayfitt.app://?browser=https://google.com
  browser?: string
  //custom actions
  //action?: string
}

export default useHandleDeepLink
