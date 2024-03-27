'use client'

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '@data/context/user';
import { GetAccount } from '@/data/client';
const Header = () => {
    const userCtx = useContext(UserContext);

    useEffect(() => {
        try {
            GetAccount().then((result) => {
                if (result) {
                    userCtx.loginUser(result)
                }
                // else {
                //     userCtx.logoutUser()
                // }
            })
            }
            catch (error) {
                console.log(error)
                userCtx.logoutUser()
            }
    },[])
    return (
        <header className="w-full bg-green-950 fixed p-2 text-green-200 flex justify-between">
            <Link href='/'>
                <h1>Who Calls Dibs?</h1>
            </Link>
            {!!userCtx?.user?.email ? (<Link className='link-account-header' href='/account/view' >{ userCtx?.user?.name}</Link>) : (<Link className='link-account-header' href={'/account/login'}>Login</Link>)}
        </header>
    )
}
export default Header;