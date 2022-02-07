import React, {useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'

import useNotFirstEffect from '../../../src/hooks/useNotFirstEffect'
import useInterval from '../../../src/hooks/useInterval'
import usePrevious from '../../../src/hooks/usePrevious'

const TopTimerIndicator = (props: {index: number; time: number; len: number; setNext: () => void; isStop: boolean}) => {
  const {time, index, len, setNext, isStop} = props

  const ITEM_HEIGHT = 4
  const ITEM_PADDING = 3

  const animateValue = useRef(new Animated.Value(0)).current
  const animationStyle = {
    width: animateValue.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']}),
    opacity: animateValue.interpolate({inputRange: [0, 10], outputRange: [0, 1], extrapolate: 'clamp'}),
  }

  const setUpAnimation = (time: number): Animated.CompositeAnimation => {
    const animation = Animated.timing(animateValue, {toValue: 100, duration: time, useNativeDriver: false})
    animation.start(({finished}) => {
      if (!finished) return
      setNext()
    })
    return animation
  }

  //update percent value
  const [percent, setPercent] = useState(0)

  //set up and update animation values
  useEffect(() => {
    const animation = setUpAnimation(time)
    return () => {
      animation.reset()
    }
  }, [index])

  const prevIndex = usePrevious(index)

  //react to stop state
  useNotFirstEffect(() => {
    if (isStop) {
      animateValue.stopAnimation((val) => {
        setPercent(val)
      })
    } else {
      if (prevIndex !== index) return
      const endTime = time * (1 - percent / 100)
      setUpAnimation(endTime)
    }
  }, [isStop])

  return (
    <View style={styles.timerLineBox}>
      {new Array(len).fill(1).map((_, key) => {
        const isCurren = key === index
        const isMoreCurrent = key > index
        return (
          <View key={key} style={{paddingHorizontal: ITEM_PADDING, flex: 1}}>
            <View
              style={[
                {
                  opacity: 0.3,
                  backgroundColor: '#fff',
                  borderRadius: ITEM_HEIGHT,
                  position: 'absolute',
                  height: ITEM_HEIGHT,
                  width: '100%',
                  marginHorizontal: ITEM_PADDING,
                },
              ]}
            />
            <Animated.View
              style={[
                {
                  height: ITEM_HEIGHT,
                  borderRadius: ITEM_HEIGHT,
                  backgroundColor: '#fff',
                  opacity: isMoreCurrent ? 0.3 : 1,
                },
                isCurren ? animationStyle : {width: '100%'},
              ]}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  timerLineBox: {
    position: 'absolute',
    top: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default TopTimerIndicator
