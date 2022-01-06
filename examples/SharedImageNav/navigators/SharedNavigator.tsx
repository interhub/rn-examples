import React, {MutableRefObject, useContext, useEffect, useRef, useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import Setting from '../screen/Setting'
import {Animated, StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'

const screenOptions: any = {
    ...getScreenAnimation(SCREEN_ANIMATION.LEFT),
}

const Stack = createStackNavigator()

const App = () => {
    return (
        <SharedImageProvider>
            <Stack.Navigator screenOptions={screenOptions} headerMode={'none'}>
                <Stack.Screen name={SCREEN_NAME_SHARED.START_LIST} component={Start}/>
                <Stack.Screen name={SCREEN_NAME_SHARED.ITEM_DETAIL} component={ItemDetail}/>
                <Stack.Screen name={SCREEN_NAME_SHARED.SETTING} component={Setting}/>
            </Stack.Navigator>
        </SharedImageProvider>
    )
}


//shared image providers

export type SharedImageContextType = {
    setAnimateNavValue(animateNavValue: Animated.AnimatedInterpolation, ref: React.MutableRefObject<any>, uri: string): void
    setImageRefFrom(ref: React.MutableRefObject<any>, uri: string): void
    setImageRefTo(ref: React.MutableRefObject<any>, uri: string): void
}
//@ts-ignore
const SharedImageContext = React.createContext<SharedImageContextType>({})


type Coord = {
    x: number
    y: number
    width: number
    height: number
}

const getCoordByRef = async (ref: MutableRefObject<any>): Promise<Coord> => {
    return await new Promise((ok) => {
        return ref?.current?.measureInWindow((x: any, y: any, width: any, height: number) => {
            // const centerX = x //+ width / 2
            // const centerY = y //+ height / 2
            // console.log(x, y, width, height, centerX, centerY, 'w')
            return ok({x: x, y: y, width, height})
        })
    })
}

export const SharedImageProvider = ({children}: { children: React.ReactNode }) => {
    // const refFrom = useRef<any>(null)
    const [imageFrom, setImageFrom] = useState('')
    const [imageTo, setImageTo] = useState('')
    // const animationNavValue = useRef<any>(null)
    const [coordFrom, setCoordFrom] = useState<Coord | undefined>(undefined)
    const [coordTo, setCoordTo] = useState<Coord | undefined>(undefined)
    const setImageRefFrom: SharedImageContextType['setImageRefFrom'] = (r, uri) => {
        setImageFrom(uri)
        getCoordByRef(r).then((c) => {
            setCoordFrom(c)
        })
        //todo
    }
    const setImageRefTo: SharedImageContextType['setImageRefFrom'] = (r, uri) => {
        setImageTo(uri)
        getCoordByRef(r).then((c) => {
            setCoordTo(c)
        })
        //todo
    }
    const setAnimateNavValue: SharedImageContextType['setAnimateNavValue'] = (anv, r, uri) => {
        setImageTo(uri)
        // animationNavValue.current = anv
        //todo
    }
    const isCanStartAnimation = !!imageFrom && !!imageTo && !!coordFrom && !!coordTo

    const animateXValue = useRef(new Animated.Value(0)).current
    const animateYValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isCanStartAnimation) {
            const toX = coordTo?.x || 0
            const toY = coordTo?.y || 0
            console.log(toX, toY)
            // animateXValue.setValue(coordFrom?.x || 0)
            // animateYValue.setValue(coordFrom?.y || 0)
            Animated.timing(animateXValue, {toValue: toX, useNativeDriver: true}).start()
            Animated.timing(animateYValue, {toValue: toY, useNativeDriver: true}).start()
        }
    }, [isCanStartAnimation])

    const animatedViewStyle = {
        transform: [{translateX: animateXValue}, {translateY: animateYValue}]
    }

    return <SharedImageContext.Provider value={{setAnimateNavValue, setImageRefFrom, setImageRefTo}}>
        {children}
        {/*move animation container to react appear both*/}
        {isCanStartAnimation && <View style={StyleSheet.absoluteFillObject}>
            <Animated.View style={[animatedViewStyle, {width: 200, height: 200}]}>
                <FastImage source={{uri: imageFrom}} style={{height: '100%', width: '100%', backgroundColor: 'red'}}/>
            </Animated.View>
        </View>}
    </SharedImageContext.Provider>
}
export const useSharedImageTo = (ref: React.MutableRefObject<any>, uri: string) => {
    console.log(uri, 'set to uri')
    // const animateNavValue = useNavigationAnimateValue({startOpen: 0, endOpen: 100, extra: 'clamp'})
    const {setImageRefTo} = useContext(SharedImageContext)
    useEffect(() => {
        setImageRefTo(ref, uri)
        return () => {
            //todo clean TO cb
        }
    }, [])
}

export const useSharedImageFrom = (ref: React.MutableRefObject<any>, uri: string) => {
    const {setImageRefFrom} = useContext(SharedImageContext)
    useEffect(() => {
        setImageRefFrom(ref, uri)
        return () => {
            //todo clean FROM cb
        }
    }, [])
}

export default App
