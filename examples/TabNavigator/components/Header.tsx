import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_TABS} from '../constants/SCREEN_NAME_TABS'

const HEADER_HEIGHT = 100
const Header = () => {
    const {top} = useSafeAreaInsets()
    const {navigate, goBack} = useNavigation()
    const goToSetting = () => navigate(SCREEN_NAME_TABS.SETTING)
    return (
        <View style={[styles.container, {paddingTop: top}]}>
            <TouchableScale onPress={goBack}>
                <Text style={styles.text}>BACK</Text>
            </TouchableScale>
            <TouchableScale onPress={goToSetting}>
                <Text style={styles.text}>SETTING</Text>
            </TouchableScale>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#218d49',
        zIndex: 1000,
        paddingHorizontal: 15
    }, text: {
        color: '#FFF',
        fontWeight: 'bold'
    }

})

export default Header
