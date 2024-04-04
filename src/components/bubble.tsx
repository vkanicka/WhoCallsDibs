'use client'
import { Plus, Search } from 'react-feather'
import { useRouter, usePathname } from 'next/navigation'

const Bubble = () => {
    const router = useRouter()
    const pathname = usePathname();
    const isBrowsePage = pathname === '/browse'

    const handleClick = () => {
        router.push(isBrowsePage ? '/item/add' : '/browse')
    }
    return (
        <button onClick={handleClick} className="absolute right-6 bottom-32 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
            {isBrowsePage ? <Plus size={30} className='self-center text-limeshine-300' /> : <Search size={30} className='self-center text-limeshine-300' />}
        </button>
    )
}
export default Bubble