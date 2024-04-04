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
        <div onClick={handleClick} className="absolute right-6 bottom-32 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
            {isBrowsePage ? <Plus size={50} className='self-center text-limeshine-300' /> : <Search size={50} className='self-center text-limeshine-300' />}
        </div>
    )
}
export default Bubble