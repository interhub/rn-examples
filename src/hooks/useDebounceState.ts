import _ from 'lodash'
import {useRef, useState} from 'react'

const useDebounceState = <T extends any>(initialState: T, wait: number): [T, (search: T) => void] => {
  const getDebounceFunc = (callback: () => void): ReturnType<typeof _.debounce> => {
    return _.debounce(callback, wait, {maxWait: wait})
  }

  const debounceRef = useRef(getDebounceFunc(() => {}))

  const [state, setState] = useState<T>(initialState)

  const handleDebounce: (search: T) => void = (search: T) => {
    debounceRef?.current?.cancel()
    const newDebounceFunc = getDebounceFunc(() => setState(search))
    debounceRef.current = newDebounceFunc
    if (debounceRef.current) {
      debounceRef.current()
    }
  }

  return [state, handleDebounce]
}

export default useDebounceState
