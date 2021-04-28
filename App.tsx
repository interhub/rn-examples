import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'
import 'react-native-gesture-handler'
import NativeGesture from './examples/NativeGesture'
import ReanimateGesture from './examples/ReanimateGesture'
import SharedNav from './examples/SharedNav'
import PanSquareRotate from './examples/PanSquareRotate'
import PanCircleRotate from './examples/PanCircleRotate'
import ScrollAnimate from './examples/ScrollAnimate'
import ScrollAnimateHorizont from './examples/ScrollAnimateHorizont'
import SortAnimate from './examples/SortAnimate'
import ModalStackNav from './examples/ModalStackNav'
import SvgStart from './examples/SvgStart'
import CustomShared from './examples/CustomShared'
import NavigateAnimation from './examples/NavigateAnimation'
import {SCREEN_NAME} from './src/SCREEN_NAME'
import Menu from './src/Menu'
import {enableScreens} from 'react-native-screens'
import getScreenAnimation, {SCREEN_ANIMATION} from './src/getScreenAnimation'
import TabsNavigator from './examples/TabNavigator'
import AccelerometerLib from './examples/AccelerometerLib'
import PhotoPicker from './examples/PhotoPicker'
import MaskView from './examples/MaskView'

import changeNavigationBarColor from 'react-native-navigation-bar-color'
enableScreens()
const setUpSettings=async ()=>{
    try{
        const response = await changeNavigationBarColor('#80b3ff', true, true);
        console.log(response)
    }catch(e){
        console.log(e)
    }
}
const Stack = createStackNavigator()
setUpSettings()

const App = () => {

    return <NavigationContainer>
        <Stack.Navigator detachInactiveScreens={false} headerMode={'none'}>
            <Stack.Screen name={SCREEN_NAME.MENU} component={Menu}/>
            <Stack.Screen name={SCREEN_NAME.NATIVE_GESTURE} component={NativeGesture}/>
            <Stack.Screen name={SCREEN_NAME.REANIMATE_GESTURE} component={ReanimateGesture}/>
            <Stack.Screen name={SCREEN_NAME.SHARED_NAV} component={SharedNav}/>
            <Stack.Screen name={SCREEN_NAME.SCROLL_ANIMATE} component={ScrollAnimate}/>
            <Stack.Screen name={SCREEN_NAME.SCROLL_ANIMATE_HORIZONT} component={ScrollAnimateHorizont}/>
            <Stack.Screen name={SCREEN_NAME.SORT_ANIMATE} component={SortAnimate}/>
            <Stack.Screen name={SCREEN_NAME.PAN_ROTATE_SQUARE} component={PanSquareRotate}/>
            <Stack.Screen name={SCREEN_NAME.PAN_ROTATE_CIRCLE} component={PanCircleRotate}/>
            <Stack.Screen name={SCREEN_NAME.SVG_START} component={SvgStart}/>
            <Stack.Screen name={SCREEN_NAME.MODAL_STACK_NAV} component={ModalStackNav}/>
            <Stack.Screen name={SCREEN_NAME.CUSTOM_SHARED} component={CustomShared}/>
            <Stack.Screen name={SCREEN_NAME.NAVIGATE_ANIMATION} component={NavigateAnimation}
                          options={getScreenAnimation(SCREEN_ANIMATION.LEFT)}/>
            <Stack.Screen name={SCREEN_NAME.TAB_NAVIGATOR} component={TabsNavigator}/>
            <Stack.Screen name={SCREEN_NAME.ACCELEROMETER_LIB} component={AccelerometerLib}/>
            <Stack.Screen name={SCREEN_NAME.PHOTO_PICKER} component={PhotoPicker}/>
            <Stack.Screen name={SCREEN_NAME.MASK_VIEW} component={MaskView}/>
        </Stack.Navigator>
    </NavigationContainer>
}

export default App

