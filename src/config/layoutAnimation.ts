import {LayoutAnimation} from 'react-native';

/**
call layout animation with change state for flexbox maket
*/
const layoutAnimation = (preset = LayoutAnimation.Presets.easeInEaseOut) =>
  LayoutAnimation.configureNext(preset);
export default layoutAnimation;
