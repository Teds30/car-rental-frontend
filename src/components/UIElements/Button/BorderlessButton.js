import React from 'react'

import LoadingSpinner from '../LoadingSpinner'

import styles from './BorderlessButton.module.css'

const BorderlessButton = (props) => {
    const {
        onClick,
        leftIcon,
        rightIcon,
        children,
        btnType,
        isLoading,
        loadingText,
        disabled = false,
    } = props

    if (!props) {
        return <button className={styles.btn}>{children}</button>
    }

    let btnTypeStyle = ''

    if (btnType === 'danger') {
        btnTypeStyle = styles['btn-danger']
    }

    return (
        <button
            className={`${styles.btn} ${btnTypeStyle}`}
            onClick={onClick}
            disabled={disabled}
        >
            {leftIcon && <div className={styles.icon}>{leftIcon}</div>}
            <span>{!isLoading && children}</span>

            {isLoading && loadingText}
            {isLoading && <LoadingSpinner width={12} color="primary" />}
            {rightIcon && <div className={styles.icon}>{rightIcon}</div>}
        </button>
    )
}

export default BorderlessButton
