import React, {useEffect, useMemo, useRef} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {BottomSheetModal, BottomSheetScrollView, useBottomSheetModal} from '@gorhom/bottom-sheet'
import faker from 'faker'
import Animated, {interpolate, useAnimatedStyle, useSharedValue, Extrapolate, withTiming} from 'react-native-reanimated'
import _ from 'lodash'

import ButtonCustom from '../../../components/ButtonCustom'

export default () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const {dismiss} = useBottomSheetModal()
  // variables
  const snapPoints: React.Key[] = useMemo(() => ['25%', '50%', '70%'], [])

  const animate = useSharedValue(800)
  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present()
  }
  const handleSheetChanges = (index: number) => {
    console.log(animate.value, 'val', index)
  }

  const LIST_LEN = 50
  const listData = useMemo(
    () =>
      new Array(LIST_LEN).fill(1).map(() => {
        return {
          uri: faker.random.image(),
          name: faker.name.firstName(),
          description: faker.lorem.words(_.random(10, 50)),
        }
      }),
    [],
  )

  const animStyle = useAnimatedStyle(() => {
    return {transform: [{scale: interpolate(animate.value, [0, 800], [3.5, 1], Extrapolate.CLAMP)}, {translateY: interpolate(animate.value, [0, 800], [-140, 0], Extrapolate.CLAMP)}]}
  })

  // renders
  return (
    <View style={styles.container}>
      <Animated.Image source={{uri: faker.random.image()}} style={[styles.avatar, animStyle]} />
      <ButtonCustom m={5} onPress={handlePresentModalPress}>
        Present Modal
      </ButtonCustom>
      <ButtonCustom m={5} onPress={() => dismiss('sheet1')}>
        Close
      </ButtonCustom>
      <BottomSheetModal
        animatedPosition={animate}
        enablePanDownToClose={false}
        enableOverDrag
        name={'sheet1'}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
          <View style={styles.listBox}>
            {listData.map(({uri, description, name}, key) => {
              return (
                <View key={key} style={styles.row}>
                  <Image source={{uri}} style={styles.avatar} />
                  <View style={styles.rightBox}>
                    <Text style={styles.nameTitle}>{name}</Text>
                    <Text style={styles.descTitle}>{description}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  )
}

const AVATAR_SIZE = 50

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#bcbcff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#908f8f',
    paddingHorizontal: 10,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignSelf: 'center',
  },
  nameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descTitle: {
    color: 'gray',
  },
  rightBox: {paddingLeft: 15, flex: 1},
  listBox: {
    paddingHorizontal: 20,
  },
})
