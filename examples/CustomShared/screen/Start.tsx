import React, {MutableRefObject, useContext, useRef} from 'react'
import {Button, Image, StyleSheet, Text, View} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {useNavigation} from '@react-navigation/native'
import {SCREEN_NAME_SHARED} from '../constants/SCREEN_NAME_SHARED'
import SIZE from '../../../src/SIZE'

type Coord = {
    x: number,
    y: number,
    width: number
    height: number
}

const config: Animated.WithTimingConfig = {duration: 500}

const Start = () => {

    const {navigate} = useNavigation()
    const goToDetail = () => {
        navigate(SCREEN_NAME_SHARED.ITEM_DETAIL)
    }

    const {oneStyle, reset, move, oneRef, twoRef,} = useMovaLocal()
    const {oneStyle: oneStyle1, reset: reset1, move: move1, oneRef: oneRef1, twoRef: twoRef1,} = useMovaLocal()

    return (
        <View style={styles.container}>
            <Button title={'move'} onPress={move}/>
            <Button title={'reset'} onPress={reset}/>
            <Button title={'move1'} onPress={move1}/>
            <Button title={'reset1'} onPress={reset1}/>
            <Button color={'red'} title={'navigate'} onPress={goToDetail}/>
            <ViewMove nodeRef={twoRef}>
                <Text style={[{fontSize: 40, color: '#000', opacity: 0}]}>hello world!</Text>
            </ViewMove>
            <ViewMove nodeRef={twoRef1}>
                <Image source={require('../img/bg.jpg')} style={styles.image}/>
            </ViewMove>

            <ViewMove nodeRef={oneRef} oneStyle={oneStyle}>
                <Text style={[{fontSize: 70, color: '#000'}]}>hello world!</Text>
            </ViewMove>

            {/*<ViewMove nodeRef={oneRef1} oneStyle={oneStyle1}>*/}
            <Animated.Image source={require('../img/bg.jpg')} ref={oneRef1}
                            style={[oneStyle1, {width: SIZE.width, height: 300}, styles.image,]}/>
            {/*</ViewMove>*/}

        </View>
    )
}

export type MoveContextType = {
    move: () => void
    reset: () => void
    oneStyle: ReturnType<typeof useAnimatedStyle>
    oneRef: MutableRefObject<any>
    twoRef: MutableRefObject<any>
}

const MoveContext = React.createContext<MoveContextType>({} as any)
export const SharedMoveProvider = ({children}: { children: React.ReactNode }) => {
    const getCoordDiff = (coordOne: Coord, coordTwo: Coord): { x: number, y: number, size: number } => {
        'worklet'
        const diffX = (coordTwo.x - coordOne.x) || 0
        const diffY = (coordTwo.y - coordOne.y) || 0
        const size = (coordTwo.width + coordTwo.height) / (coordOne.width + coordOne.height)
        return {x: diffX, y: diffY, size}
    }

    const getCoordByRef = async (ref: MutableRefObject<any>): Promise<Coord> => {
        return await new Promise((ok) => {
            return ref?.current?.measureInWindow((x: any, y: any, width: any, height: number) => {
                const centerX = x + (width / 2)
                const centerY = y + (height / 2)
                console.log(x, y, width, height, centerX, centerY, 'w')
                return ok({x: centerX, y: centerY, width, height})
            })
        })
    }

    const [posX, posY, scale, opacity] = [useSharedValue(0), useSharedValue(0), useSharedValue(1), useSharedValue(1)]


    const oneRef = useRef<View>(null)
    const twoRef = useRef<View>(null)

    const oneStyle = useAnimatedStyle(() => ({
        transform: [{translateX: posX.value}, {translateY: posY.value}, {scale: scale.value}],
        opacity: opacity.value
    }))

    const show = () => {
        'worklet'
        opacity.value = 1
    }
    const hide = () => {
        'worklet'
        opacity.value = 0
    }

    const move = async () => {
        console.log('call move')
        const coordOne = await getCoordByRef(oneRef)
        const coordTwo = await getCoordByRef(twoRef)
        const diff = getCoordDiff(coordOne, coordTwo)
        posX.value = withTiming(diff.x, config)
        posY.value = withTiming(diff.y, config)
        scale.value = withTiming(diff.size, config, () => {
            hide()
        })
        console.log(diff, 'diff')
    }
    const reset = () => {
        show()
        posX.value = withTiming(0, config)
        posY.value = withTiming(0, config)
        scale.value = withTiming(1, config)
    }
    return <MoveContext.Provider value={{move, reset, oneStyle, oneRef, twoRef}}>
        {children}
    </MoveContext.Provider>
}

export const useMoveTransition = () => {
    return useContext(MoveContext)
}

export const useMovaLocal = () => {
    const getCoordDiff = (coordOne: Coord, coordTwo: Coord): { x: number, y: number, size: number } => {
        'worklet'
        const diffX = (coordTwo.x - coordOne.x) || 0
        const diffY = (coordTwo.y - coordOne.y) || 0
        const size = (coordTwo.width + coordTwo.height) / (coordOne.width + coordOne.height)
        return {x: diffX, y: diffY, size}
    }

    const getCoordByRef = async (ref: MutableRefObject<any>): Promise<Coord> => {
        return await new Promise((ok) => {
            return ref?.current?.measureInWindow((x: any, y: any, width: any, height: number) => {
                const centerX = x + (width / 2)
                const centerY = y + (height / 2)
                console.log(x, y, width, height, centerX, centerY, 'w')
                return ok({x: centerX, y: centerY, width, height})
            })
        })
    }

    const [posX, posY, scale, opacity, width, height] = [useSharedValue(0), useSharedValue(0), useSharedValue(1), useSharedValue(1), useSharedValue<number | undefined>(undefined), useSharedValue<number | undefined>(undefined)]


    const oneRef = useRef<View>(null)
    const twoRef = useRef<View>(null)

    const oneStyle = useAnimatedStyle(() => ({
        transform: [{translateX: posX.value}, {translateY: posY.value}, {scale: scale.value}],
        opacity: opacity.value,
        width: width.value, height: height.value
    }))

    const show = () => {
        'worklet'
        opacity.value = 1
    }
    const hide = () => {
        'worklet'
        // opacity.value = 0
    }

    const move = async () => {
        console.log('call move')
        const coordOne = await getCoordByRef(oneRef)
        const coordTwo = await getCoordByRef(twoRef)
        const diff = getCoordDiff(coordOne, coordTwo)
        posX.value = withTiming(diff.x, config)
        posY.value = withTiming(diff.y, config)
        width.value = withTiming(coordOne.width, config)
        height.value = withTiming(coordOne.height, config)
        scale.value = withTiming(diff.size, config, () => {
            hide()
        })
        console.log(diff, 'diff')
    }
    const reset = () => {
        show()
        posX.value = withTiming(0, config)
        posY.value = withTiming(0, config)
        scale.value = withTiming(1, config)
    }
    return {oneRef, twoRef, oneStyle, move, reset}
}

const ViewMove = ({
                      nodeRef,
                      children,
                      oneStyle
                  }: { nodeRef: MutableRefObject<any>, children: React.ReactNode, oneStyle?: any }) => {

    return <Animated.View style={[{opacity: 1, overflow: 'hidden'}, oneStyle]} ref={nodeRef as any}
                          collapsable={false}>
        {children}
    </Animated.View>
}


// const Title = () => {
//     return <Text>hello world!</Text>
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#78bdd0',
    },
    imgBox: {
        width: 200, height: 300,
    },
    image: {
        width: 200,
        height: 100,
        // borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        alignSelf: 'center'
    }
})

export default Start

