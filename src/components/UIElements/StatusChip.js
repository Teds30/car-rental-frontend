import React from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'

import styles from './StatusChip.module.css'

const StatusChip = (props) => {
    const { text, type, icon } = props

    let iconComponent
    if (!icon) {
        if (type === 'completed') iconComponent = <CheckCircleIcon />
        if (type === 'canceled') iconComponent = <CancelIcon />
        if (type === 'rejected') iconComponent = <ThumbDownAltIcon />
        if (type === 'active') iconComponent = <ToggleOnIcon />
    }

    return (
        <div className={`${styles['status']} ${styles[type]}`}>
            <span className={styles['icon']}>{iconComponent}</span>
            {text}
        </div>
    )
}

export default StatusChip
