/**
 * If user is not logged in, have them login or create account first
 * Send the invite id as a query param to login|register
 * Login|Register should send user back here instead of normal flow
 */

'use client'

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@data/context/user';
import { GetInvite, UpdateInvite, UpdateUserDetails } from "@/data/client";
import Invite from "@/data/models/invite";

const InvitePage = () => {
    const [invite, setInvite] = useState<Invite>()
    const params = useParams()
    const userCtx = useContext(UserContext)
    const isUserLoggedIn = !!userCtx.user.$id
    const { id: inviteId } = params

    const handleIgnoreClick = () => {
        console.log('ignore click')
        // if user denies request, is that saved in req table or is rec doc deleted ?
    }
    const handleAcceptClick = () => {
        console.log('accept click')
        // (if logged in user === user B and !== user A) adds friend ID/email/user relationship to user A AND user B's friends array
        if (userCtx.user.$id === invite?.userBId && userCtx.user.$id !== invite?.userAId) {
            // const userDetailsId = 
            // UpdateUserDetails()
            console.log('get user update id and add friend')

        }
        // is friend request document deleted? or saved with updated status = Accepted ?
    }

        const getAndSetInvite = async (id: string) => {
            const gottenInvite = await GetInvite(id)
            setInvite(gottenInvite)
            if (gottenInvite?.userAId !== userCtx.user.$id && !gottenInvite?.userBId) {
                UpdateInvite({
                    id: id,
                    userBId: userCtx.user.$id,
                    userBEmail: userCtx.user.email,
                    userBName: userCtx.user.name
                })
            }
    }

    useEffect(() => {
        getAndSetInvite(inviteId as string)
    }, [])
    


    return (
        <div>
            <h1>Invite Page</h1>

            <p>{invite?.userAName} has invited {invite?.userBName ?? 'you'} to be friends!</p>

            {!isUserLoggedIn && (
                <div>
                    <p>Login or create an account first</p>
                    <p>To learn more click link to homepage</p>

                    <div className="bottom-tray">
                        <Link className="btn-v font-normal text-sm" href={`/account/create?invite=${params.id}`}>New Here?<br></br> Create Account</Link>
                        <Link className="btn-v font-normal text-sm" href={`/account/login?invite=${params.id}`}>Have an Account?<br></br> Login</Link>
                    </div>
                </div>
            )}
            {isUserLoggedIn && (
                <div>
                    <div className="bottom-tray">
                        <button onClick={handleIgnoreClick} className="btn-v font-normal text-3xl">Ignore</button>
                        <button onClick={handleAcceptClick} className="btn-v font-normal text-3xl self-center">Accept</button>
                    </div>
                </div>
            )}

        </div>
    )
}
export default InvitePage;