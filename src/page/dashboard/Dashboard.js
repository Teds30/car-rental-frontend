import React, { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

// import StyledEngineProvider from '@mui/material/StyledEngineProvider'
// import '../../GlobalCss.css'

import SideBar from '../../components/Navigation/SideBar/SideBar'
import TopNav from '../../components/Navigation/TopNav/TopNav'

import NotifyProvider from '../../components/UIElements/Feedback/NotifyProvider'

import styles from './Dashboard.module.css'

const Dashboard = () => {
    const location = useLocation()

    const [link, setLink] = useState(0)

    const pageUrl = location.pathname.split('/').pop()
    // console.log(pageUrl)

    useEffect(() => {
        if (pageUrl === 'overview') {
            setLink(1)
        }
        if (pageUrl === 'cars') {
            setLink(2)
        }
        if (pageUrl === 'centers') {
            setLink(3)
        }
        if (pageUrl === 'manage_cars') {
            setLink(4)
        }
        if (pageUrl === 'bookings') {
            setLink(5)
        }
    }, [pageUrl])

    const selectLinkHandler = (index) => {
        if (index !== link) setLink(index)
    }

    return (
        <NotifyProvider>
            <div className={styles['container1']}>
                <section className={styles.SideBar}>
                    <SideBar
                        onSelectLink={selectLinkHandler}
                        selectedLink={link}
                    />
                </section>

                <div className={styles['container2']}>
                    <section className={styles.topNav}>
                        <TopNav />
                    </section>
                    <section className={styles['content']}>
                        <Outlet />
                    </section>
                </div>
            </div>
        </NotifyProvider>
    )
}

export default Dashboard
