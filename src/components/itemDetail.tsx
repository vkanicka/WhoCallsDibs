import Item from "@/data/models/item"
import Link from "next/link"

type Props = {
    item: Item
    userIsOwner: boolean
}

const ItemDetail = ({ item, userIsOwner }: Props) => {
    console.log(item)
    return (
        !!item && (
            <li className="flex justify-between">
                <Link href={`/item/${item.$id}`}>{item.ItemName}</Link>
                <p>{userIsOwner ? item.dibsCallerName : item.itemOwnerName}</p>
    
            </li>
        )
    )
}
export default ItemDetail;