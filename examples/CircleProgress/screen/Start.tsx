import React, {useEffect, useRef} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import Svg, {Circle, Rect} from 'react-native-svg'

//TODO using https://codepen.io/JMChristensen/pen/Ablch !!

const HEADER_SIZE = 100

const CircleAnimate = Animated.createAnimatedComponent(Circle)

export default function () {
    const SIZE = 300
    const BORDER_WIDTH = 20
    const animValue = useSharedValue(0)
    const progressPercent = 90
    const R = (SIZE / 2) - BORDER_WIDTH
    const LEN = Math.PI * (R * 2)
    const SDO = ((100 - progressPercent) / 100) * LEN
    // if (val < 0) { val = 0;}
    // if (val > 100) { val = 100;}
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
            <Svg height={SIZE} width={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <CircleAnimate
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={(SIZE / 2) - BORDER_WIDTH}
                    stroke="blue"
                    strokeWidth={BORDER_WIDTH}
                    fill="green"
                    strokeLinecap={'round'}
                    strokeDasharray={LEN}
                    animatedProps={AProps}
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#cc7575',
        alignItems:'center'
    },
    header: {
        height: HEADER_SIZE,
        backgroundColor: 'blue',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
    },
    title: {
        textAlign: 'center',
        marginTop: 'auto',
        color: '#FFF',
        fontSize: 20,
    },
})
