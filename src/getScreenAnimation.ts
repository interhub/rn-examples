import {CardStyleInterpolators, StackNavigationOptions} from '@react-navigation/stack'

import SIZE from './SIZE'

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
  }),
}

export enum SCREEN_ANIMATION {
  ZOOM = 'ZOOM',
  LEFT = 'LEFT',
  TOP = 'TOP',
  NONE = 'NONE',
  FADE = 'FADE',
  OPACITY = 'OPACITY',
}

/**
 get some screen navigation animation config for navigation (by doc from https://reactnavigation.org/docs/stack-navigator/#animations )
 */
export default (animation: SCREEN_ANIMATION = SCREEN_ANIMATION.NONE, swipe = true): StackNavigationOptions => {
  const isVerticalSwipe = animation === SCREEN_ANIMATION.TOP
  const gestureWorkPercent = 100 //%
  const gestureWorkDistance = (isVerticalSwipe ? SIZE.height : SIZE.width) * (gestureWorkPercent / 100)
  const config: StackNavigationOptions = {
    headerShown: false,
    cardStyleInterpolator: ANIMATION[animation],
    gestureEnabled: swipe,
    gestureDirection: isVerticalSwipe ? 'vertical' : 'horizontal',
    animationTypeForReplace: 'push',
    gestureResponseDistance: {vertical: 0, horizontal: 0},
    cardStyle: {
      backgroundColor: '#FFF',
    },
  }
  if (config.gestureResponseDistance) {
    config.gestureResponseDistance[isVerticalSwipe ? 'vertical' : 'horizontal'] = gestureWorkDistance
  }
  return config
}
