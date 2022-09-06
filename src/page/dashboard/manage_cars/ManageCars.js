import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import {
    TabPanel,
    StyledTab,
    StyledTabs,
} from '../../../components/UIElements/Tabs/Tabs'

import ManageCarsList from '../../../components/manage_cars/ManageCarsList'

import styles from './ManageCars.module.css'

import PrimaryButton from '../../../components/UIElements/Button/PrimaryButton'
import AddIcon from '@mui/icons-material/Add'
import getCarTypes from '../../../data/car_types'

const ManageCars = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const addCarHandler = () => {
        navigate('add_new_car')
    }

    const car_types = getCarTypes()

    return (
        <div className={styles['mng_cars']}>
            <header>
                <h3>Manage Cars</h3>
                <PrimaryButton
                    onClick={addCarHandler}
                    leftIcon={<AddIcon sx={{ fontSize: 16 }} />}
                >
                    Add a Car
                </PrimaryButton>
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
                        {car_types.map((type, index) => {
                            return (
                                <StyledTab
                                    key={index}
                                    disableRipple
                                    sx={{ textTransform: 'none' }}
                                    label={type.type}
                                />
                            )
                        })}
                    </StyledTabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <ManageCarsList type={'all'} />
                </TabPanel>
                {car_types.map((type, index) => {
                    return (
                        <TabPanel key={index} value={value} index={index + 1}>
                            <ManageCarsList type={type.type} />
                        </TabPanel>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageCars
