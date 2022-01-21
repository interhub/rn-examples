import * as React from 'react'
import {ScrollView, View} from 'react-native'
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer'
import ButtonCustom from '../../../components/ButtonCustom'
import {useNavigation} from '@react-navigation/native'
import TextLine from '../../../components/TextLine'
import {createStackNavigator} from '@react-navigation/stack'
import DividerCustom from '../../../components/DividerCustom'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'

function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>()
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b47caa'}}>
            <TextLine bold color={'#fff'}>Home Screen</TextLine>
            <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>Show Drawer</ButtonCustom>
            <ButtonCustom m={10} onPress={() => navigation.navigate('Setting')}>Go To Setting</ButtonCustom>
        </View>
    )
}

function SettingScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>()
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6965bb'}}>
            <TextLine bold color={'#fff'}>Setting Screen</TextLine>
            <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>Show Drawer</ButtonCustom>
            <ButtonCustom m={10} onPress={() => navigation.goBack()}>Go back Home</ButtonCustom>
        </View>
    )
}

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerInnerNavigator = () => {
    return <Stack.Navigator
        screenOptions={{headerShown: false, ...getScreenAnimation(SCREEN_ANIMATION.OPACITY)}}>
        <Stack.Screen
            name="Home"
            component={HomeScreen}/>
        <Stack.Screen
            name="Setting"
            component={SettingScreen}/>
    </Stack.Navigator>
}

function CustomDrawerContent() {
    const navigation = useNavigation<DrawerNavigationProp<any>>()
    return (
        <ScrollView contentContainerStyle={{paddingTop: 0}} style={{backgroundColor: '#e0d1f5'}}>
            <TextLine>Hello world!</TextLine>
            <DividerCustom/>
            <TextLine>Custom View</TextLine>
            <DividerCustom/>
            <ButtonCustom m={10} onPress={() => navigation.navigate('Setting')}>Go To Setting</ButtonCustom>
            <DividerCustom/>
            <ButtonCustom m={10} onPress={() => navigation.navigate('Home')}>Go To Home</ButtonCustom>
        </ScrollView>
    )
}

export default function App() {
    return (
        <Drawer.Navigator
            drawerType={'slide'}
            drawerContent={() => <CustomDrawerContent/>}
            initialRouteName="Home">
            <Drawer.Screen name={'drawer'} component={DrawerInnerNavigator}/>
        </Drawer.Navigator>
    )
}
