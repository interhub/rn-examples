import React, {useEffect, useRef, useState} from 'react'
import {findNodeHandle, PixelRatio, requireNativeComponent, StyleSheet, UIManager, View} from 'react-native'

import IS_IOS from '../../../src/config/IS_IOS'

export const MyViewManager = requireNativeComponent(IS_IOS ? 'RNTMap' : 'MyViewManager')

const createFragment = (viewId: any) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    //@ts-ignore
    UIManager.MyViewManager.Commands.create.toString(),
    [viewId],
  )

const MyView = () => {
  const ref = useRef(null)
  const [isReged, setIsReged] = useState(false)
  useEffect(() => {
    if (isReged || IS_IOS) return
    const viewId = findNodeHandle(ref.current)
    createFragment(viewId)
    setIsReged(true)
  }, [])

  return (
    <MyViewManager
      //@ts-ignore
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
    />
  )
}

export default MyView
