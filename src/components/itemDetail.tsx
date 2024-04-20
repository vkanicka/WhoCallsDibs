import { UpdateItemReceived, UpdateItemSent } from "@/data/client"
import Item from "@/data/models/item"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CheckCircle, RefreshCw } from "react-feather"

type Props = {
    item: Item
    userIsOwner?: boolean
    completed?: boolean
    processReceived?: Function
}

const ItemDetail = ({ item, userIsOwner, completed, processReceived }: Props) => {
    const [sent, setSent] = useState(item.hasSent)
    const [received, setReceived] = useState(item.hasReceived)
    const [loading, setLoading] = useState(false)
    
    const handleSentClick = async () => {
        setLoading(true)
        const newStatus = !sent
        await UpdateItemSent(item.$id, newStatus)
        setSent(newStatus)
        setLoading(false)
    }
    const handleReceivedClick = async () => {
        setLoading(true)
        const newStatus = !received
        await UpdateItemReceived(item.$id, newStatus)
        setReceived(newStatus)
        setLoading(false)
        !!processReceived && processReceived()
    }
    return (
        !!item && (
            <li className="flex flex-row justify-between item-card rounded-xl">
                <div className="flex gap-2 items-center">
                    {!!item.ImageURL && (
                        <Image width={50 } height={50} src={item.ImageURL} alt={`Image of ${item.ItemName}`} />
                    )}
                    <Link href={`/item/${item.$id}`}>{item.ItemName} {userIsOwner ? `for ${item.dibsCallerName}` : `from ${item.itemOwnerName}`}</Link>
                </div>
                {!loading && !completed && <button onClick={userIsOwner ? handleSentClick : handleReceivedClick} className={`text-xs rounded-full }`}><CheckCircle className={`${(userIsOwner && !sent || !userIsOwner && !received) ? 'text-primrose-400' : 'text-limeshine-300'}`} size={48} /></button>}
                {loading && <RefreshCw size={48} className="animate-spin text-primrose-800 self-center" />}
    
            </li>
        )
    )
}
export default ItemDetail;