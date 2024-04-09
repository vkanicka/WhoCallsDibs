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
import { AcceptInvite, GetInvite, GetUserDetails, GetUserDetailsByAuthId, IgnoreInvite, UpdateInvite, UpdateUserDetails } from "@/data/client";
import Invite from "@/data/models/invite";

const InvitePage = () => {
    const [invite, setInvite] = useState<Invite>()
    const params = useParams()
    const userCtx = useContext(UserContext)
    const isUserLoggedIn = !!userCtx.user.$id
    const { id: inviteId } = params

    const handleIgnoreClick = () => {
        inviteId && IgnoreInvite(inviteId as string)
    }
    const handleAcceptClick = async () => {
        const currentUserBId = userCtx.user.$id
        const userAId = invite?.userAId
        let userADetailId: string;
        userAId && await GetUserDetailsByAuthId(userAId).then((result) => {
            console.log(result)
            if (result?.documents[0]) {
                console.log(result.documents[0].$id)
                userADetailId = result.documents[0].$id
            }
        })
        let userBDetailId: string;
        currentUserBId && await GetUserDetailsByAuthId(currentUserBId).then((result) => {
            // console.log(result)
            if (result?.documents?.[0]) {
                userBDetailId = result.documents[0].$id
            }
        }).then(() => {
            inviteId && AcceptInvite(inviteId as string)
        }).then(() => {
            if (currentUserBId !== userAId) {
                if (!!userAId && !!userBDetailId) {
                    !!userAId && GetUserDetailsByAuthId(userAId).then((userADetails) => {
                        const newFriends: string[] = userADetails?.documents?.[0]?.friends ?? []
                        if (!!currentUserBId && !newFriends.includes(currentUserBId)) {
                            newFriends.push(currentUserBId)
                            UpdateUserDetails({id: userADetailId, newFriends: newFriends})
                        }
                    })
                    GetUserDetails(userBDetailId).then((userBDetails) => {
                        const newFriends: string[] = userBDetails?.friends ?? []
                        if (!!userAId && !newFriends.includes(userAId)) {
                            newFriends.push(userAId)
                            UpdateUserDetails({id: userBDetailId, newFriends: newFriends})
                        }
                    })
                }
            }
        })
        
        
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

            <p>{invite?.userAName ? invite.userAName : 'Someone'} has invited {invite?.userBName ? invite.userBName : 'you'} to be friends!</p>

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