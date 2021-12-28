1. Example of using "divider animations wrapper"

```tsx

 /**
   * Example for using to alone once component!
   */
  // const {
  //   onLayout,
  //   onScroll,
  //   dividerAnimateStyle,
  //   values: {scrollSharedValue, fixScrollPosition},
  // } = useScrollDivider({dividerHeight: DIVIDER_HEIGHT})
  //
  // const {onLayout: onLayout1, dividerAnimateStyle: dividerAnimateStyle1} = useScrollDivider({
  //   dividerHeight: DIVIDER_HEIGHT_1,
  //   otherScrollValue: scrollSharedValue,
  // })


 /**
  * Example for using to multiple component!
  */
 const {onScroll, dividers} = useScrollDividers(2)
 const SPEED_DIST = 200
 const index_work = 1
 const workValues = dividers[index_work].values
 const workItemFixPosition = workValues.fixScrollPosition
 const inputWorks = [workItemFixPosition - SPEED_DIST, workItemFixPosition - SPEED_DIST / 2, workItemFixPosition]

 const opacityStyle = useAnimatedStyle(() => ({
     opacity: interpolate(workValues.scrollSharedValue.value, inputWorks, [1, 0.5, 1], Extrapolate.CLAMP),
 }))
 
 
 const ScrollAnimateWrapper=()=>{
     return <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll}>
         <FastImage resizeMode={'cover'} style={styles.img} source={image} />
         <Text style={styles.title}>{text}</Text>
         {/*DIVIDER*/}
         <Animated.View
             onLayout={dividers[0].onLayout}
             style={[
                 {
                     height: DIVIDER_HEIGHT,
                     padding: 5,
                     backgroundColor: 'green',
                     zIndex: 2,
                 },
                 dividers[0].dividerAnimateStyle,
             ]}>
             <Text>Hello world!</Text>
         </Animated.View>
         <Text style={styles.title}>{text}</Text>
         {/*DIVIDER 1*/}
         <Animated.View
             onLayout={dividers[1].onLayout}
             style={[
                 {
                     height: DIVIDER_HEIGHT_1,
                     padding: 5,
                     backgroundColor: 'red',
                 },
                 dividers[1].dividerAnimateStyle,
                 opacityStyle,
             ]}>
             <Text>Hello world 1!</Text>
         </Animated.View>
         <Text style={styles.title}>{text}</Text>
     </Animated.ScrollView>
 }

``` 
