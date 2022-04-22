import React, { useState } from 'react'
import { login } from '../api/auth'
import { LOCAL_STORAGE_TOKEN_KEY } from '../constant/auth'

interface IAuthContext {
    isLoggedIn: boolean
    user: null | Record<string, any>
    login: (
        email: string,
        password: string
    ) => Promise<Record<string, string> | null>
    logout: () => Promise<void>
}

export const AuthContext = React.createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    login: async () => null,
    logout: async () => {},
})

const AuthProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [user, setUser] = useState<Record<string, any> | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    // useEffect(() => {
    //     if (!mode) setMode(prefersDarkMode ? 'dark' : 'light')
    // }, [prefersDarkMode])

    const loginWithEmail = async (email: string, password: string) => {
        return login({ email, password })
            .then((res) => {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, res.token)
                setUser({
                    email: res.email,
                    history: res.history,
                })
                setIsLoggedIn(true)
                return user
            })
            .catch(() => {
                setUser(null)
                setIsLoggedIn(false)
                return null
            })
    }

    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
        setUser(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login: loginWithEmail,
                logout: logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
