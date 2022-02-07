import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {SCREENS} from './SCREENS'
import useHandleDeepLink from './hooks/useHandleDeepLink'

import ButtonCustom from '../components/ButtonCustom'

const Menu = () => {
  const {bottom} = useSafeAreaInsets()
  const SCREENS_NAMES = useMemo(() => Object.keys(SCREENS).reverse(), [])
  const {deepUrl} = useHandleDeepLink()

  useEffect(() => {
    if (deepUrl) {
      //usage action or navigate
      console.log(deepUrl, 'usage deep links ✅ ')
    }
  }, [deepUrl])

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: bottom + 10}}
      style={{flex: 1}}
      data={SCREENS_NAMES}
      initialNumToRender={14}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return <NavigateButton screenName={item} />
      }}
    />
  )
}

const NavigateButton = ({screenName}: {screenName: string}) => {
  const {navigate} = useNavigation()

  const onPressHandler = () => navigate(screenName)

  return (
    <View style={{paddingHorizontal: 10, paddingTop: 10}}>
      <ButtonCustom onPress={onPressHandler}>{String(screenName)}</ButtonCustom>
    </View>
  )
}

export default Menu
