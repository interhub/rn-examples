import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('screen')

export default {
    width,
    height,
    getVW(percent: number) {
        return this.width * (percent / 100)
    },
    getVH(percent: number) {
        return this.height * (percent / 100)
    },
}
