import React from 'react'

import styles from './SideBar.module.css'

import { HiHome } from 'react-icons/hi'
import { IoCarSportSharp } from 'react-icons/io5'
import { BsCalendarWeek } from 'react-icons/bs'

import { FaStore } from 'react-icons/fa'

import NavLink from './NavLink'

const SideBar = (props) => {
    const { selectedLink } = props

    const selectLink = (index) => {
        props.onSelectLink(index)
    }

    return (
        <React.Fragment>
            <div className={styles['sidebar']}>
                <section></section>
                <section className={styles['nav__container']}>
                    <h6>GENERAL</h6>
                    <div className={styles['links__container']}>
                        <NavLink
                            navIndex={1}
                            selectedLink={selectedLink}
                            onSelectLink={selectLink}
                            icon={<HiHome />}
                            title="Overview"
                            toLink="overview"
                        />
                        <NavLink
                            navIndex={2}
                            selectedLink={selectedLink}
                            onSelectLink={selectLink}
                            icon={<IoCarSportSharp />}
                            title="Cars"
                            toLink="cars"
                        />
                        <NavLink
                            navIndex={3}
                            selectedLink={selectedLink}
                            onSelectLink={selectLink}
                            icon={<FaStore />}
                            title="Centers"
                            toLink="centers"
                        />
                    </div>
                </section>
                <section className={styles['nav__container']}>
                    <h6>MANAGEMENT</h6>
                    <div className={styles['links__container']}>
                        <NavLink
                            navIndex={4}
                            selectedLink={selectedLink}
                            onSelectLink={selectLink}
                            icon={<IoCarSportSharp />}
                            title="Cars List"
                            toLink="manage_cars"
                        />
                        <NavLink
                            navIndex={5}
                            selectedLink={selectedLink}
                            onSelectLink={selectLink}
                            icon={<BsCalendarWeek />}
                            title="Bookings"
                            toLink="bookings"
                        />
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default SideBar
