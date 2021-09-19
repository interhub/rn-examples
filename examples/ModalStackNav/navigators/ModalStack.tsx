import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import Setting from '../screen/Setting'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'

const Stack = createStackNavigator()

const App = () => {
  const isProjectSelected = true
  const initialRouteName = isProjectSelected ? SCREEN_NAME_SHARED.START_LIST : SCREEN_NAME_SHARED.SETTING

  return (
    <Stack.Navigator
      // mode={'modal'}
      initialRouteName={initialRouteName}
      headerMode={'none'}>
      <Stack.Screen name={SCREEN_NAME_SHARED.START_LIST} component={Start} />
      <Stack.Screen options={getScreenAnimation(SCREEN_ANIMATION.TOP)} name={SCREEN_NAME_SHARED.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen name={SCREEN_NAME_SHARED.SETTING} component={Setting} />
    </Stack.Navigator>
  )
}

export default App
