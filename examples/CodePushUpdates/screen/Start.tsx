import React from 'react'
import {SafeAreaView} from 'react-native'

import ButtonCustom from '../../../components/ButtonCustom'
import {useCodePushDynamicSync} from '../../../src/wrappers/CodePushWrapper'

export default function () {
    const {switchProd} = useCodePushDynamicSync()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
            <ButtonCustom onPress={() => switchProd(true)} m={10}>
                set production
            </ButtonCustom>
            <ButtonCustom onPress={() => switchProd(false)} m={10}>
                set staging
            </ButtonCustom>
        </SafeAreaView>
    )
}
