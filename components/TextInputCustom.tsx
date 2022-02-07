import * as React from 'react'
import {useState} from 'react'
import {ActivityIndicator, Animated, Keyboard, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
import {FontAwesome} from '@expo/vector-icons'

import useAnimateShowScale from '../src/hooks/useAnimateShowScale'
import SIZE from '../src/config/SIZE'

const MIN_HEIGHT = 45
const iconColor = '#ffffff'
const brandColor = 'rgba(12,77,119,0.73)'

type SearchInputProps = {
  multiline?: boolean
  // autoFocus?: boolean;
  onSubmit?: (value?: string) => void
  showSendBtn?: boolean
  leftIcon?: React.ReactNode
  onInput?: (value: string) => void
  placeholder?: string
  value?: string
}

const TextInputCustom = (props: SearchInputProps) => {
  const {
    // autoFocus = false,
    onSubmit,
    multiline = false,
    showSendBtn = false,
    onInput,
    leftIcon,
    value,
  } = props

  const [loading, setLoading] = useState(false)

  const isExistText = !!value?.replace(/\n/g, '').trim()
  const {animateStyle} = useAnimateShowScale(isExistText)

  const onPressSendComment = () => {
    if (!isExistText) {
      return
    }
    impactAsync(ImpactFeedbackStyle.Light)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (onSubmit) onSubmit(value)
    }, 1000)
    //after success send query
    Keyboard.dismiss()
  }

  const paddingLeft = leftIcon ? MIN_HEIGHT / 3 : 0

  return (
    <View style={[styles.container, {paddingLeft}]}>
      {/*COMMENT ICON LEFT*/}
      {!!leftIcon && leftIcon}
      {/*TEXT INPUT CENTER*/}
      <TextInput
        value={value}
        accessible
        multiline={multiline}
        editable={!loading}
        onChangeText={(text) => {
          if (onInput) onInput(text)
        }}
        placeholder={props.placeholder || 'Поиск'}
        style={styles.textInput}
        placeholderTextColor={'gray'}
        maxLength={1000}
        returnKeyType={showSendBtn ? 'next' : 'search'}
        onSubmitEditing={showSendBtn ? () => {} : onPressSendComment}
      />
      {/*SEND BUTTON RIGHT*/}
      {showSendBtn && (
        <Animated.View style={[animateStyle, styles.sendButtonBox]}>
          <TouchableOpacity disabled={loading} onPress={onPressSendComment} style={styles.sendButtonTouchBox}>
            {!loading && <FontAwesome name="send" size={15} color={iconColor} />}
            {loading && <ActivityIndicator color={iconColor} size={'small'} />}
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: MIN_HEIGHT,
    maxHeight: SIZE.height / 4,
    borderRadius: MIN_HEIGHT / 2,
    // backgroundColor: theme.isDark ? theme.brandLight : theme.brandSemiLight,
    backgroundColor: '#10162c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: MIN_HEIGHT,
  },
  textInput: {
    minHeight: MIN_HEIGHT / 1.5,
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    // color: theme.textColor,
    // fontSize: theme.DefaultFontSize,
    // fontFamily: theme.fontFamily,
  },
  sendButtonBox: {
    width: MIN_HEIGHT * 0.8,
    height: MIN_HEIGHT * 0.8,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  sendButtonTouchBox: {
    flex: 1,
    borderRadius: MIN_HEIGHT / 2,
    backgroundColor: brandColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: {
    fontSize: MIN_HEIGHT * 0.6,
    color: iconColor,
  },
})

export default TextInputCustom
