import {Dimensions} from 'react-native'
import {initialWindowMetrics} from 'react-native-safe-area-context'

const {width, height} = Dimensions.get('screen')

export default {
  width,
  height,
  inserts: initialWindowMetrics?.insets,
  getVW(percent: number) {
    return this.width * (percent / 100)
  },
  getVH(percent: number) {
    return this.height * (percent / 100)
  },
}
