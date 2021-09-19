import {createSharedElementStackNavigator, SharedElementRoute, SharedElementsComponentConfig} from 'react-navigation-shared-element'
import React from 'react'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/getScreenAnimation'
import Setting from '../screen/Setting'

const sharedElementsConfig: SharedElementsComponentConfig<SharedElementRoute<SCREEN_NAME_SHARED.START_LIST, {}>, SharedElementRoute<SCREEN_NAME_SHARED.ITEM_DETAIL, {}>> = (
  route,
  otherRoute,
  showing,
) => {
  return [
    {id: 'image', animation: 'move'},
    {id: 'text', animation: 'move'},
  ]
}

const screenOptions: any = {
  ...getScreenAnimation(SCREEN_ANIMATION.OPACITY),
}

const Stack = createSharedElementStackNavigator()

const App = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode={'none'}>
      <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.START_LIST} component={Start} />
      <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.SETTING} component={Setting} />
    </Stack.Navigator>
  )
}

export default App
