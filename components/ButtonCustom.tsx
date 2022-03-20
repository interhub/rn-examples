import React from 'react'
import {Button, TouchableOpacity, View} from 'react-native'

import TextLine from './TextLine'

//@ts-ignore
interface ButtonOrangePropsType extends React.ComponentPropsWithoutRef<typeof Button> {
  disabled?: boolean
  mode?: 'outlined' | 'contained' | 'text'
  loading?: boolean
  onPress?: () => void
  color?: string
  labaelColor?: string
  children: any
  accessibilityComponentType?: any
  accessibilityTraits?: any
  m?: number
  style?: any
  bold?: boolean
  labelStyle?: any
}

const ButtonCustom = ({
  children = '',
  bold = true,
  labaelColor = '#FFF',
  onPress,
  color = '#4a325f',
  m = 0,
  style = {},
  ...props
}: ButtonOrangePropsType | any) => {
  return (
    <View style={{width: '100%', marginVertical: m, paddingHorizontal: m}}>
      <TouchableOpacity
        delayPressIn={30}
        onPress={onPress}
        disabled={props.disabled}
        style={[
          {
            width: '100%',
            height: 55,
            borderRadius: 10,
            backgroundColor: color,
            justifyContent: 'center',
            opacity: props.disabled ? 0.8 : 1,
          },
          style,
        ]}
        {...props}>
        <TextLine center style={[props.labelStyle]} bold={bold} size={18} color={labaelColor}>
          {children}
        </TextLine>
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(ButtonCustom)
