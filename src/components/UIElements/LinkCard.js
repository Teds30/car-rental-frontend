import React from 'react'

import styles from './LinkCard.module.css'

const LinkCard = (props) => {
    const { onClick, btnTitle, link, icon, title, content } = props
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.col1}>
                <div className={styles['icon']}>{icon}</div>
                <h6>{title}</h6>
            </div>

            <p>{content}</p>

            <a href={link}>
                {btnTitle}
                <div>
                    <span>&#10140;</span>
                </div>
            </a>
        </div>
    )
}

export default LinkCard
