import React, { useContext } from 'react'

import { ThemeContext } from '../../../context/ThemeContext'
import { AuthContext } from '../../../context/AuthContext'

import styles from './TopNav.module.css'

const TopNav = () => {
    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const changeTheme = () => {
        themeCtx.themeToggler()
    }
    const logout = () => {
        authCtx.logout()
    }

    return (
        <div className={styles['topnav']}>
            <div className={styles['col']}>
                <button onClick={changeTheme}>Change Theme</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default TopNav
