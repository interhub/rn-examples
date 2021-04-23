import React, {useEffect, useRef} from 'react'
import {Animated, ImageSourcePropType, View} from 'react-native'

const ICON_SIZE_DEFAULT = 35

interface PropsIcon {
  source: ImageSourcePropType
  color?: string
  active?: boolean
  size?: number | string
}

const AnimateIcon = (props: PropsIcon) => {
  const {source, color, active, size = ICON_SIZE_DEFAULT} = props
  const {animStyle} = useAnimateIconStyle(active)

  return (
    <Animated.Image
      fadeDuration={0}
      resizeMode="contain"
      style={[
        {
          height: size,
          width: size,
          tintColor: color,
        },
        animStyle,
      ]}
      source={source}
    />
  )
}

const useAnimateIconStyle = (active?: boolean) => {
  const scale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(scale, {toValue: active ? 1 : 0.85, useNativeDriver: true}).start()
  }, [active])

  const animStyle = {
    transform: [{scale}],
  }

  return {animStyle}
}

export default React.memo(AnimateIcon)
