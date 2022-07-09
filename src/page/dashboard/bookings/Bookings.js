import React, { useState } from 'react'

import Box from '@mui/material/Box'

import {
    TabPanel,
    StyledTab,
    StyledTabs,
} from '../../../components/UIElements/Tabs/Tabs'

import BookingsList from '../../../components/bookings/BookingsList'

import styles from './Bookings.module.css'
import PersistentDrawer from '../../../components/UIElements/Drawer/PersistentDrawer'
import Drawer from '../../../components/bookings/Drawer'

const Bookings = () => {
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)
    const [drawerData, setDrawerData] = useState()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleDrawerOpen = (data) => {
        setDrawerData(data)
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleChangeStatus = (data) => {
        setDrawerData(data)
    }

    return (
        <div className={styles['bookings']}>
            <PersistentDrawer
                open={open}
                component={
                    <Drawer
                        drawerData={drawerData}
                        handleDrawerClose={handleDrawerClose}
                        handleChangeStatus={handleChangeStatus}
                    />
                }
            >
                <header>
                    <h3>Bookings</h3>
                </header>
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                        >
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="All"
                            />
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="Active"
                            />
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="Completed"
                            />
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="Pending"
                            />
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="Canceled"
                            />
                            <StyledTab
                                disableRipple
                                sx={{ textTransform: 'none' }}
                                label="Rejected
                            "
                            />
                        </StyledTabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <BookingsList onOpenDrawer={handleDrawerOpen} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BookingsList
                            onOpenDrawer={handleDrawerOpen}
                            status={'active'}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <BookingsList
                            onOpenDrawer={handleDrawerOpen}
                            status={'completed'}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <BookingsList
                            onOpenDrawer={handleDrawerOpen}
                            status={'pending'}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <BookingsList
                            onOpenDrawer={handleDrawerOpen}
                            status={'canceled'}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <BookingsList
                            onOpenDrawer={handleDrawerOpen}
                            status={'rejected'}
                        />
                    </TabPanel>
                </div>
            </PersistentDrawer>
        </div>
    )
}

export default Bookings
