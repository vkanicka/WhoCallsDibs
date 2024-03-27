'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '@data/context/user'
const Header = () => {
    const userCtx = useContext(UserContext)
    console.log('userCtx')
    console.log(userCtx)
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