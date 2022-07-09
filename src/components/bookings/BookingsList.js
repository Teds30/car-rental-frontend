import React, { useContext, useState, useEffect, useCallback } from 'react'

import BookingContext from '../../context/BookingContext'
import BorderlessButton from '../UIElements/Button/BorderlessButton'

import RefreshIcon from '@mui/icons-material/Refresh'

import Booking from './Booking'

import styles from './BookingsList.module.css'

const BookingsList = (props) => {
    const { onOpenDrawer, status = null } = props
    const bookingCtx = useContext(BookingContext)

    let loadedBookings = bookingCtx.bookings

    const [bookings, setBookings] = useState([])

    const fetcch = useCallback(() => {
        if (status) {
            let filteredbookings =
                loadedBookings.filter((booking) => booking.status === status) ||
                []
            setBookings(filteredbookings)
        } else {
            setBookings(loadedBookings)
        }
    }, [setBookings, loadedBookings, status])

    useEffect(() => {
        fetcch()
    }, [fetcch])

    const bookingsComponent =
        bookings.map((booking) => (
            <Booking
                key={booking._id}
                booking={booking}
                onOpenDrawer={onOpenDrawer}
            />
        )) || null

    const handleRefresh = () => {
        bookingCtx.fetchData()
    }

    return (
        <React.Fragment>
            <div className={styles['actions']}>
                <BorderlessButton
                    onClick={handleRefresh}
                    leftIcon={<RefreshIcon />}
                >
                    Refresh
                </BorderlessButton>
            </div>
            <div className={styles['bookings_list']}>{bookingsComponent}</div>
        </React.Fragment>
    )
}

export default BookingsList
