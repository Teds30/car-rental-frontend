import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavLink.module.css'

const NavLink = (props) => {
    // const { path } = useRouteMatch()

    const { selectedLink, onSelectLink, navIndex, icon, toLink, title } = props

    const select = () => {
        if (navIndex !== selectedLink) {
            onSelectLink(navIndex)
        }
    }

    return (
        <Link
            className={styles['link__container']}
            to={toLink}
            active={styles.active}
        >
            <div
                className={`${styles.link} ${
                    selectedLink === navIndex ? styles.active : ''
                }`}
                onClick={select}
            >
                <div className={styles.icon}>{icon}</div>
                <span>{title}</span>
            </div>
        </Link>
    )
}

export default NavLink
