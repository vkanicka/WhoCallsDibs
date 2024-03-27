/**
 * This file is to test setup of context in nextjs app router using minimal data for simplicity and speed
 */

'use client'
import { ReactNode, createContext, useState } from 'react';
import User from '../models/user';

const emptyUser: User = {
    email: 'emptyUser@gmail.com',
    name: 'Empty User',
    password: '',
    $id: '',
    $collectionId: '',
    $databaseId: '',
    $createdAt: '',
    $updatedAt: '',
    $permissions: []
}

export const TestContext = createContext({
    user: emptyUser,
    // updateUser: ()=>{},
})

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const TestContextProvider = ({ children, ...props }: Props) => {
    const [user, setUser] = useState({
        user: emptyUser,
        // updateUser: ()=>{},
    })
    const newUser: User = {
        email: 'newUser@gmail.com',
        name: 'NewUser',
        password: '',
        $id: '',
        $collectionId: '',
        $databaseId: '',
        $createdAt: '',
        $updatedAt: '',
        $permissions: []
    }
    // const handleUpdateUser = () => {
    //     setUser({
    //         user: newUser
    //     })
    // }
    //     const handleUpdateUser = () => {
    //     setUser({
    //             user: newUser
    //         })
    // }

    const ctxValue = {
        user: user.user,
        // updateUser: handleUpdateUser,
    }

    return <TestContext.Provider value={ctxValue}>
        {children}
    </TestContext.Provider>
}
export default TestContextProvider;