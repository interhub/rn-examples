import * as React from 'react'
import {KeyboardAvoidingView} from 'react-native'

import IS_IOS from '../src/config/IS_IOS'

const KeyboardWrapper: React.FC = ({children}) => {
  return (
    <KeyboardAvoidingView pointerEvents={'box-none'} style={[{flex: 1}]} behavior={IS_IOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardWrapper
