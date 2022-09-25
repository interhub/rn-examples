import React from 'react'
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native'
import {head, throttle} from 'lodash'

// import {FlatList} from '@stream-io/flat-list-mvcp'

const loadDistanceDefault = 500

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

  public scrollToInit() {
    this.scrollToId(this.state.mainItemId)
  }

  private afterReloadLoadMoreAndAnimate = async () => {
    await this.onLoadStart()
    await this.onLoadEnd()
    await wait(100)
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

  render() {
    return (
      <FlatList
        initialNumToRender={20}
        ref={this.listRef}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
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

const getThrottleFn = (fn: () => void, wait: number = 1000) => {
  return throttle(fn, wait, {leading: true, trailing: false})
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

export default FlatListTwoSideLoad
