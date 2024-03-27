'use client'

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '@data/context/user';
import { GetAccount } from '@/data/client';
const Header = () => {
    const userCtx = useContext(UserContext);

    useEffect(() => {
        // userCtx.loginUser()

        try {
            GetAccount().then((result) => {
                if (result) {
                    userCtx.loginUser(result)
                }
            })
            }
            catch (error) {
                console.log(error)
            }
    },[])
    return (
        <header className="w-full bg-green-950 fixed p-2 text-green-200 flex justify-between">
            <Link href='/'>
                <h1>Who Calls Dibs?</h1>
            </Link>
            <button onClick={userCtx.updateUser}>{ userCtx.user.name }</button>
        </header>
    )
}
export default Header;