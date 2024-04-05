'use client'
import { Copy, Share } from "react-feather"
import { CreateInvite } from "@/data/client";
import Invite from "@/data/models/invite";
import { UserContext } from "@/data/context/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const InvitePage = () => {
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
                userADetailsId: userCtx.userDetailsId as string
            }
            const response = CreateInvite(inputData).then((response)=>Success(`/account/invite/${response?.$id}`))
            return response
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(userCtx)
    
    return (
        <div className="flex flex-col justify-between h-full space-y-6 text-2xl">
            {/* <h1>Create an Invite</h1> */}

            <p>Becoming friends allows you to view and call dibs on each other&#39;s items.</p>

            <p>To add a friend, create an invite.</p>

            <p>Click the button below to generate a link to share with one person.</p>
            
            <p>From a mobile device, tap the <Share className="inline" /> icon next to the address bar, and select the app of your choice.</p>
            <p>You can also select the copy <Copy className="inline" /> icon or just copy from the address bar and paste the URL wherever you need to. </p>
            

            <div className="bottom-tray">
                    <button onClick={handleAddFriendClick} className="btn-v">
                        Create Invite
                    </button>
            </div>
        </div>

    )
}
export default InvitePage