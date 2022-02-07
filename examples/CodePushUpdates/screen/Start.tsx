import React from 'react'
import {SafeAreaView} from 'react-native'

import ButtonCustom from '../../../components/ButtonCustom'
import {useCodePushDynamicSync, useIsProduction} from '../../../src/wrappers/CodePushWrapper'
import TextLine from '../../../components/TextLine'
import Message from '../../../src/config/Message'

export default function () {
  const {switchProd, syncCodePush, checkIsUpdate} = useCodePushDynamicSync()
  const checkUpdateAndUpdate = async () => {
    const isUpdate = await checkIsUpdate()
    if (!isUpdate) {
      return Message('Обновлений нет 🤷‍♂️')
    }
    if (isUpdate) await syncCodePush()
  }
  const {isProduction} = useIsProduction()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
      <ButtonCustom onPress={() => switchProd(true)} m={10}>
        set production 🏆
      </ButtonCustom>
      <ButtonCustom onPress={() => switchProd(false)} m={10}>
        set staging 🔭
      </ButtonCustom>
      <ButtonCustom onPress={() => checkUpdateAndUpdate()} m={10}>
        check current update 🔃
      </ButtonCustom>
      <TextLine center style={{marginTop: 20}} color={'#fff'} bold>
        {isProduction ? 'Production ✅' : 'Staging ⚙️'}
      </TextLine>
    </SafeAreaView>
  )
}
