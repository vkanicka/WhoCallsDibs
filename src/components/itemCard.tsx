import Item from "@/data/models/item";
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    item: Item;
}

const ItemCard = ({ item }: Props) => {
    console.log(item.ImageURL)
    return (
        <Link href={`/item/${item.$id}/`}>
            <p>{item.ItemName}</p>
            <Image
                width={50}
                height={50}
                src={item.ImageURL}
                alt={`User photo of item ${item.ItemName}`}
            />
        </Link>
    )
}
export default ItemCard;