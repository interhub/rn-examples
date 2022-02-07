import React from 'react'
import {Text} from 'react-native'

interface TextLinePropsType extends React.ComponentPropsWithoutRef<typeof Text> {
  children: any
  color?: string
  size?: number
  bold?: boolean
  tint?: boolean
  center?: boolean
}

const TextLine = ({children, tint, color = '#000', size = 18, bold = false, center, ...props}: TextLinePropsType) => {
  return (
    <Text
      {...props}
      style={[
        {
          color,
          fontSize: size,
          textAlign: center ? 'center' : 'left',
          fontWeight: bold ? 'bold' : undefined,
        },
        props.style,
      ]}>
      {children}
    </Text>
  )
}

export default React.memo(TextLine)
