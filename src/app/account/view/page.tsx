'use client'
import { useContext } from 'react';
import { UserContext } from '@data/context/user';
import Logout from '@/components/logout';
import Link from 'next/link';
import { UserPlus, Users } from 'react-feather';

const ViewAccount = () => {
    const userCtx = useContext(UserContext);

    return (
        <div>
            <h1>View Account</h1>
            {!!userCtx.user.email && (
                <div className='flex flex-col justify-between'>
                    <p>Username: {userCtx.user.name}</p>
                    <p>Email: {userCtx.user.email}</p>
                    <Link href={'/account/friends'} className="fixed right-6 bottom-64 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                        <Users size={30} className='self-center text-limeshine-300' />
                    </Link>
                    <Link href={'/account/invite'} className="fixed right-6 bottom-48 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                        <UserPlus size={30} className='self-center text-limeshine-300' />
                    </Link>
                    <Logout />
                </div>
            )}
        </div>
    )
}
export default ViewAccount;