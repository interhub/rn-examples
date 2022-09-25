import React, {useEffect, useRef, useState} from 'react'
import {Button, FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native'
import {head, random} from 'lodash'

import FlatListTwoSideLoad from '../lib/FlatListTwoSideLoad'
import LoadingFullScreen from '../../StoriesSlider/components/LoadingFullScreen'

type ItemPropsList = {title: string; id: string}

const getRandomId = () => String(random(0, 100000))
const getRandomItem = () => {
  const id = getRandomId()
  return {id: id, title: `item with id: ${id}`}
}
const pageSize = 8
const getPageItemsPack = () => {
  return new Array(pageSize).fill(1).map(getRandomItem)
}

const getHeadDataId = (dataState: {id: string}[]) => head(dataState)?.id || ''

const wait = async (time: number = 1000) => await new Promise((ok) => setTimeout(ok, time))

const getDataArr = async () => {
  await wait(1000)
  return getPageItemsPack()
}

const FlatListScreen = () => {
  const [dataState, setDataState] = useState<ItemPropsList[]>([])
  const [loadingInitArr, setLoadingInitArr] = useState(true)
  const [loadingReload, setLoadingReload] = useState(false)

  const listRef = useRef<FlatList>(null)

  const onLoadStart = async () => {
    await wait(300)
    console.log('load start')
    setDataState((d) => {
      return getPageItemsPack().concat(d)
    })
  }
  const onLoadEnd = async () => {
    await wait(300)
    console.log('load end')
    setDataState((d) => {
      return d.concat(getPageItemsPack())
    })
  }

  const [initItemId, setInitItemId] = useState('')

  const scrollToId = (id?: string) => {
    const index = dataState.findIndex((d) => d.id === id)
    if (index >= 0 && id) {
      listRef.current?.scrollToIndex({index, animated: true})
    }
  }
  const scrollToInit = () => {
    scrollToId(initItemId)
  }
  const reloadToOtherPage = async () => {
    setLoadingReload(true)
    const newArr = await getDataArr()
    setDataState(newArr)
    setInitItemId(getHeadDataId(newArr))
    setLoadingReload(false)
  }

  //init loading data
  useEffect(() => {
    ;(async () => {
      setLoadingInitArr(true)
      const initArr = await getDataArr()
      console.log('init set arr')
      setDataState(initArr)
      setInitItemId(getHeadDataId(initArr))
      setLoadingInitArr(false)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <FlatListTwoSideLoad
        loadingInitArr={loadingInitArr}
        initItemId={initItemId}
        ref={listRef}
        style={{}}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        data={dataState}
        renderItem={(({item}) => <Item title={item.title} isFirst={item.id === initItemId} />) as ListRenderItem<ItemPropsList>}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button title={'scroll to init'} onPress={scrollToInit} />
        <Button title={'reload To Other Page'} onPress={reloadToOtherPage} />
        <View>{loadingReload && <LoadingFullScreen />}</View>
      </View>
      {loadingInitArr && <LoadingFullScreen />}
    </View>
  )
}

const Item = ({title, isFirst}: {title: string; isFirst: boolean}) => (
  <View style={[styles.item, isFirst && {backgroundColor: 'green'}]}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21caf3',
    paddingBottom: 30,
  },
  item: {
    backgroundColor: '#1e0079',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    height: 100,
    color: '#fff',
  },
})

export default FlatListScreen
