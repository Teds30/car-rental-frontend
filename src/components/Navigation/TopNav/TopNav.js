import React, { useContext } from 'react'

import { ThemeContext } from '../../../context/ThemeContext'
import { AuthContext } from '../../../context/AuthContext'

import BorderlessButton from '../../UIElements/Button/BorderlessButton'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

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
                <button onClick={changeTheme} className={styles['action']}>
                    {themeCtx.theme === 'light' ? (
                        <BsFillSunFill className={styles['sun']} />
                    ) : (
                        <BsFillMoonFill className={styles['moon']} />
                    )}
                </button>
                <BorderlessButton btnType="danger" onClick={logout}>
                    Logout
                </BorderlessButton>
            </div>
        </div>
    )
}

export default TopNav
