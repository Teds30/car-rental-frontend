import React from 'react'

import LoadingSpinner from '../LoadingSpinner'

import styles from './OutlinedButton.module.css'

const OutlinedButton = (props) => {
    const {
        onClick,
        leftIcon,
        rightIcon,
        children,
        isLoading,
        loadingText,
        disabled = false,
    } = props

    if (!props) {
        return <button className={styles.btn}>{children}</button>
    }

    return (
        <button className={styles.btn} onClick={onClick} disabled={disabled}>
            {leftIcon && <div className={styles.icon}>{leftIcon}</div>}
            <span>{!isLoading && children}</span>

            {isLoading && loadingText}
            {isLoading && <LoadingSpinner width={12} color="primary" />}
            {rightIcon && <div className={styles.icon}>{rightIcon}</div>}
        </button>
    )
}

export default OutlinedButton
