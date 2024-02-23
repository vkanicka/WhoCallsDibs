import Link from 'next/link'
const Header = () => {
    return (
        <header className="w-full bg-green-950 fixed p-2 text-green-200">
            <Link href='./'>
                <h1>Want this?</h1>
            </Link>
        </header>
    )
}
export default Header;