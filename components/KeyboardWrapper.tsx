import * as React from 'react'
import {KeyboardAvoidingView} from 'react-native'

import IS_IOS from '../src/config/IS_IOS'

interface ProviderKeyboardBarProps {
  children: React.ReactNode
}

const KeyboardWrapper = ({children}: ProviderKeyboardBarProps) => {
  return (
    <KeyboardAvoidingView pointerEvents={'box-none'} style={[{flex: 1}]} behavior={IS_IOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardWrapper
