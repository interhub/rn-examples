import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_TABS} from '../constants/SCREEN_NAME_TABS'

const Header = () => {
    const {top} = useSafeAreaInsets()
    const {navigate, goBack} = useNavigation()
    const goToSetting = () => navigate(SCREEN_NAME_TABS.SETTING)
    return (
        <View style={[styles.container, {paddingTop: (top / 2) + 20}]}>
            <TouchableOpacity onPress={goBack}>
                <Text style={styles.text}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToSetting}>
                <Text style={styles.text}>SETTING</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        justifyContent: 'space-between',
        backgroundColor: '#218d49',
        zIndex: 1000,
        paddingHorizontal: 15
    }, text: {
        color: '#004605',
        fontWeight: 'bold'
    }

})

export default Header
