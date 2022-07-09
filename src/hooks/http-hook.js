import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    //eslint-disable-next-line
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(
        async ({ url, method = 'GET', body = null, headers = {} }) => {
            setIsLoading(true)
            const httpAbortCtrl = new AbortController()
            activeHttpRequests.current.push(httpAbortCtrl)
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                })

                const data = await response.json()

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                )

                if (!response.ok) {
                    // throw new Error(response.message)
                    // console.log('error messag: ', response)
                    throw new Error(data.message)
                }

                setIsLoading(false)
                return data
            } catch (err) {
                setError(err.message)
                setIsLoading(false)
                throw err
            }
        },
        []
    )

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
        }
    }, [])

    return {
        sendRequest,
        isLoading,
        clearError,
    }
}

export default useHttp
