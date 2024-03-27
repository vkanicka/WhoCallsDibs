/**
 * This file is to testUser setup of context in nextjs app router using minimal data for simplicity and speed
 */

'use client'
import { createContext, useState } from 'react';

export const TestUserContext = createContext({
    user: {
        name: 'User Name',
        email: 'email@gmail.com'
    },
    toggleTestUser: ()=>{},
})

const TestUserContextProvider = ({ children }) => {
    const [testUser, setTestUser] = useState({
        user: {
        name: 'User Name',
        email: 'email@gmail.com'
    },
        toggleTestUser: ()=>{},
    })
    const handleUpdateTestUser = () => {
        setTestUser({
            user: {
            name: 'New User Name',
                email: 'newEmail@gmail.com'
                }
            })
    }

    const ctxValue = {
        user: testUser.user,
        toggleTestUser: handleUpdateTestUser,
    }

    return <TestUserContext.Provider value={ctxValue}>
        {children}
    </TestUserContext.Provider>
}
export default TestUserContextProvider;