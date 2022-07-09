import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import { IoClose } from 'react-icons/io5'

import styles from './Modal.module.css'

const Modal = (props) => {
    const { title, caption, children, onClose } = props

    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={props.open}
            >
                <div className={styles['modal']}>
                    <header className={styles['modal__header']}>
                        <div className={styles['modal__title']}>
                            <h4>{title}</h4>
                            <p className="caption">{caption}</p>
                        </div>
                        <div className={styles['modal__close']}>
                            <button onClick={onClose}>
                                <IoClose fontSize="1.5em" />
                            </button>
                        </div>
                    </header>

                    <div className={styles['modal__content']}>{children}</div>
                </div>
            </Backdrop>
        </div>
    )
}

export default Modal
