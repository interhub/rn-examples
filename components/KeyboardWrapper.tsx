import * as React from 'react'
import {KeyboardAvoidingView, Platform} from 'react-native'

interface ProviderKeyboardBarProps {
  children: React.ReactNode
}

const IS_IOS = Platform.OS === 'ios' //TODO CHANGE USAGE TO IS_IOS GLOBAL VAR

const KeyboardWrapper = ({children}: ProviderKeyboardBarProps) => {
  return (
    <KeyboardAvoidingView pointerEvents={'box-none'} style={[{flex: 1}]} behavior={IS_IOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardWrapper
