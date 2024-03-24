'use client'
import SUBNAV_TABS from "@/data/const/subNavTabs"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Subnav = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-green-900 pt-14 pb-2 flex flex-col lg:flex-row lg:justify-between text-green-400 gap-6">
            <div className="space-x-8">
                {Object.entries(SUBNAV_TABS.itemTabs).map((tab, tabIndex) => {
                    return (
                        <Link className={`${pathname === tab[1].path ? 'underline bg-green-800 font-bold' : 'no-underline'} p-4`} key={tabIndex} href={tab[1].path}>{tab[1].text}</Link>
                    )
                })}
            </div>
            <div className="space-x-8">
                {Object.entries(SUBNAV_TABS.accountTabs).map((tab, tabIndex) => {
                    return (
                        <Link className={`${pathname === tab[1].path ? 'underline bg-green-800 font-bold' : 'no-underline'} p-4`} key={tabIndex} href={tab[1].path}>{tab[1].text}</Link>


                        
                    )
                })}
            </div>
        </nav>
    )
}
export default Subnav