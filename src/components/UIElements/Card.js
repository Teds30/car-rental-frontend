import React from 'react'

import styles from './Card.module.css'

const Card = (props) => {
    const hoverClass = props.hasHover ? styles['hasHover'] : styles['noHover']

    const borderClass = props.hasBorder ? styles['hasBorder'] : styles['']

    return (
        <div
            className={`${styles.card} ${hoverClass} ${borderClass}`}
            style={{ width: props.width }}
        >
            {props.children}
        </div>
    )
}

export default Card
