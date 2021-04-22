import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated'
import useShowScreen from './useShowScreen'

const useGetShowAnimatedStyle = (setStyle: (shared: Animated.SharedValue<any>, inputRange: [number, number]) => Animated.AnimatedStyleProp<any>, {delay = 50}) => {
    const anim_state = {
        show: 1,
        hide: 0
    }
    const shared = useSharedValue(anim_state.hide)
    useShowScreen((show) => {
        const new_pos = show ? anim_state.show : anim_state.hide
        const animation = withSpring(new_pos, {damping: 100, stiffness: 500})
        shared.value = withDelay(delay, animation)
    })
    const inputRange: [number, number] = [anim_state.hide, anim_state.show]
    const animatedStyle = useAnimatedStyle(() => setStyle(shared, inputRange))
    return [animatedStyle]
}

export default useGetShowAnimatedStyle
