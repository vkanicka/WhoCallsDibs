/**
 * This file is to testUser setup of context in nextjs app router using minimal data for simplicity and speed, adding types
 */

'use client'
import { createContext, useState, ReactNode } from 'react';
import { Models } from 'appwrite';

const defaultUser: Partial<Models.User<Models.Preferences>> = {
    email: '',
    name: '',
    password: '',
}

export const UserContext = createContext({
    user: defaultUser,
    updateUser: () => { },
    loginUser: (newUser: Partial<Models.User<Models.Preferences>>) => { },
    logoutUser: () => { },
    updateUserDetailsId: (userDetailsId: string) => { },
    userDetailsId: ''
})

interface childrenProps {
    children?: ReactNode
}

const UserContextProvider = ({ children, ...childrenProps }: childrenProps) => {
    const [user, setUser] = useState({
        user: defaultUser,
        updateUser: () => { },
        loginUser: (newUser: Partial<Models.User<Models.Preferences>>) => { },
        logoutUser: () => { },
        updateUserDetailsId: (userDetailsId: string) => { },
        userDetailsId: '',
    })
    const handleUpdateUser = () => {
        const isDefaultUser = user.user.name === 'User Name'
        const newUser: Partial<Models.User<Models.Preferences>> = {
            email: '',
            name: '',
            password: '',
        };
        setUser({
            user: isDefaultUser ? newUser : defaultUser,
            updateUser: () => { },
            loginUser: () => { },
            logoutUser: () => { },
            updateUserDetailsId: (userDetailsId: string) => { },
            userDetailsId: user.userDetailsId
            })
    }
    const handleLoginUser = (newUser: Partial<Models.User<Models.Preferences>>, userDetailsId = '') => {
        setUser({
            user: newUser,
            updateUser: () => { },
            loginUser: (newUser: Partial<Models.User<Models.Preferences>>) => { },
            logoutUser: () => { },
            updateUserDetailsId: (userDetailsId: string) => { },
            userDetailsId: userDetailsId
            })

    }
    const handleLogoutUser = () => {
        handleLoginUser(defaultUser)
    }

    const handleUpdateUserDetailsId = (userDetailsId: string) => {
        setUser({
            user: user.user,
            updateUser: ()=>{},
            loginUser: ()=>{},
            logoutUser: ()=>{},
            updateUserDetailsId: (userDetailsId: string)=>{},
            userDetailsId: userDetailsId
        })
    }

    const ctxValue = {
        user: user.user,
        updateUser: handleUpdateUser,
        loginUser: handleLoginUser,
        logoutUser: handleLogoutUser,
        updateUserDetailsId: handleUpdateUserDetailsId,
        userDetailsId: user.userDetailsId
    }

    return <UserContext.Provider value={ctxValue}>
        {children}
    </UserContext.Provider>
}
export default UserContextProvider;