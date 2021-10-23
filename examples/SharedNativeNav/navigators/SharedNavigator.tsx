import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import Setting from '../screen/Setting'

const screenOptions: any = {
  ...getScreenAnimation(SCREEN_ANIMATION.FADE),
}

const Stack = createStackNavigator()

const App = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode={'none'}>
      <Stack.Screen name={SCREEN_NAME_SHARED.START_LIST} component={Start} />
      <Stack.Screen name={SCREEN_NAME_SHARED.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen name={SCREEN_NAME_SHARED.SETTING} component={Setting} />
    </Stack.Navigator>
  )
}

export default App
