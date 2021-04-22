import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import React from 'react'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../config/getScreenAnimation'
import {createStackNavigator} from '@react-navigation/stack'
import LeftScreen from '../screen/LeftScreen'

const Stack = createStackNavigator()

const App = () => {
    return <Stack.Navigator
        headerMode={'none'}>
        <Stack.Screen
            options={getScreenAnimation(SCREEN_ANIMATION.FADE)}
            name={SCREEN_NAME_SHARED.START_LIST}
            component={Start}/>
        <Stack.Screen
            options={getScreenAnimation(SCREEN_ANIMATION.FADE)}
            name={SCREEN_NAME_SHARED.ITEM_DETAIL}
            component={ItemDetail}/>
        <Stack.Screen
            options={getScreenAnimation(SCREEN_ANIMATION.LEFT)}
            name={SCREEN_NAME_SHARED.LEFT_SCREEN}
            component={LeftScreen}/>
    </Stack.Navigator>
}

export default App
