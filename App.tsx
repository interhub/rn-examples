import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'
import 'react-native-gesture-handler'
import {SCREENS} from './src/SCREENS'
import {enableScreens} from 'react-native-screens'
import CodePushWrapper from './src/wrappers/CodePushWrapper'
import codePush from 'react-native-code-push'
import 'expo-dev-client';

enableScreens()
const Stack = createStackNavigator()

//TODO TEST EJECT FOR SET UP NORMAL ANDROID ICON SIZE AND DONT USE MANUAL SET ICONS
//TODo add examples
/*
* 1) usage accelerometer parallax animate library ✅
* 2) image open screen show from down
* 2) usage expo config module full read documentation
* 3) usage lottie animate
* 4) usage webrtc video connect module
* 5) interpolate scroll bottom position post line with move to scroll position and stop on the end post  point
* */

const App = () => {

    return <CodePushWrapper>
        <NavigationContainer>
            <Stack.Navigator detachInactiveScreens={false} headerMode={'none'}>
                {Object.entries(SCREENS).map(([screenName, screenComponent], index) => {
                    return <Stack.Screen key={index} name={screenName} component={screenComponent}/>
                })}
            </Stack.Navigator>
        </NavigationContainer>
    </CodePushWrapper>
}


const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.MANUAL,
    installMode: codePush.InstallMode.IMMEDIATE,
}
codePush.notifyAppReady()
export default __DEV__ ? App : codePush(codePushOptions)(App)

