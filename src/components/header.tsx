'use client'
import Image from 'next/image'
import Link from 'next/link';
import { Suspense, useContext, useEffect } from 'react';
import { UserContext } from '@data/context/user';
import { GetAccount } from '@/data/client';
import { usePathname, useSearchParams } from 'next/navigation';
const Header = () => {

    const SuspenseWrapper = () => {
        const userCtx = useContext(UserContext);
        const pathname = usePathname();
        const params = useSearchParams();
        const patternA = /^\/account\/invite\/[a-f0-9].*$/
        const isFromInvite = pathname && patternA.test(pathname)
        const inviteId = (isFromInvite && pathname?.split('/')[3]) ?? params?.get('invite')

        useEffect(() => {
            try {
                GetAccount()
                .then((result) => {
                    if (result) {
                        userCtx.loginUser(result)
                    }
                })
                }
                catch (error) {
                    console.log(error)
                    userCtx.logoutUser()
                }
        },[])
        return (
            <header className="w-full p-6 text-green-200 flex justify-between align-middle">
                <div className='flex gap-1'>
                    {/* <Image src={'/favicon.ico'} alt={'icon'} width={40} height={40} className='rounded-full'/> */}
                    <Link className='self-center' href='/'>
                        <h1 className='text-verbena-900 text-3xl drop-shadow-glow'>Who Calls Dibs?</h1>
                    </Link>
                </div>
                {!!userCtx?.user?.email ? (<Link className='link-account-header' href='/account/view' >{ userCtx?.user?.name}</Link>) : (<Link className='link-account-header' href={`/account/login${!!inviteId ? '?invite='+inviteId : ''}`}>Login</Link>)}
            </header>
        )
    }

    return (
    <Suspense>
        <SuspenseWrapper />
    </Suspense>
    )
}
export default Header;