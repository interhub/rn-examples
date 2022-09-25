import React, {RefObject} from 'react'
import {FlatList, ListRenderItem, StyleProp, ViewabilityConfigCallbackPair, ViewStyle} from 'react-native'
import {head, throttle, uniq} from 'lodash'

// import {FlatList} from '@stream-io/flat-list-mvcp'

const loadDistanceDefault = 1500

const wait = async (time: number = 1000) => await new Promise((ok) => setTimeout(ok, time))

type FlatListTwoSideLoadProps = {
  style?: StyleProp<ViewStyle>
  loadDistance?: number
  onLoadStart: () => Promise<{id: string}[]>
  onLoadEnd: () => Promise<{id: string}[]>
  renderItem: ListRenderItem<any>
  loadingInitArr: boolean
  onLoadData: () => Promise<{id: string}[]>
  onMountData: (arg: {data: {id: string}[]; mainItemId: string}) => void
  onReadIds: (ids: string[]) => void
}

type FlatListTwoSideLoadState = {
  isLoaded: boolean
  dataState: {id: string}[]
  mainItemId: string
}

class FlatListTwoSideLoad extends React.Component<FlatListTwoSideLoadProps, FlatListTwoSideLoadState> {
  constructor(props: FlatListTwoSideLoadProps) {
    super(props)
    this.listRef = React.createRef<FlatList>()
  }

  state = {
    isLoaded: false,
    dataState: [] as FlatListTwoSideLoadState['dataState'],
    mainItemId: '',
  }

  private addPartToStart = (part: {id: string}[]) => {
    const newArr = part.concat(this.state.dataState)
    this.setState({dataState: newArr})
  }
  private addPartToEnd = (part: {id: string}[]) => {
    const newArr = this.state.dataState.concat(part)
    this.setState({dataState: newArr})
  }

  private onLoadStart = getThrottleFn(async () => {
    const partStart = await PromiseStack.call(this.props.onLoadStart)
    this.addPartToStart(partStart)
    return partStart
  })

  private onLoadEnd = getThrottleFn(async () => {
    const partEnd = await PromiseStack.call(this.props.onLoadEnd)
    this.addPartToEnd(partEnd)
    return partEnd
  })

  loadDistance = this.props.loadDistance || loadDistanceDefault
  listRef: React.RefObject<FlatList> | undefined = undefined

  public scrollToId = (id?: string) => {
    const firstIndex = this.state.dataState.findIndex((i) => i.id === id)
    if (firstIndex >= 0) {
      this.listRef?.current?.scrollToIndex({animated: true, index: firstIndex, viewPosition: 0.5})
    }
  }
  public scrollToOffset = (y: number) => {
    this.listRef?.current?.scrollToOffset({offset: y, animated: true})
  }

  public scrollToInit() {
    this.scrollToId(this.state.mainItemId)
  }

  private afterReloadLoadMoreAndAnimate = async () => {
    this.onLoadStart()
    this.onLoadEnd()
    this.setState({isLoaded: true})
    //set up parent state
    this.props.onMountData({data: this.state.dataState, mainItemId: this.state.mainItemId})
    this.scrollToId(this.state.mainItemId)
  }

  componentWillUnmount() {
    PromiseStack.clear()
  }

  public async updateGetData() {
    const data = await this.props.onLoadData()
    const mainItemId = getHeadDataId(data)
    this.setState({dataState: data, mainItemId})
    this.afterReloadLoadMoreAndAnimate()
  }

  async componentDidMount() {
    this.updateGetData()
  }

  private readIds: string[] = []
  private notifyRead = getThrottleFn(
    () => {
      this.props.onReadIds(this.readIds)
    },
    1000,
    true,
  )
  private viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPair[] = [
    {
      viewabilityConfig: {
        minimumViewTime: 100,
        itemVisiblePercentThreshold: 30,
      },
      onViewableItemsChanged: (data) => {
        const visibleIds: string[] = data.viewableItems.map(({item}: {item: {id?: string}}) => item?.id).filter((v): v is string => Boolean(v))
        const newReadedArr = uniq(this.readIds.concat(visibleIds))
        this.readIds = newReadedArr
        this.notifyRead()
      },
    },
  ]

  render() {
    return (
      <FlatList
        viewabilityConfigCallbackPairs={this.viewabilityConfigCallbackPairs}
        inverted
        initialNumToRender={20}
        ref={this.listRef}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onScrollToIndexFailed={getOnScrollToIndexFailed(this.listRef)}
        style={[{opacity: this.state.isLoaded ? 1 : 0, flex: 1}, this.props.style]}
        onScroll={(data) => {
          const nativeEvent = data.nativeEvent
          const scrollY = nativeEvent.contentOffset.y
          const listH = nativeEvent.layoutMeasurement.height
          const contentH = nativeEvent.contentSize.height
          const distanceToEnd = contentH - listH - scrollY
          if (scrollY < this.loadDistance) {
            this.onLoadStart()
          }
          if (distanceToEnd < this.loadDistance) {
            this.onLoadEnd()
          }
        }}
        data={this.state.dataState}
        renderItem={this.props.renderItem as any}
        keyExtractor={(item: {id: string}) => String(item.id)}
      />
    )
  }
}

const getThrottleFn = (fn: () => void, wait: number = 1000, trailing: boolean = false) => {
  return throttle(fn, wait, {leading: true, trailing: trailing})
}
const getHeadDataId = (dataState: {id: string}[]) => head(dataState)?.id || ''

const PromiseStack = {
  call: async (fn: () => Promise<{id: string}[]>): Promise<{id: string}[]> => {
    return await new Promise((ok) => {
      const index = PromiseStack.stack.length
      PromiseStack.stack.push({fn, index, finish: ok})
      PromiseStack.run()
    })
  },
  isProcess: false,
  run: () => {
    if (PromiseStack.isProcess) {
      return
    }
    PromiseStack.isProcess = true
    const first = head(PromiseStack.stack)
    const firstFn = first?.fn
    const firstFinish = first?.finish
    if (!firstFn || !firstFinish) {
      PromiseStack.isProcess = false
      return
    }
    firstFn().then((data) => {
      firstFinish(data)
      PromiseStack.stack = PromiseStack.stack.slice(1)
      PromiseStack.isProcess = false
      PromiseStack.run()
    })
  },
  stack: [] as {fn: () => Promise<{id: string}[]>; index: number; finish: (d: {id: string}[]) => void}[],
  clear: () => {
    PromiseStack.stack = []
    PromiseStack.isProcess = false
  },
}

export const getOnScrollToIndexFailed = (flatListRef: RefObject<FlatList<any>> | undefined) => {
  return (error: any) => {
    flatListRef?.current?.scrollToOffset({
      offset: error.averageItemLength * error.index,
      animated: true,
    })
    let times = 0
    setTimeout(() => {
      if (times > 10) {
        return
      }
      if (flatListRef?.current !== null) {
        flatListRef?.current?.scrollToIndex({
          index: error.index,
          animated: true,
          viewOffset: 215,
        })
      }
      times++
    }, 100)
  }
}

export default FlatListTwoSideLoad
