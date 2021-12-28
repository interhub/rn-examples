import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {Dimensions, LayoutChangeEvent} from 'react-native'
import {useHeaderHeight} from '@react-navigation/stack'
import {useState} from 'react'

import SIZE from '../../../src/config/SIZE'
import IS_IOS from '../../../src/config/IS_IOS'

const screenHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height
export const NAV_HEIGHT = screenHeight - windowHeight //add status bar height if it translucent

type DividerConfigType = {
    dividerCustomHeight?: number
    onUpdate?: (scrollPosition: number) => void
    otherScrollValue?: Animated.SharedValue<number>
}
export type DividerHookReturnType = {
    onScroll: ReturnType<typeof useAnimatedScrollHandler>
    onLayout: (e: LayoutChangeEvent) => void
    dividerAnimateStyle: { transform: { translateY: number }[] }
    values: {
        fixDividerPosition: number
        fixScrollPosition: number
        scrollSharedValue: Animated.SharedValue<number>
    }
}

export const useScrollDivider = (config?: DividerConfigType): DividerHookReturnType => {
    const scrollValue = config?.otherScrollValue || useSharedValue(0)
    const headerHeight = useHeaderHeight()
    const FROM_TOP_SCROLL_TO_BOTTOM_SCREEN = SIZE.height - headerHeight
    const [positionY, setPositionY] = useState(0)
    const [heightY, setHeightY] = useState(1)
    const PLATFORM_CORE_MOVE = IS_IOS ? 0 : NAV_HEIGHT
    const INIT_DIVIDER_DIFF = -(positionY - FROM_TOP_SCROLL_TO_BOTTOM_SCREEN + heightY + PLATFORM_CORE_MOVE)
    const STOP_DIFF_SCROLL_VALUE = positionY - FROM_TOP_SCROLL_TO_BOTTOM_SCREEN + heightY + PLATFORM_CORE_MOVE

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollValue.value = event.contentOffset.y
        if (config?.onUpdate) {
            runOnJS(config?.onUpdate)(event.contentOffset.y)
        }
    })
    const onLayout = ({
                          nativeEvent: {
                              layout: {y = 0, height = 1},
                          },
                      }) => {
        setPositionY(y)
        setHeightY(height)
    }

    const dividerAnimateStyle = useAnimatedStyle(() => {
        const isEnableInterpolation = positionY + heightY > FROM_TOP_SCROLL_TO_BOTTOM_SCREEN
        return {
            transform: isEnableInterpolation
                ? [
                    {
                        translateY: interpolate(
                            scrollValue.value,
                            [0, STOP_DIFF_SCROLL_VALUE, STOP_DIFF_SCROLL_VALUE + 1],
                            [INIT_DIVIDER_DIFF, 0, 0],
                            Extrapolate.CLAMP,
                        ),
                    },
                ]
                : [],
        }
    })

    return {
        dividerAnimateStyle,
        onLayout,
        onScroll,
        values: {
            scrollSharedValue: scrollValue,
            fixDividerPosition: positionY,
            fixScrollPosition: STOP_DIFF_SCROLL_VALUE,
        },
    }
}

export const useScrollDividers = (
    configs: DividerConfigType[] | number,
): { dividers: DividerHookReturnType[]; onScroll: DividerHookReturnType['onScroll'] } => {
    //@ts-ignore
    const resultConfigs: DividerConfigType[] = Number.isInteger(configs) ? new Array(configs).fill({}) : configs
    const {
        onScroll,
        values: {scrollSharedValue},
    } = useScrollDivider(resultConfigs[0])
    const dividers = resultConfigs.map((config) => useScrollDivider({...config, otherScrollValue: scrollSharedValue}))
    return {dividers, onScroll}
}
