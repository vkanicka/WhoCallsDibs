import Link from 'next/link'
const Header = () => {
    return (
        <header className="w-full bg-green-950 fixed p-2 text-green-200">
            <Link href='/'>
                <h1 className='text-2xl'>Who Calls Dibs?</h1>
            </Link>
        </header>
    )
}
export default Header;