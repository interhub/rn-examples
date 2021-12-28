import React from 'react'
import {StyleSheet, Text} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as faker from 'faker'
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {DividerHookReturnType, useScrollDividers} from '../lib/useListDividerAnimate'
import {GestureDetector, NativeGesture, PanGestureHandler, ScrollView} from 'react-native-gesture-handler'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const image = require('../img/bg.jpg')

const text = faker.lorem.paragraphs(9)

const DIVIDER_HEIGHT = 90

export default () => {
    const {onScroll, dividers} = useScrollDividers(3)
    const {bottom} = useSafeAreaInsets()

    return (

        <AnimatedScrollView contentContainerStyle={{paddingBottom: bottom}} scrollEventThrottle={16}
                    onScroll={onScroll}>
            <FastImage resizeMode={'cover'} style={styles.img} source={image}/>
            <Text style={styles.title}>{text}</Text>
            {/*DIVIDER 0*/}
            <AnimateItemDividerWrapper title={'hello world 0!'} color={'green'} divider={dividers[0]} zIndex={3}/>
            <Text style={styles.title}>{text}</Text>
            {/*DIVIDER 1*/}
            <AnimateItemDividerWrapper title={'hello world 1!'} color={'red'} divider={dividers[1]} zIndex={2}/>
            <Text style={styles.title}>{text}</Text>
            {/*DIVIDER 2*/}
            <AnimateItemDividerWrapper title={'hello world 2!'} color={'blue'} divider={dividers[2]} zIndex={1}/>
            <Text style={styles.title}>{text}</Text>
        </AnimatedScrollView>
    )
}

const AnimateItemDividerWrapper = ({
                                       title,
                                       color = 'blue',
                                       divider,
                                       zIndex = 1,
                                   }: {
    title: string
    color?: string
    divider: DividerHookReturnType
    zIndex: number
}) => {
    /**
     * customize scroll interpolations
     */
    const workValues = divider.values
    const workItemFixPosition = workValues.fixScrollPosition

    /**
     * should do not ise transform box animate dicvider interpolation
     */
    const opacityStyle = useAnimatedStyle(() => {
        const reactSize = DIVIDER_HEIGHT * 3
        const inputWorks = [workItemFixPosition - reactSize, workItemFixPosition - reactSize / 2, workItemFixPosition]
        const outputWorks = [1, 0.5, 1]
        const interpolateStyle = interpolate(workValues.scrollSharedValue.value, inputWorks, outputWorks, Extrapolate.CLAMP)
        return {
            opacity: interpolateStyle,
        }
    })

    return (
        <Animated.View
            onLayout={divider.onLayout}
            style={[
                {
                    height: DIVIDER_HEIGHT,
                    padding: 5,
                    backgroundColor: color,
                    zIndex: zIndex,
                },
                divider.dividerAnimateStyle,
                opacityStyle,
            ]}>
            <Text>{title}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#9c83df',
    },
    img: {width: '100%', height: 200},
    title: {fontSize: 15},
})
