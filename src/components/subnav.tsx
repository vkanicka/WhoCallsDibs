import Link from "next/link"

const Subnav = () => {
    return (
        <nav className="bg-green-900 p-2 px-4 pt-14 flex justify-between text-green-400 gap-6">
            <div className="space-x-8">
                <Link href='/add/'>Add New</Link>
                <Link href='/browse/'>Browse</Link>
            </div>
            {/* <Link href='/categories/'>Categories</Link> */}
            {/* <Link href='/about/'>About</Link> */}
            <div className="space-x-8">
                <Link href='/account/'>Account</Link>
                <Link href='/login/'>Login</Link>
            </div>
        </nav>
    )
}
export default Subnav