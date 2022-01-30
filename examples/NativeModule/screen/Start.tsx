import React, {useEffect, useRef} from 'react'
import {Animated, findNodeHandle, PixelRatio, ScrollView, StyleSheet, Text, UIManager, View} from 'react-native'
import { requireNativeComponent } from 'react-native';

export const MyViewManager = requireNativeComponent(
    'MyViewManager'
);

const createFragment = (viewId:any) =>
    UIManager.dispatchViewManagerCommand(
        viewId,
        // we are calling the 'create' command
        //@ts-ignore
        UIManager.MyViewManager.Commands.create.toString(),
        [viewId]
    );

export const MyView = () => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
      <MyViewManager
          style={{
            // converts dpi to px, provide desired height
            height: PixelRatio.getPixelSizeForLayoutSize(200),
            // converts dpi to px, provide desired width
            width: PixelRatio.getPixelSizeForLayoutSize(200)
          }}
          ref={ref}
      />
  );
};


export default function () {

  return (
    <View style={styles.container}>
      <MyView/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
})
