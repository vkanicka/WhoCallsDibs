import Link from "next/link"
import { Gift, Plus, Search, UserPlus, Users } from "react-feather"
import LogoutBubble from "./logoutBubble"
import Bubble from "./bubble"

const AccountThumbNav = () => {
    return (
        <nav className="bottom-tray justify-around">
            <Link href={'/account/dibs'} className="rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <Gift size={30} className='self-center text-limeshine-300' />
            </Link>
            <Link href={'/account/friends'} className="rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <Users size={30} className='self-center text-limeshine-300' />
            </Link>
            <Link href={'/account/invite'} className="rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <UserPlus size={30} className='self-center text-limeshine-300' />
            </Link>
            {/* <LogoutBubble /> */}
            <Link href={'/browse'} className="rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <Search size={30} className='self-center text-limeshine-300' />
            </Link>
            <Link href={'/item/add'} className="rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                <Plus size={30} className='self-center text-limeshine-300' />
            </Link>


        </nav>
    )
}
export default AccountThumbNav