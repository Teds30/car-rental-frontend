import React from 'react'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import styles from './Drawer.module.css'
import DrawerContents from './DrawerContents'

const Drawer = (props) => {
    const { drawerData, handleDrawerClose,handleChangeStatus } = props

    if (!drawerData) {
        return (
            <React.Fragment>
                <div className={styles['drawer_header']}>
                    {/* <h5>{drawerData.id}</h5> */}
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={styles['drawer_content']}></div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className={styles['drawer_header']}>
                <h5>{drawerData._id}</h5>
                <IconButton onClick={handleDrawerClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={styles['drawer_content']}>
                <DrawerContents drawerData={drawerData} handleChangeStatus={handleChangeStatus}/>
            </div>
        </React.Fragment>
    )
}

export default Drawer
