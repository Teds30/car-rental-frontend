import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes,
} from 'react-router-dom'

import { ThemeContext } from './context/ThemeContext'

import styled, { ThemeProvider } from 'styled-components'

import { lightTheme, darkTheme, GlobalStyles } from './themes/themes'
import useTheme from './hooks/theme-hook'

import BookingsProvider from './context/BookingsProvider'

import Dashboard from './page/dashboard/Dashboard'
import PageNotFound from './page/errors/PageNotFound'
import Overview from './page/dashboard/overview/Overview'
import Cars from './page/dashboard/cars/Cars'
import Centers from './page/dashboard/centers/Centers'
import ManageCars from './page/dashboard/manage_cars/ManageCars'
import AddCar from './components/manage_cars/add_new_car/AddCar'
import Bookings from './page/dashboard/bookings/Bookings'

import Login from './page/auth/Login'
import Register from './page/auth/Register'

import './App.css'

import { useAuth } from './hooks/auth-hook'
import { AuthContext } from './context/AuthContext'

const StyledApp = styled.div`
    color: ${(props) => props.theme.fontColor};
`

export default function App() {
    const { theme, themeToggler } = useTheme()

    const { userId, token, login, logout } = useAuth()

    let routes

    // console.log(token)   

    if (token) {
        routes = (
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to="/dashboard/overview" />}
                />

                <Route
                    path="/auth/login"
                    element={<Navigate replace to="/dashboard/overview" />}
                />
                <Route
                    path="/auth/signup"
                    element={<Navigate replace to="/dashboard/overview" />}
                />
                <Route
                    path="/dashboard"
                    element={<Navigate replace to="/dashboard/overview" />}
                />
                <Route path="/dashboard/" element={<Dashboard />}>
                    <Route path="/dashboard/overview" element={<Overview />} />
                    <Route path="/dashboard/cars" element={<Cars />} />
                    <Route path="/dashboard/centers" element={<Centers />} />
                    <Route
                        path="/dashboard/manage_cars"
                        element={<ManageCars />}
                    />
                    <Route
                        path="/dashboard/bookings"
                        element={
                            <BookingsProvider>
                                <Bookings />
                            </BookingsProvider>
                        }
                    />

                    <Route
                        path="/dashboard/manage_cars/add_new_car"
                        element={<AddCar />}
                    />
                </Route>

                <Route path="*" element={<PageNotFound />} />

                {/* <PageNotFound /> */}
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Register />} />

                <Route
                    path="*"
                    element={<Navigate replace to="/auth/login" />}
                />
            </Routes>
        )
    }
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
            <ThemeContext.Provider value={{ theme, themeToggler }}>
                <ThemeProvider
                    theme={theme === 'light' ? lightTheme : darkTheme}
                >
                    <GlobalStyles />
                    <StyledApp>
                        <Router>
                            <main>{routes}</main>
                        </Router>
                    </StyledApp>
                </ThemeProvider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}
