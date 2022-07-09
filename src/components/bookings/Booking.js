import React from 'react'
import Moment from 'react-moment'

import StatusChip from '../UIElements/StatusChip'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import styles from './Booking.module.css'

const Booking = (props) => {
    const { booking, onOpenDrawer } = props

    const openDrawer = () => {
        onOpenDrawer(booking)
    }

    return (
        <div className={styles['booking']} onClick={openDrawer}>
            <div>
                <h6>{booking._id}</h6>
                <div className={styles['time']}>
                    <span>
                        <AccessTimeIcon />
                    </span>
                    <span>
                        <Moment fromNow>{booking.createdAt}</Moment>
                    </span>
                </div>
            </div>
            <div>
                <StatusChip text={booking.status} type={booking.status} />
            </div>
        </div>
    )
}

export default Booking
