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
            }
            CreateInvite(inputData)
            .then((response) => Success(`/account/invite/${response?.$id}`))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-between h-full space-y-6 text-2xl">
            {/* <h1>Create an Invite</h1> */}

            <p>Only friends can view and call dibs on each other&#39;s items.</p>

            <p>Generate an invite to share with one person.</p>

            <p>Click the button below to generate a link to share with one person.</p>
            
            <p>After creating an invite below, copy paste from the address bar or tap the <Share className="inline" /> icon next to the address bar</p>
            

            <div className="bottom-tray">
                    <button onClick={handleAddFriendClick} className="btn-v">
                        Create Invite
                    </button>
            </div>
        </div>

    )
}
export default InvitePage