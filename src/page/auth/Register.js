import React, { useContext, useState } from 'react'

import useHttp from '../../hooks/http-hook'
import { AuthContext } from '../../context/AuthContext'

import styles from './Auth.module.css'
import PrimaryButton from '../../components/UIElements/Button/PrimaryButton'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import useValidate from '../../hooks/input_hooks/validate-input-hook'

const Login = () => {
    const { sendRequest, isLoading } = useHttp()
    const authCtx = useContext(AuthContext)
    // console.log(authCtx)
    const [error, setError] = useState()

    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameInputHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        // eslint-disable-next-line
        reset: resetUsername,
    } = useValidate((value) => value.trim().length > 0)
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        // eslint-disable-next-line
        reset: resetPassword,
    } = useValidate((value) => value.trim().length >= 8)

    // console.log(usernameInputHasError)
    let formIsValid = false

    if (usernameIsValid && passwordIsValid) {
        formIsValid = true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formIsValid) {
            try {
                const response = await sendRequest({
                    url: process.env.REACT_APP_BACKEND_URL + '/accounts/signup',
                    method: 'POST',
                    body: JSON.stringify({
                        username: usernameValue,
                        password: passwordValue,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                authCtx.login(response.userId, response.token)
                resetPassword()
                resetUsername()
            } catch (err) {
                setError(err.message)
                throw err.message
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.disclaimer}>
                <p>This Web App is only a demo developed using MERN Stack</p>
            </div>
            <main className={styles.container}>
                <div className={styles.card}>
                    <h3>Create an account</h3>
                    <p className="caption">Sign up to use this web app</p>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            className={styles.textfield}
                            helperText={
                                usernameInputHasError && 'Enter a username.'
                            }
                            error={usernameInputHasError}
                            value={usernameValue}
                            onChange={usernameChangeHandler}
                            onBlur={usernameBlurHandler}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            className={styles.textfield}
                            helperText={
                                passwordInputHasError &&
                                'Password must be atleast 8 or more characters.'
                            }
                            error={passwordInputHasError}
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                        />
                        {error && <div className={styles.error}>{error}</div>}
                        <PrimaryButton
                            type="submit"
                            disabled={!formIsValid || isLoading}
                        >
                            Sign Up
                        </PrimaryButton>
                        <div className={styles.hl__container}>
                            <div className={styles.hl} />
                            <p className="caption">or</p>
                            <div className={styles.hl} />
                        </div>
                        <Link to="/auth/login">
                            Log in to an existing account
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login
