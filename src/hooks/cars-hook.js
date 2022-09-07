import { useCallback, useContext } from 'react'

import useHttp from './http-hook'
import { AuthContext } from '../context/AuthContext'

const useCarManager = () => {
    const { sendRequest, isLoading } = useHttp()
    const authCtx = useContext(AuthContext)

    const addCar = useCallback(
        async (data) => {
            try {
                await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + `/cars/`,
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authCtx.token,
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest, authCtx]
    )
    const deleteCar = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + `/cars/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authCtx.token,
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest, authCtx]
    )

    const updateCar = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + `/cars/${id}`,
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authCtx.token,
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest, authCtx]
    )

    const fetchCars = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: process.env.REACT_APP_BACKEND_URL + `/cars/`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchCarsByType = useCallback(
        async (type) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url:
                        process.env.REACT_APP_BACKEND_URL +
                        `/cars/type/${type}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    return {
        addCar,
        fetchCars,
        fetchCarsByType,
        updateCar,
        deleteCar,
        isLoading,
    }
}
export default useCarManager
