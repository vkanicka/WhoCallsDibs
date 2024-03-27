/**
 * This file is to testUser setup of context in nextjs app router using minimal data for simplicity and speed, adding types
 */

'use client'
import { createContext, useState, ReactNode } from 'react';
import { Models } from 'appwrite';

const defaultUser: Models.User<Models.Preferences> = {
    email: '',
    name: '',
    password: '',
    $id: '',
    $createdAt: '',
    $updatedAt: '',
    registration: '',
    status: false,
    labels: [],
    passwordUpdate: '',
    phone: '',
    emailVerification: false,
    phoneVerification: false,
    mfa: false,
    totp: false,
    prefs: {},
    targets: [],
    accessedAt: ''
}

export const UserContext = createContext({
    user: defaultUser,
    updateUser: () => { },
    loginUser: (newUser: Models.User<Models.Preferences>) => { },
    logoutUser: () => { },
})

interface childrenProps {
    children?: ReactNode
}

const UserContextProvider = ({ children, ...childrenProps }: childrenProps) => {
    const [user, setUser] = useState({
        user: defaultUser,
        updateUser: () => { },
        loginUser: (newUser: Models.User<Models.Preferences>) => { },
        logoutUser: () => { },
    })
    const handleUpdateUser = () => {
        const isDefaultUser = user.user.name === 'User Name'
        const newUser: Models.User<Models.Preferences> = {
            email: '',
            name: '',
            password: '',
            $id: '',
            $createdAt: '',
            $updatedAt: '',
            registration: '',
            status: false,
            labels: [],
            passwordUpdate: '',
            phone: '',
            emailVerification: false,
            phoneVerification: false,
            mfa: false,
            totp: false,
            prefs: {},
            targets: [],
            accessedAt: ''
        };
        setUser({
            user: isDefaultUser ? newUser : defaultUser,
            updateUser: () => { },
            loginUser: () => { },
            logoutUser: () => { },
            })
    }
    const handleLoginUser = (newUser: Models.User<Models.Preferences>) => {
        setUser({
            user: newUser,
            updateUser: () => { },
            loginUser: (newUser: Models.User<Models.Preferences>) => { },
            logoutUser: () => {},
            })

    }
    const handleLogoutUser = () => {
        handleLoginUser(defaultUser)
    }

    const ctxValue = {
        user: user.user,
        updateUser: handleUpdateUser,
        loginUser: handleLoginUser,
        logoutUser: handleLogoutUser,
    }

    return <UserContext.Provider value={ctxValue}>
        {children}
    </UserContext.Provider>
}
export default UserContextProvider;