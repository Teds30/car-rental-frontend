import { useCallback } from 'react'

import useHttp from './http-hook'

const useCarManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const addCar = useCallback(
        async (data) => {
            try {
                await sendRequest({
                    url: `http://localhost:5000/api/cars/`,
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        [sendRequest]
    )
    const deleteCar = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `http://localhost:5000/api/cars/${id}`,
                    method: 'DELETE',
                })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        [sendRequest]
    )

    const updateCar = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://localhost:5000/api/cars/${id}`,
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        [sendRequest]
    )

    const fetchCars = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://localhost:5000/api/cars/`,
            })
        } catch (err) {
            console.log(err)
            throw err
        }

        return responseData
    }, [sendRequest])

    const fetchCarsByType = useCallback(
        async (type) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://localhost:5000/api/cars/type/${type}`,
                })
            } catch (err) {
                console.log(err)
                throw err
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
