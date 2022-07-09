import React, { useContext } from 'react'

import useBooking from '../../hooks/bookings-hook'
import BookingContext from '../../context/BookingContext'

import useNotistack from '../../hooks/notistack-hook'

import PrimaryButton from '../UIElements/Button/PrimaryButton'
import OutlinedButton from '../UIElements/Button/OutlinedButton'
// eslint-disable-next-line
import BorderlessButton from '../UIElements/Button/BorderlessButton'

// import LoadingSpinner from '../UIElements/LoadingSpinner'

import styles from './BookingActions.module.css'

const BookingActions = (props) => {
    const { booking, handleChangeStatus } = props
    const bookingCtx = useContext(BookingContext)
    const { notify } = useNotistack()
    const { setBookingStatus, isLoading, action } = useBooking()

    const handleApprove = async () => {
        try {
            await setBookingStatus(booking._id, 'active')
            notify('Booking Approved!', 'success')
            bookingCtx.fetchData()
            handleChangeStatus({ ...booking, status: 'active' })
        } catch (err) {
            // console.log(err.message)
            notify(err.message, 'error')
        }
    }
    const handleReject = async () => {
        try {
            await setBookingStatus(booking._id, 'rejected')
            notify('Booking Rejected.', 'success')
            bookingCtx.fetchData()
            handleChangeStatus({ ...booking, status: 'rejected' })
        } catch (err) {
            // console.log(err.message)
            notify(err.message, 'error')
        }
    }

    const handleComplete = async () => {
        try {
            await setBookingStatus(booking._id, 'completed')
            notify('Booking Completed!', 'success')
            bookingCtx.fetchData()
            handleChangeStatus({ ...booking, status: 'completed' })
        } catch (err) {
            // console.log(err.message)
            notify(err.message, 'error')
        }
    }

    let actions

    if (booking.status === 'pending') {
        actions = (
            <div className={styles['actions']}>
                <PrimaryButton
                    onClick={handleApprove}
                    isLoading={isLoading && action.type === 'active'}
                    disabled={isLoading && action.type === 'active'}
                    loadingText={'Approving'}
                >
                    Approve
                </PrimaryButton>
                <OutlinedButton
                    onClick={handleReject}
                    isLoading={isLoading && action.type === 'rejected'}
                    disabled={isLoading && action.type === 'rejected'}
                    loadingText={'Rejecting'}
                >
                    Reject
                </OutlinedButton>
            </div>
        )
    }

    if (booking.status === 'active') {
        actions = (
            <div className={styles['actions']}>
                <BorderlessButton
                    onClick={handleComplete}
                    isLoading={isLoading}
                    disabled={isLoading}
                    loadingText={'Completing'}
                >
                    Mark as Completed
                </BorderlessButton>
            </div>
        )
    }

    if (
        booking.status === 'completed' ||
        booking.status === 'canceled' ||
        booking.status === 'rejected'
    ) {
        return <></>
    }

    return (
        <div className={styles['actions__container']}>
            <div>
                <h6>Actions</h6>
            </div>
            {actions}
        </div>
    )
}

export default BookingActions
