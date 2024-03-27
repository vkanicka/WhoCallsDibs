/**
 * This file is to testUser setup of context in nextjs app router using minimal data for simplicity and speed, adding types
 */

'use client'
import { createContext, useState, ReactNode } from 'react';
import User from '../models/user';

const defaultUser: User = {
    email: 'email@gmail.com',
    name: 'User Name',
    password: '',
    $id: '',
    $collectionId: '',
    $databaseId: '',
    $createdAt: '',
    $updatedAt: '',
    $permissions: []
}

export const UserContext = createContext({
    user: defaultUser,
    updateUser: ()=>{},
})

interface childrenProps {
    children?: ReactNode
}

const UserContextProvider = ({ children, ...childrenProps }: childrenProps) => {
    const [user, setUser] = useState({
        user: defaultUser,
        updateUser: ()=>{},
    })
    const handleUpdateUser = () => {
        const isDefaultUser = user.user.name === 'User Name'
        const newUser: User = {
            email: 'newUser@gmail.com',
            name: 'New User Name',
            password: '',
            $id: '',
            $collectionId: '',
            $databaseId: '',
            $createdAt: '',
            $updatedAt: '',
            $permissions: []
        };
        setUser({
            user: isDefaultUser ? newUser : defaultUser,
            updateUser: ()=>{},
            })
    }

    const ctxValue = {
        user: user.user,
        updateUser: handleUpdateUser,
    }

    return <UserContext.Provider value={ctxValue}>
        {children}
    </UserContext.Provider>
}
export default UserContextProvider;