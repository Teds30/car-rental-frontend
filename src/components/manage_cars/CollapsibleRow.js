import React, { useState, useRef } from 'react'

import useCarManager from '../../hooks/cars-hook'
import useNotistack from '../../hooks/notistack-hook'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import styles from './CollapsibleRow.module.css'

import RowForms from './RowForms'

const CollapsibleRow = (props) => {
    const { updateCar, deleteCar, isLoading } = useCarManager()
    const { notify } = useNotistack()

    const { row, onRefetchData, onDeleteData, selectedCarType } = props
    const [open, setOpen] = useState(false)

    const brandInput = useRef()
    const modelInput = useRef()
    const rateInput = useRef()
    const typeInput = useRef()
    const transmissionInput = useRef()
    const seatsInput = useRef()

    const refs = useRef({
        brandInput,
        modelInput,
        rateInput,
        typeInput,
        transmissionInput,
        seatsInput,
    })

    const closeHandler = () => {
        setOpen(false)
    }

    const deleteHandler = async () => {
        try {
            await deleteCar(row._id)
            onDeleteData(row._id)

            notify('Car successfully removed.', 'success')
        } catch (err) {
            notify('Failed to remove the car.', 'error')
        }
    }

    const saveHandler = async () => {
        try {
            await updateCar(row._id, {
                brand: brandInput.current.value.trim(),
                model: modelInput.current.value.trim(),
                dailyRate: rateInput.current.value,
                type: typeInput.current.value.trim(),
                transmission: transmissionInput.current.value.trim(),
                seats: seatsInput.current.value,
            })
            onRefetchData(selectedCarType)
            closeHandler()
            notify('Updated Successfully.', 'success')
        } catch (err) {
            notify('Failed to update the car.', 'error')
            console.log(EvalError)
        }
    }

    return (
        <React.Fragment>
            <tr className={styles.row}>
                <td className={styles['main__container']}>
                    <div className={styles['icon__container']}>
                        <IconButton
                            size="small"
                            onClick={() => setOpen(!open)}
                            className={styles['icon__toggle']}
                        >
                            {open ? (
                                <KeyboardArrowDownIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <div className={styles['data__container']}>
                        <div className={styles['img__container']}></div>
                        <div>
                            <h6>{row.brand}</h6>
                            <p className="caption">{row.model}</p>
                        </div>
                    </div>
                </td>

                <td>₱ {row.dailyRate}</td>
                <td>{row.type}</td>
                <td>{row.seats}</td>
                <td>{row.transmission}</td>
                <td>{row.isAvailable ? 'Available' : 'Not Available'}</td>
            </tr>
            <tr className={styles.row}>
                <td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan="6">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }} className={styles['container']}>
                            <div className={styles['col1']}>
                                <div className={styles['title']}>
                                    <h4>Details</h4>
                                    <RowForms
                                        row={row}
                                        isLoading={isLoading}
                                        onSave={saveHandler}
                                        onDelete={deleteHandler}
                                        closeHandler={closeHandler}
                                        refs={refs}
                                    />
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default CollapsibleRow
