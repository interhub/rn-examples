import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import TextLine from './TextLine'

//@ts-ignore
interface ButtonOrangePropsType extends React.ComponentPropsWithoutRef<typeof Button> {
    disabled?: boolean,
    mode?: 'outlined' | 'contained' | 'text',
    loading?: boolean,
    onPress?: () => void,
    color?: string,
    labaelColor?: string
    children: string | JSX.Element | undefined | any
    accessibilityComponentType?: any
    accessibilityTraits?: any
    m?: number
}


const ButtonCustom = ({
                          children = '',
                          bold = true,
                          labaelColor = '#FFF',
                          onPress,
                          icon,
                          color = '#4a325f',
                          m = 0,
                          style = {},
                          ...props
                      }: ButtonOrangePropsType) => {
    return (
        <View style={{width: '100%', marginVertical: m, paddingHorizontal: m}}>
            <TouchableOpacity
                onPress={onPress}
                disabled={false}
                style={[{
                    width: '100%',
                    height: 55,
                    borderRadius: 10,
                    backgroundColor: color,
                    justifyContent: 'center',
                }, style]}
                {...props}
            >
                <TextLine center style={[props.labelStyle]} bold={bold} size={18}
                          color={labaelColor}>{children}</TextLine>
            </TouchableOpacity>
        </View>)
}

export default React.memo(ButtonCustom)
