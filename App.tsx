import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'

import 'react-native-gesture-handler'
import {enableScreens} from 'react-native-screens'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {StatusBar} from 'expo-status-bar'

import {SCREENS} from './src/SCREENS'
import getScreenAnimation, {SCREEN_ANIMATION} from './src/config/getScreenAnimation'
import KeyboardWrapper from './components/KeyboardWrapper'

enableScreens(false)
const Stack = createStackNavigator()

//TODO TEST EJECT FOR SET UP NORMAL ANDROID ICON SIZE AND DONT USE MANUAL SET ICONS
//TODo add examples
/*
 * 1) usage accelerometer parallax animate library
 * 2) usage expo config module full read documentation
 * 3) usage lottie animate
 * 4) usage webrtc video connect module
 * 5) interpolate scroll bottom position post line with move to scroll position and stop on the end post  point
 * */

const App = () => {
  return (
    // <CodePushWrapper>
    <BottomSheetModalProvider>
      <StatusBar translucent />
      <KeyboardWrapper>
        <NavigationContainer>
          <Stack.Navigator detachInactiveScreens={false} headerMode={'screen'}>
            {Object.entries(SCREENS).map(([screenName, screenComponent], index) => {
              return (
                <Stack.Screen
                  options={{...getScreenAnimation(SCREEN_ANIMATION.LEFT, false), headerShown: true}}
                  key={index}
                  name={screenName}
                  component={screenComponent}
                />
              )
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardWrapper>
    </BottomSheetModalProvider>
    // </CodePushWrapper>
  )
}

export default App
