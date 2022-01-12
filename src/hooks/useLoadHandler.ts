import {useState} from 'react'

const useLoadingHandler = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function handleLoad<T>(promise: Promise<T>): Promise<T> {
        setIsLoading(true)
        try {
            const res = await promise
            return res
        } finally {
            setIsLoading(false)
        }
    }

    return {isLoading, handleLoad}
}

export default useLoadingHandler
