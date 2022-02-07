import {Animated} from 'react-native'
import {useLayoutEffect, useRef} from 'react'

/**
 * Since there's no (official) way to read an Animated.Value synchronously this is the best solution I could come up with
 * to have access to an up-to-date copy of the latest value without sacrificing performance.
 *
 * @param animatedValue the Animated.Value to track
 * @param initial Optional initial value if you know it to initialize the latest value ref before the animated value listener fires for the first time
 *
 * returns a ref with the latest value of the Animated.Value and a boolean ref indicating if a value has been received yet
 */
const useAnimatedLatestValueRef = (animatedValue: Animated.Value, initial?: number) => {
  //If we're given an initial value then we can pretend we've received a value from the listener already
  const latestValueRef = useRef(initial ?? 0)
  const initialized = useRef(typeof initial === 'number')

  useLayoutEffect(() => {
    const id = animatedValue.addListener((v) => {
      //Store the latest animated value
      latestValueRef.current = v.value
      //Indicate that we've recieved a value
      initialized.current = true
    })

    //Return a deregister function to clean up
    return () => animatedValue.removeListener(id)

    //Note that the behavior here isn't 100% correct if the animatedValue changes -- the returned ref
    //may refer to the previous animatedValue's latest value until the new listener returns a value
  }, [animatedValue])

  return [latestValueRef, initialized] as const
}
export default useAnimatedLatestValueRef
