import Link from "next/link"

const Subnav = () => {
    return (
        <nav className="bg-green-900 p-2 pt-14 flex text-green-400 gap-6">
            <Link href='/add/'>Add New</Link>
            <Link href='/browse/'>Browse</Link>
            <Link href='/categories/'>Categories</Link>
            <Link href='/about/'>About</Link>
        </nav>
    )
}
export default Subnav