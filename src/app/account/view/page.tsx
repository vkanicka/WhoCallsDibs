'use client'
import { useContext } from 'react';
import { UserContext } from '@data/context/user';
import Logout from '@/components/logout';
import Link from 'next/link';
import { UserPlus } from 'react-feather';
import { CreateInvite } from '@/data/client';
import Invite from '@/data/models/invite';
import { useRouter } from 'next/navigation';

const ViewAccount = () => {
    const userCtx = useContext(UserContext);

    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const handleAddFriendClick = () => {
        try {
            const inputData: Partial<Invite> = {
                userAId: userCtx.user.$id as string,
                userAEmail: userCtx.user.email as string,
                userAName: userCtx.user.name as string,
            }
            const response = CreateInvite(inputData).then((response)=>Success(`/account/invite/${response?.$id}`))
            return response
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>View Account</h1>
            {!!userCtx.user.email && (
                <div className='flex flex-col justify-between'>
                    <p>Username: {userCtx.user.name}</p>
                    <p>Email: {userCtx.user.email}</p>
                    <Link href={'/account/invite'} className="absolute right-6 bottom-48 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                        <UserPlus size={30} className='self-center text-limeshine-300' />
                    </Link>
                    <Logout />
                </div>
            )}
        </div>
    )
}
export default ViewAccount;