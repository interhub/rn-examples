import React, {useEffect} from 'react'
import {Image, SafeAreaView} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue, withDecay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import ButtonCustom from '../../../components/ButtonCustom'
import {useNavigation} from '@react-navigation/native'
import {useCodePushDynamicSync} from '../../../src/wrappers/CodePushWrapper'

export default function () {

    const {syncCodePush} = useCodePushDynamicSync()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
            <ButtonCustom onPress={()=>syncCodePush(true)} m={10}>set production</ButtonCustom>
            <ButtonCustom onPress={()=>syncCodePush(false)} m={10}>set staging</ButtonCustom>
        </SafeAreaView>
    )
}
