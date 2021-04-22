import {CardStyleInterpolators, StackNavigationOptions} from '@react-navigation/stack'

/**
 animation types for react-navigation from https://reactnavigation.org/docs/stack-navigator/#transitionpresets
 */
const ANIMATION = {
    ZOOM: CardStyleInterpolators.forScaleFromCenterAndroid,
    LEFT: CardStyleInterpolators.forHorizontalIOS,
    TOP: CardStyleInterpolators.forVerticalIOS,
    NONE: CardStyleInterpolators.forNoAnimation,
    FADE: CardStyleInterpolators.forFadeFromBottomAndroid,
    OPACITY: ({current: {progress}}: any) => ({
        cardStyle: {
            opacity: progress,
        },
    })
}

export enum SCREEN_ANIMATION {
    ZOOM = 'ZOOM', LEFT = 'LEFT', TOP = 'TOP', NONE = 'NONE', FADE = 'FADE', OPACITY = 'OPACITY'
}

/**
 get some screen navigation animation config for navigation (by doc from https://reactnavigation.org/docs/stack-navigator/#animations )
 */
export default (animation: SCREEN_ANIMATION = SCREEN_ANIMATION.NONE, swipe = true): StackNavigationOptions => ({
    headerShown: false,
    cardStyleInterpolator: ANIMATION[animation],
    gestureEnabled: swipe,
    gestureDirection: 'horizontal',
    animationTypeForReplace: 'push',
    gestureResponseDistance: {vertical: 0, horizontal: 20},
    cardStyle: {
        backgroundColor: '#FFF'
    }
})

