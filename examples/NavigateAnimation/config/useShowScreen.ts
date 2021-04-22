import {useIsFocused} from '@react-navigation/native'
import {useEffect} from 'react'

const useShowScreen = (effect: (show: boolean) => void) => {
    const isFocused = useIsFocused()
    useEffect(() => {
        if (effect)
            effect(isFocused)
    }, [isFocused])
}

export default useShowScreen
