'use client'
import SUBNAV_TABS from "@/data/const/subNavTabs"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Subnav = () => {
    const pathname = usePathname();

    return (
        <nav className="px-2 pt-14 pb-2 text-green-400">
            <div className="space-x-2 pt-2 pb-6">
                {Object.entries(SUBNAV_TABS.itemTabs).map((tab, tabIndex) => {
                    return (
                        <Link className={`subnav-item ${pathname === tab[1].path ? 'rounded-3xl bg-ikigai-700' : ''}`} key={tabIndex} href={tab[1].path}>{tab[1].text}</Link>
                    )
                })}
            </div>
        </nav>
    )
}
export default Subnav