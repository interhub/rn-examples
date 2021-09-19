import {useEffect, useLayoutEffect, useState} from 'react'
import * as Linking from 'expo-linking'

/**
 * @hook use initial depp links hook
 * use into useEffect hook and handle open app screen in main app screen and
 * navigate somewhere or make custom action func
 */
const useHandleDeepLink = () => {
    const [deepUrl, setDeepUrl] = useState('')
    const removeLink = () => {
        setDeepUrl('')
    }
    const initDeepUrl = async () => {
        const initialUrl = await Linking.getInitialURL()
        if (!initialUrl) return
        // console.log('[getInitialURL] url', initialUrl)
        setDeepUrl(initialUrl)
    }
    useLayoutEffect(() => {
        Linking.addEventListener('url', ({url = ''}) => {
            // console.log('[addEventListener] url', url)
            if (!url) return
            setDeepUrl(url)
        })
        initDeepUrl()
    }, [])
    return {deepUrl, removeLink}
}

// useEffect(() => {
//     console.log(deepUrl, 'new deep url state')
//     if (deepUrl) {
//         /**
//          * usage action or navigate
//          */
//         console.log(deepUrl, 'usage deep links ✅ ')
//         removeLink()
//     }
// }, [deepUrl])


export default useHandleDeepLink
