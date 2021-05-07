import React, {useMemo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Animated from 'react-native-reanimated'
import SIZE from '../../../src/SIZE'
import {useParallax} from '../components/ParallaxProvider'
import {useNavigation} from '@react-navigation/native'

import {SCREEN_NAME_ACCELEROMETER} from '../constants/SCREEN_NAME_ACCELEROMETER'

export default function App() {

    const POINT_MATCH = 20

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            {new Array(POINT_MATCH).fill(1).map((_, index) => {
                return <BoxItem key={index}/>
            })}
        </View>
    )
}

const BoxItem = React.memo(() => {
    const POINT_SIZE = 20
    const {navigate} = useNavigation()
    const goNext = () => {
        navigate(SCREEN_NAME_ACCELEROMETER.ITEM_DETAIL)
        // console.log('press')
    }


    const getRandomCoord = useMemo(() => () => {
        'worklet'
        const diff = (POINT_SIZE / 2)
        const {width, height} = SIZE
        const x = Math.random() * width - diff
        const y = Math.random() * height - diff
        return {x, y}
    }, [])

    const {x: left, y: top} = useMemo(() => getRandomCoord(), [])

    const minSpeed = 0.2
    const maxSpeed = 3
    const randomSpeed = useMemo(() => (Math.random() + minSpeed) * maxSpeed, [])

    const {animStyle} = useParallax({speed: randomSpeed * 2})

    const SIZE_DIFF = POINT_SIZE + ((POINT_SIZE / 2) * (randomSpeed))

    return <Animated.View
        style={[{
            width: SIZE_DIFF,
            height: SIZE_DIFF,
            backgroundColor: '#50068d',
            position: 'absolute',
            left,
            top,
            elevation: 10,
            shadowRadius: 10,
            shadowOpacity: 2,
        }, animStyle]}>
        <TouchableOpacity style={styles.pressBox} onPress={goNext}>
            <Text numberOfLines={1} style={styles.text}>NEXT</Text>
        </TouchableOpacity>
    </Animated.View>
}, () => true)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
        color: '#999999'
    },
    pressBox: {
        flex: 1,
        justifyContent: 'center'
    }
})

