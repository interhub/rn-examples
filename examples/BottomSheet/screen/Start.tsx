import React, {useMemo, useRef} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {BottomSheetModal, BottomSheetScrollView, useBottomSheetModal} from '@gorhom/bottom-sheet'
import faker from 'faker'
import Animated, {Extrapolate, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import _ from 'lodash'

import ButtonCustom from '../../../components/ButtonCustom'
import SIZE from '../../../src/config/SIZE'

export default () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const {dismiss} = useBottomSheetModal()
  // variables
  const percentPoints = [25, 50, 70]
  const snapPoints = percentPoints.map((val) => SIZE.height * (val / 100) || 0)
  const maxPoint = Math.max(...snapPoints)

  const animate = useSharedValue(maxPoint)
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
    const inputVals = [0, maxPoint]
    const scale = interpolate(animate.value, inputVals, [4, 1], Extrapolate.CLAMP)
    const translateY = interpolate(animate.value, inputVals, [-160, 0], Extrapolate.CLAMP)
    const borderRadius = interpolate(animate.value, inputVals, [0, 20])
    return {transform: [{scale}, {translateY}], borderRadius}
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
    // borderRadius: AVATAR_SIZE / 2,
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
