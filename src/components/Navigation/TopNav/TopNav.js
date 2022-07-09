import React, { useContext } from 'react'

import { ThemeContext } from '../../../context/ThemeContext'

import styles from './TopNav.module.css'

const TopNav = () => {
    const themeCtx = useContext(ThemeContext)

    const changeTheme = () => {
        themeCtx.themeToggler()
    }

    return (
        <div className={styles['topnav']}>
            <div className={styles['col']}>
                <button onClick={changeTheme}>Change Theme</button>
                <p>Profile</p>
            </div>
        </div>
    )
}

export default TopNav
