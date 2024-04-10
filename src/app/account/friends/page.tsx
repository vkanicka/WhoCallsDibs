'use client'

import { GetFriendsDetails, GetUserDetails, GetUserDetailsByAuthId } from "@/data/client";
import { UserContext } from "@/data/context/user";
import UserDetails from "@/data/models/userDetails";
import { Models } from "appwrite";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserPlus } from "react-feather";

const FriendsPage = () => {
    const userCtx = useContext(UserContext);
    const [friends, setFriends] = useState<Models.Document[]>([])

    useEffect(() => {
        if (userCtx.user.$id) {
            GetUserDetailsByAuthId(userCtx.user.$id)
            .then((userDetailResults) => {
                return userDetailResults?.documents[0].friends
            })
            .then((friendsIds: string[]) => {
                return GetFriendsDetails(friendsIds)
            })
            .then((friendDetailResults) => {
                friendDetailResults && setFriends(friendDetailResults)
            })
        }
        
    }, [userCtx])

    return (
        <div>
            <h1>My Friends</h1>
            <ul>
                {!!friends.length && friends.map((friend, index) => {
                    return (
                        <li key={index}>{friend.name}</li>
                    )
                })}
            </ul>
            <Link href={'/account/invite'} className="absolute right-6 bottom-48 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <UserPlus size={30} className='self-center text-limeshine-300' />
            </Link>
        </div>
    )
}
export default FriendsPage;