import Animated, {interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated'
import useShowScreen from './useShowScreen'

const useGetShowAnimatedStyle = (setStyle: (setPoints: (start: number, end: number) => number) => Animated.AnimatedStyleProp<any>, {delay = 50}) => {
    const anim_state = {
        show: 100,
        hide: 0
    }
    const shared = useSharedValue(anim_state.hide)
    useShowScreen((show) => {
        const new_pos = show ? anim_state.show : anim_state.hide
        const animation = withSpring(new_pos, {damping: 100, stiffness: 500})
        shared.value = withDelay(delay, animation)
    })
    const inputRange: [number, number] = [anim_state.hide, anim_state.show]

    // const getStyleFromJS=()=>{
    //     "worklet";
    //     return setStyle()
    // }

    const animatedStyle = useAnimatedStyle(() => {
        const setPoints = (start: number, end: number) => {
            console.log(start, end, 'ends')
            return interpolate(shared.value, inputRange, [start, end])
        }
        return setStyle(setPoints)
    })
    return [animatedStyle]
}

export default useGetShowAnimatedStyle
