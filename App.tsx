import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'
import 'react-native-gesture-handler'
import NativeGesture from './examples/NativeGesture'
import ReanimateGesture from './examples/ReanimateGesture'
import SharedNav from './examples/SharedNav'
import PanSquareRotate from './examples/PanSquareRotate'
import PanCircleRotate from './examples/PanCircleRotate'
import TfCamera from './examples/TfCamera'
import ScrollAnimate from './examples/ScrollAnimate'
import ScrollAnimateHorizont from './examples/ScrollAnimateHorizont'
import SortAnimate from './examples/SortAnimate'
import ModalStackNav from './examples/ModalStackNav'
import SvgStart from './examples/SvgStart'
import {SCREEN_NAME} from './src/SCREEN_NAME'
import Menu from './src/Menu'

const Stack = createStackNavigator()

const App = () => {
    return <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={SCREEN_NAME.MENU} component={Menu}/>
            <Stack.Screen name={SCREEN_NAME.NATIVE_GESTURE} component={NativeGesture}/>
            <Stack.Screen name={SCREEN_NAME.REANIMATE_GESTURE} component={ReanimateGesture}/>
            <Stack.Screen name={SCREEN_NAME.SHARED_NAV} component={SharedNav}/>
            <Stack.Screen name={SCREEN_NAME.TF_CAMERA} component={TfCamera}/>
            <Stack.Screen name={SCREEN_NAME.SCROLL_ANIMATE} component={ScrollAnimate}/>
            <Stack.Screen name={SCREEN_NAME.SCROLL_ANIMATE_HORIZONT} component={ScrollAnimateHorizont}/>
            <Stack.Screen name={SCREEN_NAME.SORT_ANIMATE} component={SortAnimate}/>
            <Stack.Screen name={SCREEN_NAME.PAN_ROTATE_SQUARE} component={PanSquareRotate}/>
            <Stack.Screen name={SCREEN_NAME.PAN_ROTATE_CIRCLE} component={PanCircleRotate}/>
            <Stack.Screen name={SCREEN_NAME.SVG_START} component={SvgStart}/>
            <Stack.Screen name={SCREEN_NAME.MODAL_STACK_NAV} component={ModalStackNav}/>
        </Stack.Navigator>
    </NavigationContainer>
}

export default App

