import React from 'react'

import { AuthContext } from './AuthContext'
import { useAuth } from '../hooks/auth-hook'

const AuthProvider = (props) => {
    const { userId, token, login, logout } = useAuth()

    console.log(token)

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
