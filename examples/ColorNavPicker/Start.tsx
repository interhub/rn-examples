import {ColorPicker, fromHsv} from 'react-native-color-picker'
import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native'
import TextLine from '../../components/TextLine'

import changeNavigationBarColor, {hideNavigationBar, showNavigationBar} from 'react-native-navigation-bar-color'

const setUpColor = async (color: string) => {
    if (!color) return
    try {
        const response = await changeNavigationBarColor(color, false, false)
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

const Picker = () => {

    return <SafeAreaView style={{flex: 1, backgroundColor: '#333333', padding: 20}}>
        <TextLine center color={'#fff'}>
            This screen set up Android nav bar color with change
        </TextLine>
        <ColorPicker
            onColorChange={(color) => {
                setUpColor(fromHsv(color))
            }}
            // onColorSelected={(color) => alert(`Color selected: ${color}`)}
            style={{flex: 1}}
        />
    </SafeAreaView>
}
export default Picker
