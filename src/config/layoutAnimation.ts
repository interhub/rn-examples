import {LayoutAnimation} from 'react-native'

/**
 call layout animation with change state for flexbox maket
 */
const layoutAnimation = {
    listMove() {
        const deleteTime = 100
        const createTime = 300
        LayoutAnimation.configureNext({
            create: {
                duration: createTime,
                delay: deleteTime + createTime,
                initialVelocity: 0,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.easeInEaseOut,
                springDamping: 1
            },
            delete: {
                duration: deleteTime,
                delay: 0,
                initialVelocity: 0,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.linear,
                springDamping: 1
            },
            update: {
                duration: createTime,
                delay: deleteTime,
                initialVelocity: 0,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.easeIn,
                springDamping: 1
            },
            duration: 300
        })
    },
    itemMove() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
}
export default layoutAnimation
