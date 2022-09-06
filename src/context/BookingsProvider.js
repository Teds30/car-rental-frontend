import React, { useReducer, useEffect, useCallback } from 'react'

import useBooking from '../hooks/bookings-hook'
import BookingContext from './BookingContext'

const BookingsReducer = (state, action) => {
    if (action.type === 'FILL') {
        return action.data
    }
}

const BookingsProvider = ({ children }) => {
    const { fetchBookings } = useBooking()

    const [bookings, dispatch] = useReducer(BookingsReducer, [])

    const fetchData = useCallback(async () => {
        try {
            const response = await fetchBookings()

            dispatch({ type: 'FILL', data: response })

        } catch (err) {
            throw err
        }
    }, [fetchBookings])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // console.log(bookings)
    const ctx = {
        bookings: bookings,
        fetchData,
    }

    return (
        <BookingContext.Provider value={ctx}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingsProvider
