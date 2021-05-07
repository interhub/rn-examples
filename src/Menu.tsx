import {useNavigation} from '@react-navigation/native'
import React, {useMemo} from 'react'
import {Button, Text, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SCREEN_NAME} from './SCREEN_NAME'
import ButtonCustom from '../components/ButtonCustom'

const Menu = () => {

    const {top, bottom} = useSafeAreaInsets()
    const SCREENS = useMemo(() => Object.values(SCREEN_NAME).reverse(), [])

    return (
        <FlatList
            contentContainerStyle={{paddingTop: top, paddingBottom: bottom + 10}}
            style={{flex: 1}}
            data={SCREENS}
            initialNumToRender={14}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
                return <NavigateButton screenName={item}/>
            }}
        />
    )
}

const NavigateButton = ({screenName}: { screenName: SCREEN_NAME }) => {
    const {navigate} = useNavigation()

    const onPressHandler = () => navigate(screenName)

    return <View style={{paddingHorizontal: 10, paddingTop: 10}}>
        <ButtonCustom onPress={onPressHandler}>
            {String(screenName)}
        </ButtonCustom>
    </View>
}

export default Menu

