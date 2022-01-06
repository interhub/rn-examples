import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import Svg, {Circle} from 'react-native-svg'
import {clamp} from 'lodash'

const CircleAnimate = Animated.createAnimatedComponent(Circle)

export type CircleProgressProps = {
    borderColor?: string
    fillColor?: string
    initialProgressPercent?: number
    center?: React.ReactNode
    size: number
    borderWidth: number
    progressPercent: number
}

const CircleProgressBar = (props: CircleProgressProps) => {
    const {
        borderWidth = 10,
        borderColor = 'blue',
        fillColor = 'gray',
        initialProgressPercent = 0,
        progressPercent = 0,
        size = 100,
        center
    } = props

    const safeProgressResult = clamp(progressPercent || 0, 0, 100)
    const R = (size / 2) - (borderWidth / 2)
    const LEN = Math.PI * (R * 2)
    const initAnimateValue = ((100 - initialProgressPercent) / 100) * LEN
    const SDO = ((100 - safeProgressResult) / 100) * LEN
    const animValue = useSharedValue(initAnimateValue)

    useEffect(() => {
        animValue.value = withTiming(SDO, {duration: 1000})
    }, [SDO])

    const AProps = useAnimatedProps(() => ({
        strokeDashoffset: animValue.value
    }))

    /**
     * TODO - если процент прогресса больше 100, то необходимо найти остаток от деления (X) на 100 и увеличить прогресс на 100*X
     * и добавить дополнительную одну окружность с тенями поверх первой окружности.
     * - тогда при любом сколько угодном большем проценте прогресса будет удобное отображение поверх.
     * Важно на экране отображаь теоретическое значение прогресса, а в расчетах использовать безопасное значение прогресса до 100
     */

    return (
        <View>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <CircleAnimate
                    cx={size / 2}
                    cy={size / 2}
                    r={R}
                    stroke={borderColor}
                    strokeWidth={borderWidth}
                    fill={fillColor}
                    strokeLinecap={'round'}
                    strokeDasharray={LEN}
                    animatedProps={AProps}
                />
            </Svg>
            {/*CENTER CHILD CONTAINER*/}
            {!!center && <View style={styles.centerChild}>
                {/*PLACE TO APPLY CHILD INSTEAD*/}
                {center}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    centerChild: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default CircleProgressBar
