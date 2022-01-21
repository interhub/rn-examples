import * as React from 'react'
import {View} from 'react-native'
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer'
import ButtonCustom from '../../../components/ButtonCustom'
import {useNavigation} from '@react-navigation/native'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import TextLine from '../../../components/TextLine'

function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>()
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b47caa'}}>
            <TextLine color={'#fff'}>Home Screen</TextLine>
            <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>Show Drawer</ButtonCustom>
            <ButtonCustom m={10} onPress={() => navigation.navigate('Notifications')}>Go To Notify</ButtonCustom>
        </View>
    )
}

function NotificationsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>()
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6965bb'}}>
            <TextLine color={'#fff'}>Notifications Screen</TextLine>
            <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>Show Drawer</ButtonCustom>
            <ButtonCustom m={10} onPress={() => navigation.goBack()}>Go back home</ButtonCustom>
        </View>
    )
}

const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen options={getScreenAnimation(SCREEN_ANIMATION.LEFT)} name="Home" component={HomeScreen}/>
            <Drawer.Screen options={getScreenAnimation(SCREEN_ANIMATION.LEFT)} name="Notifications"
                           component={NotificationsScreen}/>
        </Drawer.Navigator>
    )
}
