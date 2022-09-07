import { useCallback, useContext, useState } from 'react'
import useHttp from './http-hook'

import { AuthContext } from '../context/AuthContext'

const useBooking = () => {
    const { sendRequest, isLoading } = useHttp()
    const [action, setAction] = useState({ type: '' })
    const authCtx = useContext(AuthContext)

    const setBookingStatus = useCallback(
        async (id, status) => {
            setAction({ type: status })
            try {
                await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + `/bookings/${id}`,
                    method: 'PATCH',
                    body: JSON.stringify({
                        status: status,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authCtx.token,
                    },
                })
            } catch (err) {
                throw err
            }
            setAction({ type: status })
        },
        [sendRequest, authCtx]
    )

    const fetchBookings = useCallback(
        async (status) => {
            try {
                let response
                if (status) {
                    response = await sendRequest({
                        url:
                            process.env.REACT_APP_BACKEND_URL +
                            `/bookings/status/${status}`,
                    })
                    return response
                }

                response = await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + `/bookings/`,
                })
                return response
            } catch (err) {
                throw err
            }
        },
        [sendRequest]
    )

    return {
        fetchBookings,
        setBookingStatus,
        isLoading,
        action,
    }
}

export default useBooking
