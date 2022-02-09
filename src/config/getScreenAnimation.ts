import {CardStyleInterpolators, StackNavigationOptions} from '@react-navigation/stack'
import {DrawerNavigationOptions} from '@react-navigation/drawer'

import SIZE from './SIZE'
import IS_IOS from './IS_IOS'

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
export default (animation: SCREEN_ANIMATION = SCREEN_ANIMATION.NONE, swipe = true): StackNavigationOptions & DrawerNavigationOptions => {
  const isVerticalSwipe = animation === SCREEN_ANIMATION.TOP
  const gestureWorkPercent = IS_IOS ? 15 : 15 //%
  const gestureWorkDistance = (isVerticalSwipe ? SIZE.height : SIZE.width) * (gestureWorkPercent / 100)
  const config: StackNavigationOptions & DrawerNavigationOptions = {
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
