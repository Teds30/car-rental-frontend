import React from 'react'

import Drawer from '@mui/material/Drawer'
// eslint-disable-next-line
import IconButton from '@mui/material/IconButton'
// eslint-disable-next-line
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import styles from './PersistentDrawer.module.css'

const drawerWidth = 500

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    })
)

const PersistentDrawer = (props) => {
    const { children, open } = props
    const { component } = props

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Main open={open}>{children}</Main>
            <Drawer
                className={styles['drawer']}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    zIndex: !open && -1,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <div>{component}</div>
            </Drawer>
        </Box>
    )
}

export default PersistentDrawer
