import React from 'react'
import Moment from 'react-moment'

import BookingActions from './BookingActions'

import { FaChevronRight } from 'react-icons/fa'

import styles from './DrawerContents.module.css'
import StatusChip from '../UIElements/StatusChip'

const DrawerContents = (props) => {
    const { drawerData, handleChangeStatus } = props

    const custName =
        drawerData.customer.first_name + ' ' + drawerData.customer.last_name

    const car = drawerData.car.brand + ' ' + drawerData.car.model

    return (
        <div className={styles['drawer_contents']}>
            <BookingActions
                booking={drawerData}
                handleChangeStatus={handleChangeStatus}
            />
            <div className={styles['contents__container']}>
                <div className={styles['']}>
                    <h5>Details</h5>
                </div>
                <div className={styles['contents']}>
                    <div className={styles['content']}>
                        <div className={styles['content__title']}>
                            <h6>ID</h6>
                        </div>
                        <div className={styles['content__data']}>
                            <p>{drawerData._id}</p>
                        </div>
                    </div>

                    <div className={styles['content']}>
                        <div className={styles['content__title']}>
                            <h6>Car</h6>
                        </div>
                        <div className={styles['content__data']}>
                            <p className={styles['car']}>{car}</p>
                        </div>
                    </div>
                    <div className={styles['content']}>
                        <div className={styles['content__title']}>
                            <h6>Customer</h6>
                        </div>
                        <div className={styles['content__data']}>
                            <p>{custName}</p>
                        </div>
                    </div>
                    <div className={styles['content']}>
                        <div className={styles['content__title']}>
                            <h6>Total Amount</h6>
                        </div>
                        <div className={styles['content__data']}>
                            <p>PHP {drawerData.total_amount}</p>
                        </div>
                    </div>

                    <div className={styles['content']}>
                        <div className={styles['content__title']}>
                            <h6>Status</h6>
                        </div>
                        <div className={styles['content__data']}>
                            <StatusChip
                                text={drawerData.status}
                                type={drawerData.status}
                            />
                        </div>
                    </div>
                    <div className={styles['content__date']}>
                        <div className={styles['date__container']}>
                            <p className="caption" style={{ fontWeight: 600 }}>
                                FROM
                            </p>
                            <div className={styles['content__title']}>
                                <h6>
                                    <Moment format="MMMM Do, YYYY">
                                        {drawerData.booking_dates.from}
                                    </Moment>
                                </h6>
                                <p className="caption">
                                    <Moment format="LT">
                                        {drawerData.booking_dates.from}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                        {/* <div className={styles['vertical_line']}></div> */}
                        <div className={styles['breaker']}>
                            <div className={styles['icon']}>
                                <FaChevronRight />
                            </div>
                        </div>
                        <div className={styles['date__container']}>
                            <p className="caption" style={{ fontWeight: 600 }}>
                                TO
                            </p>
                            <div className={styles['content__title']}>
                                <h6>
                                    <Moment format="MMMM Do, YYYY">
                                        {drawerData.booking_dates.to}
                                    </Moment>
                                </h6>
                                <p className="caption">
                                    <Moment format="LT">
                                        {drawerData.booking_dates.to}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawerContents
