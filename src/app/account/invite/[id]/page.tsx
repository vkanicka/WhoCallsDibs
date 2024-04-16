/**
 * If user is not logged in, have them login or create account first
 * Send the invite id as a query param to login|register
 * Login|Register should send user back here instead of normal flow
 */

'use client'

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@data/context/user';
import { AcceptInvite, GetInvite, GetUserDetails, GetUserDetailsByAuthId, IgnoreInvite, UpdateInvite, UpdateUserDetails } from "@/data/client";
import Invite from "@/data/models/invite";

const InvitePage = () => {
    const [invite, setInvite] = useState<Invite>()
    const params = useParams()
    const userCtx = useContext(UserContext)
    const isInviteOwner = userCtx && userCtx.user && userCtx.user.$id === invite?.userAId
    const isUserLoggedIn = !!userCtx.user.$id
    //@ts-expect-error
    const { id: inviteId } = params
    const [hasCopied, setHasCopied] = useState(false)
    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href)
        setHasCopied(true)
        console.log(`Copied ${window.location.href}`)
    }

    const handleIgnoreClick = () => {
        inviteId && IgnoreInvite(inviteId as string)
    }
    const handleAcceptClick = async () => {
        // update invite to accepted
        // get details ID A with auth ID A
        // update A details to have friend B
        // get details ID B with auth ID B
        // update B details to have friend A
        const userBAuthId = userCtx.user.$id
        if (!!userBAuthId && invite?.userAId && (userBAuthId !== invite.userAId)) {
            GetUserDetailsByAuthId(invite.userAId)
                .then((userADetailResult: any) => {
                    const userADetails = userADetailResult?.documents[0]
                    if (!!userADetails) {
                        const userADetailsId = userADetails.$id
                        const friends = [...userADetails.friends] ?? []
                        if (!friends.includes(userBAuthId)) {
                            friends.push(userBAuthId)
                        }
                        UpdateUserDetails(userADetailsId, friends)
                    }
                })
                .then(() => GetUserDetailsByAuthId(userBAuthId))
                .then((userBDetailResult: any) => {
                    const userBDetails = userBDetailResult?.documents[0]
                    if (!!userBDetails) {
                        const userBDetailsId = userBDetails.$id
                        const friends = [...userBDetails.friends] ?? []
                        if (!friends.includes(invite.userAId)) {
                            friends.push(invite.userAId)
                        }
                        UpdateUserDetails(userBDetailsId, friends)
                    }
                })
                .then(() => {
                    Success('/account/friends')
                })
        }
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
    }, [userCtx])

    return (
        <div>
            <h1>Invite Page</h1>

            <p>{invite?.userAName ? invite.userAName : 'Someone'} has invited {invite?.userBName ? invite.userBName : 'you'} to be friends!</p>

            {invite?.Status === 'Accepted' && (
                <p className="text-3xl text-primrose-600">{invite?.Status}</p>
            )}

            {!isUserLoggedIn && (
                <div>
                    <p>Login or create an account first</p>
                    <p>To learn more click link to homepage</p>

                    <div className="bottom-tray">
                        <Link className="btn-v font-normal text-sm" href={`/account/create?invite=${params?.id}`}>New Here?<br></br> Create Account</Link>
                        <Link className="btn-v font-normal text-sm" href={`/account/login?invite=${params?.id}`}>Have an Account?<br></br> Login</Link>
                    </div>
                </div>
            )}
            {isUserLoggedIn && isInviteOwner && invite?.Status !== 'Accepted' && (
                <div>
                    <div className="bottom-tray">
                        <button onClick={handleCopyClick} className="btn-v font-normal text-2xl">{!hasCopied ? 'Copy URL' : 'Copied!'}</button>
                        {/* <button onClick={handleShareClick} className="btn-v font-normal text-2xl self-center">Share</button> */}
                    </div>
                </div>
            )}
            {isUserLoggedIn && !isInviteOwner && invite?.Status !== 'Accepted' && (
                <div>
                    <div className="bottom-tray">
                        <button onClick={handleIgnoreClick} className="btn-v font-normal text-3xl">Ignore</button>
                        <button onClick={handleAcceptClick} className="btn-v font-normal text-3xl self-center">Accept</button>
                    </div>
                </div>
            )}
            {isUserLoggedIn && invite?.Status === 'Accepted' && (
                <div>
                    <div className="bottom-tray">
                        <Link href='/account/friends' className="btn-v font-normal text-2xl">View Friends</Link>
                    </div>
                </div>
            )}

        </div>
    )
}
export default InvitePage;