import {createSharedElementStackNavigator, SharedElementRoute, SharedElementsComponentConfig} from 'react-navigation-shared-element'
import React from 'react'
import {View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import Setting from '../screen/Setting'

const sharedElementsConfig: SharedElementsComponentConfig<
  SharedElementRoute<SCREEN_NAME_SHARED.START_LIST, {}>,
  SharedElementRoute<SCREEN_NAME_SHARED.ITEM_DETAIL, {}>
> = (route, otherRoute, showing) => {
  return [
    {id: 'card', animation: 'move'},
    {id: 'image', animation: 'move'},
    {id: 'text', animation: 'move'},
  ]
}

const screenOptions: any = {
  ...getScreenAnimation(SCREEN_ANIMATION.FADE, false),
}

const Stack = createSharedElementStackNavigator()

const App = () => {
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Stack.Navigator screenOptions={screenOptions} headerMode={'none'}>
          <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.START_LIST} component={Start} />
          <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.ITEM_DETAIL} component={ItemDetail} />
          <Stack.Screen sharedElementsConfig={sharedElementsConfig} name={SCREEN_NAME_SHARED.SETTING} component={Setting} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </View>
  )
}

export default App
