import {useEffect, useLayoutEffect, useRef} from 'react'
import {Animated, InteractionManager} from 'react-native'

const useAnimateShowScale = (show: boolean) => {
    const animateState = {
        start: 0,
        end: 1,
    }
    const animateValue = useRef(new Animated.Value(animateState.start)).current

    useEffect(() => {
        const nextValue = show ? animateState.end : animateState.start
        Animated.spring(animateValue, {
            toValue: nextValue,
            useNativeDriver: true,
            speed: 20,
        }).start()
    }, [show])

    const animateStyle = {
        transform: [{scale: animateValue}],
        opacity: animateValue,
    }

    return {animateStyle, animateValue, animateState}
}
export default useAnimateShowScale
