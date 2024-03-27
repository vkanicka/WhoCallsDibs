/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

import { LogoutUser } from "@/data/client"
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { UserContext } from '@data/context/user';

const LogoutPage = () => {
    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }
    const userCtx = useContext(UserContext);
    
    const submitLogout = async (e) => {
        e.preventDefault();
        try {
            LogoutUser().then((logoutUserResponse) => {
                console.log(logoutUserResponse)
                userCtx.logoutUser()

        }).then(() => {
                Success(`/account/login/`)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button className="btn-a" onClick={submitLogout}>Logout</button>
        </div>
    )
}
export default LogoutPage;