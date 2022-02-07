import React, {useEffect, useState} from 'react'

const useNotFirstEffect = (cb: React.EffectCallback, deps: React.DependencyList) => {
  const [isFirstLoad, setIsFirstLoad] = useState(false)
  useEffect(() => {
    if (!isFirstLoad) {
      setIsFirstLoad(true)
      return
    }
    cb()
  }, deps)
}

export default useNotFirstEffect
