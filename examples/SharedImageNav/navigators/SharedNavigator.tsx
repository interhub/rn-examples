import React, {MutableRefObject, useContext, useEffect, useRef, useState} from 'react'
import {createStackNavigator, useHeaderHeight} from '@react-navigation/stack'

import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import getScreenAnimation, {SCREEN_ANIMATION} from '../../../src/config/getScreenAnimation'
import Setting from '../screen/Setting'
import {Animated, StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'

const screenOptions: any = {
    ...getScreenAnimation(SCREEN_ANIMATION.OPACITY),
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
    reverseStart(): void
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
    const [isProgressAnimate, setIsProgressAnimate] = useState(false)

    const [imageFrom, setImageFrom] = useState('')
    const [imageTo, setImageTo] = useState('')
    // const animationNavValue = useRef<any>(null)
    const [coordFrom, setCoordFrom] = useState<Coord | undefined>(undefined)
    const [coordTo, setCoordTo] = useState<Coord | undefined>(undefined)
    const setImageRefFrom: SharedImageContextType['setImageRefFrom'] = (r, uri) => {
        setImageFrom(uri)
        getCoordByRef(r).then((c) => {
            console.log({c})
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
        // setImageTo(uri)
        // animationNavValue.current = anv
        //todo
    }
    const reverseStart = () => {
        setCoordFrom(coordTo)
        setCoordTo(coordFrom)
        setImageFrom(imageTo)
        setImageTo(imageFrom)
        setIsProgressAnimate(true)
    }

    const isCanStartAnimation = !!imageFrom && !!imageTo && !!coordFrom && !!coordTo
    useEffect(() => {
        if (isCanStartAnimation) {
            setIsProgressAnimate(true)
        }
    }, [isCanStartAnimation])

    const animateProgressValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isProgressAnimate) {
            console.log(toX, toY)
            Animated.spring(animateProgressValue, {toValue: 100, useNativeDriver: false, friction: 10}).start(() => {
                setIsProgressAnimate(false)
            })
        }
    }, [isProgressAnimate])

    //positions
    const fromX = coordFrom?.x || 0
    const fromY = coordFrom?.y || 0
    const toX = coordTo?.x || 0
    const toY = coordTo?.y || 0
    //sizes
    const fromH = coordFrom?.height || 0
    const fromW = coordFrom?.width || 0
    const toH = coordTo?.height || 0
    const toW = coordTo?.width || 0

    const animatedViewStyle = {
        transform: [
            {
                translateX: animateProgressValue.interpolate({inputRange: [0, 100], outputRange: [fromX, toX]})
            },
            {
                translateY: animateProgressValue.interpolate({inputRange: [0, 100], outputRange: [fromY, toY]})
            }
        ],
        height: animateProgressValue.interpolate({inputRange: [0, 100], outputRange: [fromH, toH]}),
        width: animateProgressValue.interpolate({inputRange: [0, 100], outputRange: [fromW, toW]})
    }

    const headerHeight = useHeaderHeight()

    return <SharedImageContext.Provider value={{setAnimateNavValue, setImageRefFrom, setImageRefTo, reverseStart}}>
        {children}
        {/*move animation container to react appear both*/}
        {isProgressAnimate && <View style={[StyleSheet.absoluteFillObject, {marginTop: -headerHeight}]}>
            <Animated.View style={[animatedViewStyle, {backgroundColor: 'orange'}]}>
                <FastImage source={{uri: imageFrom}} style={{height: '100%', width: '100%', backgroundColor: 'red'}}/>
            </Animated.View>
        </View>}
    </SharedImageContext.Provider>
}
export const useSharedImageTo = (ref: React.MutableRefObject<any>, uri: string) => {
    // const animateNavValue = useNavigationAnimateValue({startOpen: 0, endOpen: 100, extra: 'clamp'})
    const {addListener} = useNavigation()
    const {setImageRefTo, reverseStart} = useContext(SharedImageContext)
    useEffect(() => {
        setImageRefTo(ref, uri)
        return addListener('blur',()=>{
            reverseStart()
        })
    }, [])
}

export const useSharedImageFrom = (ref: React.MutableRefObject<any>, uri: string) => {
    const {setImageRefFrom} = useContext(SharedImageContext)
    useEffect(() => {
        setTimeout(() => {
            setImageRefFrom(ref, uri)
        }, 300)
        return () => {

        }
    }, [])
}

export default App
