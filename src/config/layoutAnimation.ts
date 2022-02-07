import {LayoutAnimation, UIManager} from 'react-native'

import IS_IOS from './IS_IOS'

if (!IS_IOS) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}
/**
 call layout animation with change state for flexbox maket
 */
const layoutAnimation = {
  listMove() {
    if (!IS_IOS) {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      })
    } else {
      const deleteTime = 100
      const createTime = 300
      LayoutAnimation.configureNext({
        create: {
          duration: createTime,
          delay: deleteTime + createTime,
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
          duration: deleteTime,
          delay: 0,
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        update: {
          duration: createTime,
          delay: deleteTime,
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.easeIn,
        },
        duration: 300,
      })
    }
  },
  itemMove() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  },
}
export default layoutAnimation
