import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import Svg, {Circle, Rect} from 'react-native-svg'

//TODO using https://codepen.io/JMChristensen/pen/Ablch !!

const CircleAnimate = Animated.createAnimatedComponent(Circle)

export default function () {
    const BORDER_COLOR = '#4649ad'
    const FILL_COLOR = '#d19d60'
    const SIZE_C = 300
    const BORDER_WIDTH = 20
    const animValue = useSharedValue(0)
    const progressPercent = 20
    const R = (SIZE_C / 2) - BORDER_WIDTH
    const LEN = Math.PI * (R * 2)
    const SDO = ((100 - progressPercent) / 100) * LEN
    useEffect(() => {
        setTimeout(() => {
            animValue.value = withTiming(SDO)
        }, 500)
    }, [SDO])

    const AProps = useAnimatedProps(() => ({
        strokeDashoffset: animValue.value
    }))


    return (
        <View style={styles.container}>
            <Svg height={SIZE_C} width={SIZE_C} viewBox={`0 0 ${SIZE_C} ${SIZE_C}`}>
                <CircleAnimate
                    cx={SIZE_C / 2}
                    cy={SIZE_C / 2}
                    r={(SIZE_C / 2) - BORDER_WIDTH}
                    stroke={BORDER_COLOR}
                    strokeWidth={BORDER_WIDTH}
                    fill={FILL_COLOR}
                    strokeLinecap={'round'}
                    strokeDasharray={LEN}
                    animatedProps={AProps}
                />
            </Svg>
            {/*CENTER CHILD CONTAINER*/}
            <View style={styles.centerChild}>
                {/*PLACE TO APPLY CHILD INSTEAD*/}
                <View>
                    <Text style={{fontSize: 24, color: '#1a1a1a'}}>Progress is {progressPercent}%</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffa83c',
        alignItems: 'center'
    },
    centerChild: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
