import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_NAME } from './SCREEN_NAME';

const Menu = () => {

    const { top } = useSafeAreaInsets()
    const SCREENS = Object.values(SCREEN_NAME)

    return (
        <FlatList
            style={{ flex: 1, paddingTop: top }}
            data={SCREENS}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                return <NavigateButton screenName={item} />
            }}
        />
    );
}


const NavigateButton = ({ screenName }: { screenName: SCREEN_NAME }) => {
    const { navigate } = useNavigation()

    const onPressHandler = () => navigate(screenName)

    return <Button title={String(screenName)} onPress={onPressHandler} />
}

export default Menu

