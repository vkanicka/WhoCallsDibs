/**
 * If user is not logged in, have them login or create account first
 * Send the invite id as a query param to login|register
 * Login|Register should send user back here instead of normal flow
 */

'use client'

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from 'react';
import { UserContext } from '@data/context/user';

const InvitePage = () => {
    const params = useParams()
    const userCtx = useContext(UserContext)
    const isUserLoggedIn = !!userCtx.user.$id

    const handleIgnoreClick = () => {
        console.log('ignore click')
        // if user denies request, is that saved in req table or is rec doc deleted ?
    }
    const handleAcceptClick = () => {
        console.log('accept click')
        // (if logged in user === user B and !== user A) adds friend ID/email/user relationship to user A AND user B's friends array
        // is friend request document deleted? or saved with updated status = Accepted ?
    }

    return (
        <div>
            <h1>Invite Page</h1>
            <h3>{params.id}</h3>

            <p>_UserA_ has invited you to be friends!</p>
            <p>user A profile page link and image</p>

            {/* If user is not logged in */}

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
                    <p>Login or create an account first</p>
                    <p>To learn more click link to homepage</p>

                    <div className="bottom-tray">
                        <button className="btn-v font-normal text-3xl">Ignore</button>
                        <button className="btn-v font-normal text-3xl self-center">Accept</button>
                    </div>
                </div>
            )}

        </div>
    )
}
export default InvitePage;