import Item from "@models/item";
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    item: Item;
}

const ItemCard = ({ item }: Props) => {
    return (
        <Link className="item-card" href={`/item/${item.$id}/`}>
            <h3 className="text-plum-800 text-xl font-semibold">{item.ItemName}</h3>
            {item.ImageURL && (
                <Image
                className="transition-opacity self-center w-full aspect-square object-contain"
                width={175}
                height={175}
                src={item.ImageURL}
                alt={`User photo of item ${item.ItemName}`}
            />
            )}
        </Link>
    )
}
export default ItemCard;