import React from 'react'
import {View} from 'react-native'

type DividerCustomProps = {weight?: number; isCol?: boolean; color?: string; margin?: number}

const DividerCustom = (props: DividerCustomProps) => {
  const {weight = 1, isCol, color = '#b0b0b0', margin = 0} = props

  return (
    <View
      style={[
        {backgroundColor: color, borderRadius: weight},
        isCol ? {width: weight, height: '100%', marginHorizontal: margin} : {height: weight, width: '100%', marginVertical: margin},
      ]}
    />
  )
}

export default DividerCustom
