import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import * as faker from 'faker'
import {filter} from 'lodash'
import {FontAwesome, Foundation} from '@expo/vector-icons'

import TextInputCustom from '../../../components/TextInputCustom'
import TextLine from '../../../components/TextLine'
import layoutAnimation from '../../../src/config/layoutAnimation'
import useNotFirstEffect from '../../../src/hooks/useNotFirstEffect'
import useDebounceState from '../../../src/hooks/useDebounceState'

type MusicItemType = {
  name: string
  id: string
}
const MUSICS: MusicItemType[] = new Array(200).fill(1).map((_, key) => ({name: faker.music.genre(), id: String(key)}))

export default function () {
  const [listMusics, setListMusics] = useState<MusicItemType[]>(MUSICS)

  const [slowValue, setSlowValue] = useDebounceState('', 300)
  const [fastValue, setFastValue] = useState('')
  useEffect(() => {
    setSlowValue(fastValue)
  }, [fastValue])

  //filter hook
  useEffect(() => {
    const filteredMusics = filter(MUSICS, ({name}) => name.toLowerCase().includes(slowValue.toLowerCase()))
    setListMusics(filteredMusics)
  }, [slowValue])

  //layout animation hook
  useNotFirstEffect(() => {
    layoutAnimation.listMove()
  }, [slowValue])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInputCustom value={fastValue} showSendBtn onInput={setFastValue} leftIcon={<FontAwesome name="search" size={15} color={'#fff'} />} />
      </View>
      <FlatList<MusicItemType>
        keyboardDismissMode={'on-drag'}
        initialNumToRender={35}
        data={listMusics}
        keyExtractor={(item: MusicItemType) => String(item.id)}
        renderItem={({item: {name, id}, index}) => {
          return (
            <View style={styles.itemBox}>
              <TextLine>
                {id}. {name}
              </TextLine>
              <Foundation name="music" size={24} color="black" />
            </View>
          )
        }}
        contentContainerStyle={{paddingBottom: 50}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
  title: {
    textAlign: 'center',
    marginTop: 'auto',
    color: '#FFF',
    fontSize: 20,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d8d8d8',
  },
})
