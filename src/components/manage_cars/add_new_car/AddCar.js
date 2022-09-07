import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useValidate from '../../../hooks/input_hooks/validate-input-hook'
import useNotistack from '../../../hooks/notistack-hook'

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import IOSSwitch from '../../UIElements/Input/Switch/IOSSwitch'
import PrimaryButton from '../../UIElements/Button/PrimaryButton'
import OutlinedButton from '../../UIElements/Button/OutlinedButton'

import getCarTypes from '../../../data/car_types'

import useCarManager from '../../../hooks/cars-hook'

import Card from '../../UIElements/Card'
import styles from './AddCar.module.css'

const AddCar = () => {
    const [transmission, setTransmission] = useState('')
    const navigate = useNavigate()
    const { addCar } = useCarManager()
    const { notify } = useNotistack()

    const seatsRef = useRef()
    const dailyRateRef = useRef()
    const isAvailableRef = useRef()

    const {
        value: brandValue,
        isValid: brandIsValid,
        hasError: brandInputHasError,
        valueChangeHandler: brandChangeHandler,
        inputBlurHandler: brandBlurHandler,
        // eslint-disable-next-line
        reset: resetBrand,
    } = useValidate((value) => value.trim() !== '')

    const {
        value: modelValue,
        isValid: modelIsValid,
        hasError: modelInputHasError,
        valueChangeHandler: modelChangeHandler,
        inputBlurHandler: modelBlurHandler,
        // eslint-disable-next-line
        reset: resetModel,
    } = useValidate((value) => value.trim() !== '')

    const {
        value: typeValue,
        isValid: typeIsValid,
        hasError: typeInputHasError,
        valueChangeHandler: typeChangeHandler,
        inputBlurHandler: typeBlurHandler,
        // eslint-disable-next-line
        reset: resetType,
    } = useValidate((type) => type.trim() !== '')

    let formIsValid = false

    if (brandIsValid && modelIsValid && typeIsValid) {
        formIsValid = true
    }

    const handleTypeChange = (e) => {
        setTransmission(e.target.value)
    }

    const cancelHandler = () => {
        navigate('/dashboard/manage_cars')
    }

    const submitHandler = async () => {
        if (formIsValid) {
            try {
                await addCar({
                    brand: brandValue,
                    model: modelValue,
                    type: typeValue,
                    seats: seatsRef.current.value,
                    transmission: transmission,
                    dailyRate: dailyRateRef.current.value,
                    isAvailable: isAvailableRef.current.checked,
                })

                notify('Added new car.', 'success')
                navigate('/dashboard/manage_cars')
                resetBrand()
                resetModel()
                resetType()
            } catch (err) {
                notify(err, 'error')
            }
        }
    }

    const car_types = getCarTypes()

    return (
        <div className={styles['add_car']}>
            <header>
                <h3>Add new car</h3>
            </header>
            <Card width="100%">
                <div className={styles.container}>
                    <div>
                        <h5>Basic details</h5>
                    </div>

                    <div className={styles.input}>
                        <TextField
                            fullWidth
                            label="Brand"
                            helperText={
                                brandInputHasError &&
                                'Brand name is a required field.'
                            }
                            error={brandInputHasError}
                            value={brandValue}
                            onChange={brandChangeHandler}
                            onBlur={brandBlurHandler}
                        />
                        <TextField
                            label="Model"
                            fullWidth
                            helperText={
                                modelInputHasError &&
                                'Model name is a required field.'
                            }
                            error={modelInputHasError}
                            value={modelValue}
                            onChange={modelChangeHandler}
                            onBlur={modelBlurHandler}
                        />
                        <FormControl fullWidth>
                            <InputLabel
                                htmlFor="car-type-select"
                                error={typeInputHasError}
                            >
                                Type
                            </InputLabel>
                            <Select
                                label="Type"
                                id="car-type-select"
                                value={typeValue}
                                onChange={typeChangeHandler}
                                // helperText={
                                //     typeInputHasError &&
                                //     'type name is a required field.'
                                // }
                                error={typeInputHasError}
                                onBlur={typeBlurHandler}
                            >
                                {car_types.map((type) => (
                                    <MenuItem key={type.id} value={type.type}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Card>
            <Card width="100%">
                <div className={styles.container}>
                    <div>
                        <h5>More details</h5>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            label="Seats"
                            type={'number'}
                            inputRef={seatsRef}
                            InputProps={{ inputProps: { min: 0 } }}
                            fullWidth
                        />
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                Transmission
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={handleTypeChange}
                            >
                                <FormControlLabel
                                    value="Automatic"
                                    control={<Radio />}
                                    label="Automatic"
                                />
                                <FormControlLabel
                                    value="Manual"
                                    control={<Radio />}
                                    label="Manual"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </Card>
            <Card width="100%">
                <div className={styles.container}>
                    <div>
                        <h5>Pricing</h5>
                    </div>
                    <div className={styles.input}>
                        <FormControl>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Daily Rate
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                type={'number'}
                                defaultValue={0}
                                startAdornment={
                                    <InputAdornment position="start">
                                        ₱
                                    </InputAdornment>
                                }
                                label="Amount"
                                inputRef={dailyRateRef}
                            />
                        </FormControl>
                    </div>
                </div>
            </Card>
            <Card width="100%">
                <div className={styles.container}>
                    <div>
                        <h5>Availability</h5>
                        <p className="caption">
                            Set the availability of this car
                        </p>
                    </div>
                    <FormControlLabel
                        inputRef={isAvailableRef}
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        // label="Set the car's availability"
                    />
                </div>
            </Card>

            <div className={styles['actions']}>
                <OutlinedButton onClick={cancelHandler}>Cancel</OutlinedButton>
                <PrimaryButton onClick={submitHandler} disabled={!formIsValid}>
                    Add Car
                </PrimaryButton>
            </div>
        </div>
    )
}

export default AddCar
