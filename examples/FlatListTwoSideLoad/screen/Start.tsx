import React, {useEffect, useRef, useState} from 'react'
import {Button, ListRenderItem, StyleSheet, Text, View} from 'react-native'
import {head, random} from 'lodash'
import faker from 'faker'

import FlatListTwoSideLoad from '../lib/FlatListTwoSideLoad'
import LoadingFullScreen from '../../StoriesSlider/components/LoadingFullScreen'

type ItemPropsList = {title: string; id: string}

const getRandomId = () => String(random(0, 100000))
const getRandomText = () => faker.lorem.words(random(5, 100))
const getRandomItem = () => {
  const id = getRandomId()
  return {id: id, title: `item with id: ${id}. \n Text: ${getRandomText()}`}
}
const pageSize = 8
const getPageItemsPack = () => {
  return new Array(pageSize).fill(1).map(getRandomItem)
}

const wait = async (time: number = 1000) => await new Promise((ok) => setTimeout(ok, time))

const getDataArr = async () => {
  await wait(1000)
  return getPageItemsPack()
}

const FlatListScreen = () => {
  const [dataState, setDataState] = useState<ItemPropsList[]>([])
  const [mainItemId, setMainItemId] = useState<string>('')
  const [loadingInitArr, setLoadingInitArr] = useState(true)
  const [loadingReload, setLoadingReload] = useState(false)

  const listRef = useRef<FlatListTwoSideLoad>(null)

  const onLoadStart = async () => {
    await wait(300)
    return getPageItemsPack()
  }
  const onLoadEnd = async () => {
    await wait(300)
    return getPageItemsPack()
  }

  const scrollToId = (id?: string) => {
    listRef.current?.scrollToId(id)
  }

  const scrollToInit = () => {
    listRef.current?.scrollToInit()
  }

  const reloadToOtherPage = async () => {
    setLoadingReload(true)
    await listRef.current?.updateGetData()
    setLoadingReload(false)
  }

  const onMountData = ({data, mainItemId}: {data: ItemPropsList[]; mainItemId: string}) => {
    setMainItemId(mainItemId)
    setDataState(data)
    setLoadingInitArr(false)
  }

  const getDataArrPack = async () => {
    return await getDataArr()
  }

  const [readIds, setReadIds] = useState<string[]>([])
  const onReadIds = (ids: string[], currentShow: string[]) => {
    setReadIds(ids)
  }

  return (
    <View style={styles.container}>
      <FlatListTwoSideLoad
        loadingInitArr={loadingInitArr}
        ref={listRef}
        style={{}}
        onMountData={onMountData as any}
        onLoadData={getDataArrPack}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onReadIds={onReadIds}
        renderItem={
          (({item}) => (
            <Item title={item.title} isRead={readIds.includes(item.id)} isFirst={item.id === mainItemId} />
          )) as ListRenderItem<ItemPropsList>
        }
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

const Item = ({title, isFirst, isRead}: {title: string; isFirst: boolean; isRead: boolean}) => {
  return (
    <View style={[styles.item, isFirst && {backgroundColor: 'green'}, isRead && {backgroundColor: '#28459e'}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

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
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
})

export default FlatListScreen

//TODO
// create wrapper list controller provider with scroll methods and loading states
// create page controller into wrapper and connect with api by props
