import { useCallback, useState } from 'react'
import useHttp from './http-hook'

const useBooking = () => {
    const { sendRequest, isLoading } = useHttp()
    const [action, setAction] = useState({ type: '' })

    const setBookingStatus = useCallback(
        async (id, status) => {
            setAction({ type: status })
            try {
                await sendRequest({
                    url: `http://localhost:5000/api/bookings/${id}`,
                    method: 'PATCH',
                    body: JSON.stringify({
                        status: status,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                throw err
            }
            setAction({ type: status })
        },
        [sendRequest]
    )

    const fetchBookings = useCallback(
        async (status) => {
            try {
                let response
                if (status) {
                    response = await sendRequest({
                        url: `http://localhost:5000/api/bookings/status/${status}`,
                    })
                    return response
                }

                response = await sendRequest({
                    url: `http://localhost:5000/api/bookings/`,
                })
                return response
            } catch (err) {
                console.log(err)
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
