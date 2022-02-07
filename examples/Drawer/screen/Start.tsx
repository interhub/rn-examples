import * as React from 'react'
import {ScrollView, View} from 'react-native'
import {createDrawerNavigator, DrawerContentOptions, DrawerNavigationProp} from '@react-navigation/drawer'
import {useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useAnimatedStyle} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

import ButtonCustom from '../../../components/ButtonCustom'
import TextLine from '../../../components/TextLine'
import DividerCustom from '../../../components/DividerCustom'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import SIZE from '../../../src/config/SIZE'

function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>()
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b47caa'}}>
      <TextLine bold color={'#fff'}>
        Home Screen
      </TextLine>
      <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>
        Show Drawer
      </ButtonCustom>
      <ButtonCustom m={10} onPress={() => navigation.navigate('Setting')}>
        Go To Setting
      </ButtonCustom>
    </View>
  )
}

function SettingScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>()
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6965bb'}}>
      <TextLine bold color={'#fff'}>
        Setting Screen
      </TextLine>
      <ButtonCustom m={10} onPress={() => navigation.toggleDrawer()}>
        Show Drawer
      </ButtonCustom>
      <ButtonCustom m={10} onPress={() => navigation.goBack()}>
        Go back Home
      </ButtonCustom>
    </View>
  )
}

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerInnerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, ...getScreenAnimation(SCREEN_ANIMATION.OPACITY, false)}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  )
}

function CustomDrawerContent(props: any) {
  const navigation = useNavigation<DrawerNavigationProp<any>>()
  const translateY = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  })

  return (
    <Animated.ScrollView contentContainerStyle={{paddingTop: 0}} style={[{backgroundColor: '#e0d1f5'}, {transform: [{translateY}]}]}>
      <TextLine>Hello world!</TextLine>
      <DividerCustom />
      <TextLine>Custom View</TextLine>
      <DividerCustom />
      <ButtonCustom m={10} onPress={() => navigation.navigate('Setting')}>
        Go To Setting
      </ButtonCustom>
      <DividerCustom />
      <ButtonCustom m={10} onPress={() => navigation.navigate('Home')}>
        Go To Home
      </ButtonCustom>
    </Animated.ScrollView>
  )
}

export default function App() {
  return (
    <Drawer.Navigator
      edgeWidth={SIZE.width}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name={'drawer'} component={DrawerInnerNavigator} />
    </Drawer.Navigator>
  )
}
