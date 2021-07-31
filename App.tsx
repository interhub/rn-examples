import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'
import 'react-native-gesture-handler'
import {SCREENS} from './src/SCREENS'
import {enableScreens} from 'react-native-screens'
import CodePushWrapper from './src/wrappers/CodePushWrapper'
import codePush from 'react-native-code-push'

enableScreens()
const Stack = createStackNavigator()

//TODO TEST EJECT FOR SET UP NORMAL ANDROID ICON SIZE AND DONT USE MANUAL SET ICONS

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

