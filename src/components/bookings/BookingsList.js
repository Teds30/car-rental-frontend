import React, { useContext, useState, useEffect, useCallback } from 'react'

import BookingContext from '../../context/BookingContext'
import BorderlessButton from '../UIElements/Button/BorderlessButton'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import RefreshIcon from '@mui/icons-material/Refresh'

import Booking from './Booking'

import styles from './BookingsList.module.css'

const BookingsList = (props) => {
    const { onOpenDrawer, status = null } = props
    const bookingCtx = useContext(BookingContext)

    let loadedBookings = bookingCtx.bookings

    const [bookings, setBookings] = useState([])
    const [sortValue, setSortValue] = useState(0)

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

    let sortedbookings = bookings.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

    if (sortValue === 0) {
        sortedbookings.reverse()
    }

    const bookingsComponent =
        sortedbookings.map((booking) => (
            <Booking
                key={booking._id}
                booking={booking}
                onOpenDrawer={onOpenDrawer}
            />
        )) || null

    const handleRefresh = () => {
        bookingCtx.fetchData()
    }

    const handleSort = (e) => {
        setSortValue(e.target.value)
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
                <FormControl>
                    <InputLabel htmlFor="car-type-select">Sort</InputLabel>
                    <Select
                        label="Type"
                        id="car-type-select"
                        value={sortValue}
                        onChange={handleSort}
                    >
                        <MenuItem value={0}>Newest</MenuItem>
                        <MenuItem value={1}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles['bookings_list']}>{bookingsComponent}</div>
        </React.Fragment>
    )
}

export default BookingsList
