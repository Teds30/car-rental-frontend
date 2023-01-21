import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [userId, setUserId] = useState(false)

    const login = useCallback((uid, passed_token, expirationDate) => {
        setToken(passed_token)
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 24 * 30)
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: passed_token,
                expiration: tokenExpirationDate.toISOString(),
            })
        )
        setUserId(uid)
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            )
        }
    }, [login])

    return {
        userId,
        token,
        login,
        logout,
    }
}
