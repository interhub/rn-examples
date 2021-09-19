import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useNavigation, useRoute} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {SCREEN_NAME_TABS} from '../constants/SCREEN_NAME_TABS'
import Start from '../screen/Start'
import ItemDetail from '../screen/ItemDetail'
import Setting from '../screen/Setting'
import AnimateIcon from '../components/AnimateIcon'

const Tab = createBottomTabNavigator()

const TAB_PADDING = 15

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME_TABS.START_LIST}
      sceneContainerStyle={{backgroundColor: '#444'}}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      lazy={true}
      tabBarOptions={{
        keyboardHidesTabBar: false,
        tabStyle: styles.tabStyle,
      }}>
      <Tab.Screen name={SCREEN_NAME_TABS.START_LIST} component={Start} />
      <Tab.Screen name={SCREEN_NAME_TABS.ITEM_DETAIL} component={ItemDetail} />
      <Tab.Screen name={SCREEN_NAME_TABS.SETTING} component={Setting} />
    </Tab.Navigator>
  )
}

const TAB_INFO = [
  {source: require('../img/icon/1.png'), key: 0, screen: SCREEN_NAME_TABS.START_LIST},
  {source: require('../img/icon/2.png'), key: 1, screen: SCREEN_NAME_TABS.ITEM_DETAIL},
  {source: require('../img/icon/3.png'), key: 2, screen: SCREEN_NAME_TABS.SETTING},
]

const BottomTabBar = ({state, tabStyle}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets()
  const paddingBottom = bottom / 2 + TAB_PADDING
  return (
    <View style={[tabStyle, {paddingBottom}]}>
      <TabItem info={TAB_INFO[0]} state={state} />
      <TabItem info={TAB_INFO[1]} state={state} />
      <TabItem info={TAB_INFO[2]} state={state} />
    </View>
  )
}

interface TabItemProps {
  state: BottomTabBarProps['state']
  info: typeof TAB_INFO[0]
}

const TabItem = (props: TabItemProps) => {
  const {onTabPress, isFocused} = useOnPressTabByIndex(props)
  const ICON_COLOR = isFocused ? '#fffd0a' : '#004605'

  return (
    <TouchableOpacity onPress={onTabPress}>
      <AnimateIcon size={25} active={isFocused} color={ICON_COLOR} source={props.info.source} />
    </TouchableOpacity>
  )
}

const useOnPressTabByIndex = (props: TabItemProps) => {
  const {info, state} = props
  const isFocused = state.index === info.key
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route.name, 'name')
  const onTabPress = () => {
    navigation.navigate(props.info.screen)
  }
  return {onTabPress, isFocused}
}

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'row',
    backgroundColor: '#218d49',
    justifyContent: 'space-around',
    paddingTop: TAB_PADDING,
  },
})

export default TabsNavigator
