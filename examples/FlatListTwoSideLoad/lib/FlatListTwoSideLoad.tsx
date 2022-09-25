import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native'
import {throttle} from 'lodash'

const PromiseStack = {
  call: async (fn: () => Promise<void>) => {
    PromiseStack.stack.push(fn)
    PromiseStack.run()
  },
  isProcess: false,
  run: () => {
    if (PromiseStack.isProcess) return
    PromiseStack.isProcess = true
    const first = PromiseStack.stack[0]
    if (!first) {
      PromiseStack.isProcess = false
      return
    }
    first().then(() => {
      PromiseStack.stack = PromiseStack.stack.slice(1)
      PromiseStack.isProcess = false
      PromiseStack.run()
    })
  },
  stack: [] as (() => Promise<void>)[],
  clear: () => {
    PromiseStack.stack = []
    PromiseStack.isProcess = false
  },
}

export const useClearStackUnmount = () => {
  useEffect(() => {
    return () => {
      PromiseStack.clear()
    }
  }, [])
}

// import {FlatList} from 'react-native-bidirectional-infinite-scroll'
// import {FlatList} from '@stream-io/flat-list-mvcp'

type ItemPropsList = {title: string; id: number}

const loadDistanceDefault = 500

const wait = async (time: number = 1000) => await new Promise((ok) => setTimeout(ok, time))

type FlatListTwoSideLoadProps = {
  data: ({id: string} & any)[]
  style?: StyleProp<ViewStyle>
  loadDistance?: number
  onLoadStart?: () => Promise<void>
  onLoadEnd?: () => Promise<void>
  renderItem: ListRenderItem<any>
  initItemId?: string
  loadingInitArr: boolean
}

const FlatListTwoSideLoad = React.forwardRef<FlatList, FlatListTwoSideLoadProps>((props, forwardRef) => {
  useClearStackUnmount()
  const [dataState, setDataState] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const onLoadStart = useThrottleFn(() => {
    const run = async () => {
      if (props.onLoadStart) {
        await props.onLoadStart()
      }
    }
    PromiseStack.call(run)
  })
  const onLoadEnd = useThrottleFn(() => {
    const run = async () => {
      if (props.onLoadEnd) {
        await props.onLoadEnd()
      }
    }
    PromiseStack.call(run)
  })

  const ref = useRef<FlatList>(null)
  //@ts-ignore
  const listRef: MutableRefObject<FlatList> = forwardRef || ref

  const initLoad = async () => {
    await wait(10)
    //run scroll to load top and bottom init start
    onLoadStart()
    onLoadEnd()
    listRef.current?.scrollToOffset({offset: 10, animated: true})
    await wait(200)
    setIsLoaded(true)
    //run scroll to init item pos if it has diff bug
    setDataState((d) => {
      const firstIndex = d?.findIndex((i) => i.id === props.initItemId)
      if (firstIndex >= 0) {
        listRef.current?.scrollToIndex({animated: true, index: firstIndex})
      }
      return d
    })
  }

  useEffect(() => {
    setDataState(props.data)
  }, [props.data])

  useEffect(() => {
    if (props.loadingInitArr) return
    initLoad()
  }, [props.initItemId, props.loadingInitArr])

  const loadDistance = props.loadDistance || loadDistanceDefault

  return (
    <>
      <FlatList
        ref={listRef}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        style={[{opacity: isLoaded ? 1 : 0, flex: 1}, props.style]}
        onScroll={useCallback((data) => {
          const nativeEvent = data.nativeEvent
          const scrollY = nativeEvent.contentOffset.y
          const listH = nativeEvent.layoutMeasurement.height
          const contentH = nativeEvent.contentSize.height
          const distanceToEnd = contentH - listH - scrollY
          if (scrollY < loadDistance) {
            onLoadStart()
          }
          if (distanceToEnd < loadDistance) {
            onLoadEnd()
          }
        }, [])}
        data={dataState}
        renderItem={props.renderItem as any}
        keyExtractor={(item: {id: string}) => String(item.id)}
      />
    </>
  )
})

const getThrottleFn = (fn: () => void, wait: number = 1000) => {
  return throttle(fn, wait, {leading: true, trailing: false})
}
const useThrottleFn = (fn: () => void, wait?: number) => {
  return useCallback(getThrottleFn(fn, wait), [])
}

export default FlatListTwoSideLoad
