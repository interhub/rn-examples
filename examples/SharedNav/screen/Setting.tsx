import React, {useRef, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'
import FastImage from 'react-native-fast-image'
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler'
import {useSharedValue} from 'react-native-reanimated'

import Header, {HEADER_HEIGHT} from '../components/Header'
import SIZE from '../../../src/config/SIZE'
import IS_IOS from '../../../src/config/IS_IOS'
import ScreenBackGestureScrollControllerIOS from '../components/ScreenBackGestureScrollControllerIOS'

const ItemDetail = () => {
  const [enableHandler, setEnabledHandler] = useState(true)

  return (
    <View style={styles.container}>
      <Header />
      {/*<ScrollView ref={scrollRef} waitFor={enable ? ref : scrollRef} scrollEventThrottle={1} onScroll={_onScroll}>*/}
      {/*  <PanGestureHandler enabled={enable} ref={ref} activeOffsetY={5} failOffsetY={-6} onGestureEvent={_onScrollDown}>*/}
      {/*    <View style={{height: 1500, backgroundColor: 'yellow', width: 300}} />*/}
      {/*  </PanGestureHandler>*/}
      {/*</ScrollView>*/}

      <SharedElement id={'card'} style={{...StyleSheet.absoluteFillObject, zIndex: -1, top: HEADER_HEIGHT}}>
        <View style={styles.cardFill} />
      </SharedElement>

      <ScreenBackGestureScrollControllerIOS disableX isFlex>
        <View style={{width: SIZE.width, alignItems: 'center'}}>
          <SharedElement id="text">
            <Text style={styles.text}>SHARED ELEMENT PAGE</Text>
          </SharedElement>
          <View style={styles.imgBox}>
            <SharedElement id="image">
              <FastImage style={styles.image} resizeMode="cover" source={require('../img/bg.jpg')} />
            </SharedElement>
          </View>
        </View>
        <Text style={{padding: 20}}>{textContent}</Text>
      </ScreenBackGestureScrollControllerIOS>
    </View>
  )
}

const textContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. \n Accusantium adipisci aliquam aperiam autem consectetur culpa dicta dolorem in
              ipsam, ipsum modi mollitia nam \n necessitatibus non odio recusandae \n repudiandae rerum sapiente. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. \n Accusantium adipisci aliquam \n aperiam autem consectetur culpa dicta dolorem in ipsam, ipsum modi mollitia nam
              necessitatibus non odio recusandae repudiandae rerum sapiente. Lorem\n  ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
              adipisci aliquam aperiam \n autem consectetur \n culpa dicta dolorem in ipsam, ipsum modi mollitia nam necessitatibus non odio recusandae
              repudiandae rerum sapiente. \n Lorem ipsum dolor sit \n amet, \n consectetur adipisicing elit. Accusantium adipisci aliquam aperiam autem
              consectetur culpa dicta dolorem \n in ipsam, ipsum modi mollitia nam necessitatibus non odio recusandae repudiandae rerum sapiente. Lorem
              ipsum dolor sit amet, consectetur \n adipisicing elit. Accusantium\n  adipisci aliquam aperiam autem consectetur culpa dicta dolorem in ipsam,
              ipsum modi mollitia nam necessitatibus non odio recusandae repudiandae \n rerum sapiente.`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {fontSize: 30, color: '#FFF', fontWeight: 'bold', marginVertical: 50},
  imgBox: {
    width: '100%',
    height: 400,
  },
  cardFill: {
    flex: 1,
    backgroundColor: '#3d6d5c',
  },
})

export default ItemDetail
