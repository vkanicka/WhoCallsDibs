'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { TestContext } from '@data/context/test'
const Header = () => {
    const testCtx = useContext(TestContext)
    return (
        <header className="w-full bg-green-950 fixed p-2 text-green-200 flex justify-between">
            <Link href='/'>
                <h1>Who Calls Dibs?</h1>
            </Link>
            <button onClick={testCtx.toggleTest}>{ testCtx.word }</button>
        </header>
    )
}
export default Header;