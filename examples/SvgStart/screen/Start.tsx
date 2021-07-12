import React from 'react'
import Svg, {Circle, Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg'
import {Animated, StyleSheet, useWindowDimensions} from 'react-native'
import useNavigationAnimateValue from '../../../src/hooks/useNavigationAnimateValue'
import SIZE from '../../../src/SIZE'

const Start = () => {
    const animateValue = useNavigationAnimateValue({startOpen: -200, endOpen: 0})

    const animateStyle = {
        transform: [{translateY: animateValue}]
    }

    const r = 100
    const circle = r * (Math.PI * 2)
    const alpha = Math.PI / 4
    const strokeDashoffset = r * alpha

    const {width, height} = useWindowDimensions()
    return (
        <Animated.View style={[styles.container, animateStyle]}>
            <Svg height={SIZE.height} width={SIZE.width} viewBox={`0 0 ${width} ${height}`}>
                <Circle
                    cx="100"
                    cy="200"
                    r="80"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
                <Path d={'M 0 0 L 100 100'} stroke={'#4649ad'} strokeWidth={10}/>
                <Defs>
                    <LinearGradient id={'grad'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'}>
                        <Stop offset={'0'} stopColor={'#4649ad'} />
                        <Stop offset={'0.5'} stopColor={'#dfdfdf'} />
                        <Stop offset={'1'} stopColor={'#4649ad'} />
                    </LinearGradient>
                </Defs>
                <Circle
                    cx={SIZE.width / 2}
                    cy={SIZE.width / 2}
                    strokeLinecap={'round'}
                    strokeWidth={40}
                    stroke={'url(#grad)'}
                    strokeDasharray={`${circle} ${circle}`}
                    strokeDashoffset={strokeDashoffset}
                    r={r}
                />
            </Svg>
        </Animated.View>
    )
}

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
        width: '100%',
        height: '100%',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 10
    }
})

export default Start

