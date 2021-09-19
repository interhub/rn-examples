import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParallaxProvider} from 'react-native-accelerometer-parallax'

import {SCREEN_NAME_ACCELEROMETER} from '../constants/SCREEN_NAME_ACCELEROMETER'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'

const Stack = createStackNavigator()

const App = () => {
  return (
    <ParallaxProvider>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen options={getScreenAnimation(SCREEN_ANIMATION.FADE)} name={SCREEN_NAME_ACCELEROMETER.START_LIST} component={Start} />
        <Stack.Screen options={getScreenAnimation(SCREEN_ANIMATION.FADE)} name={SCREEN_NAME_ACCELEROMETER.ITEM_DETAIL} component={ItemDetail} />
      </Stack.Navigator>
    </ParallaxProvider>
  )
}

export default App
