/**
 * useRouter only works in Client Components
 */

'use client'
import { useRouter } from "next/navigation";

const CallDibsPage = () => {
    const router = useRouter()
    const handleClick = () => {
        router.push('/browse/')
    }
    return (
        <div>
            <h1>Success!</h1>
            <h2>You Called Dibs</h2>
            <h4>What happens next?</h4>
            <p>The owner will reach out to you to setup transfer.</p>
            <div className='absolute bottom-0 left-0 right-0 p-2'>
                <button className="w-full bg-green-700 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={handleClick}>Back to browsing</button>
            </div>
        </div>
    )
}
export default CallDibsPage;