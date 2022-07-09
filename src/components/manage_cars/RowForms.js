import React, { Fragment, forwardRef, useState } from 'react'

import TextField from '@mui/material/TextField'
// eslint-disable-next-line
import Grid from '@mui/material/Grid'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import PrimaryButton from '../UIElements/Button/PrimaryButton'
import BorderlessButton from '../UIElements/Button/BorderlessButton'
import OutlinedButton from '../UIElements/Button/OutlinedButton'
import LoadingSpinner from '../UIElements/LoadingSpinner'

import getCarTypes from '../../dummy_data/car_types'

import styles from './RowForms.module.css'

const RowForms = forwardRef((props, ref) => {
    const { row, isLoading, onSave, onDelete, closeHandler, refs } = props

    const [type, setType] = useState(row.type)
    const [transmission, setTransmission] = useState(row.transmission)

    const {
        brandInput,
        modelInput,
        rateInput,
        typeInput,
        transmissionInput,
        seatsInput,
    } = refs.current

    // useEffect(() => {
    //     typeInput.current.value = type
    // }, [typeInput, type])

    // console.log(typeInput.current.value)
    // console.log(typeInput)

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteCar = () => {
        onDelete(row._id)
        // handleClose()
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const handleChangeTransmission = (e) => {
        setTransmission(e.target.value)
    }

    const car_types = getCarTypes()

    return (
        <Fragment>
            <div className={styles['edit__container']}>
                <TextField
                    label="Brand"
                    defaultValue={row.brand}
                    className={styles.textfield}
                    inputRef={brandInput}
                />
                <TextField
                    label="Model"
                    defaultValue={row.model}
                    className={styles.textfield}
                    inputRef={modelInput}
                />
                {/* <TextField
                        label="Type"
                        defaultValue={row.type}
                        className={styles.textfield}
                        inputRef={typeInput}
                    /> */}
                <FormControl fullWidth>
                    <InputLabel htmlFor="car-type-select">Type</InputLabel>
                    <Select
                        label="Type"
                        id="car-type-select"
                        value={type}
                        onChange={handleChangeType}
                        inputRef={typeInput}
                    >
                        {car_types.map((type) => (
                            <MenuItem key={type.id} value={type.type}>
                                {type.type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <TextField
                        label="Transmission"
                        defaultValue={row.transmission}
                        className={styles.textfield}
                        inputRef={transmissionInput}
                    /> */}
                <FormControl fullWidth>
                    <InputLabel htmlFor="transmission-select">
                        Transmission
                    </InputLabel>
                    <Select
                        label="Transmission"
                        id="transmission-select"
                        value={transmission || ''}
                        onChange={handleChangeTransmission}
                        inputRef={transmissionInput}
                    >
                        <MenuItem value={'Automatic'}>Automatic</MenuItem>
                        <MenuItem value={'Manual'}>Manual</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Seats"
                    type={'number'}
                    defaultValue={row.seats}
                    className={styles.textfield}
                    inputRef={seatsInput}
                />
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        type={'number'}
                        defaultValue={row.dailyRate}
                        className={styles.textfield}
                        inputRef={rateInput}
                        startAdornment={
                            <InputAdornment position="start">₱</InputAdornment>
                        }
                        label="Amount"
                    />
                </FormControl>
            </div>
            <div className={styles['actions']}>
                <div>
                    <PrimaryButton onClick={onSave} disabled={isLoading}>
                        {isLoading && (
                            <div>
                                {' '}
                                Updating{' '}
                                <span>
                                    <LoadingSpinner width={16} color="white" />
                                </span>
                            </div>
                        )}
                        {!isLoading && 'Update'}
                    </PrimaryButton>
                    <OutlinedButton onClick={closeHandler}>
                        Cancel
                    </OutlinedButton>
                </div>
                <BorderlessButton btnType="danger" onClick={handleClickOpen}>
                    Remove
                </BorderlessButton>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    {'Remove this car?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone. This action will
                        permanently remove the car from the database.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton onClick={deleteCar} btnType="danger">
                        Remove Car
                    </PrimaryButton>
                    <OutlinedButton onClick={handleClose} autoFocus>
                        Cancel
                    </OutlinedButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
})

export default RowForms
