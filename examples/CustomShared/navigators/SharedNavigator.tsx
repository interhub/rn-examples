import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import React from 'react'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../config/getScreenAnimation'
import {createStackNavigator} from '@react-navigation/stack'

const screenOptions: any = {
    ...getScreenAnimation(SCREEN_ANIMATION.OPACITY),
}

const Stack = createStackNavigator()

const App = () => {
    return <Stack.Navigator
        headerMode={'none'}>
        <Stack.Screen
            options={screenOptions}
            name={SCREEN_NAME_SHARED.START_LIST}
            component={Start}/>
        <Stack.Screen
            options={screenOptions}
            name={SCREEN_NAME_SHARED.ITEM_DETAIL}
            component={ItemDetail}/>
    </Stack.Navigator>
}

export default App
