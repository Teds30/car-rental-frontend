import { useState, useEffect } from 'react'

const useTheme = () => {
    const [theme, setTheme] = useState('')

    const themeToggler = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        const themeGetter = localStorage.getItem('theme')

        if (themeGetter) {
            setTheme(themeGetter)
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }, [])

    return {
        theme,
        themeToggler,
    }
}

export default useTheme
