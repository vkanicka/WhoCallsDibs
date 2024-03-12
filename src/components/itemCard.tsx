import Item from "@/data/models/item";
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    item: Item;
}

const ItemCard = ({ item }: Props) => {
    return (
        <Link className="flex flex-col rounded-lg w-full p-2 border border-sold border-green-300 hover:cursor-pointer bg-green-700" href={`/item/${item.$id}/`}>
            <h3 className="text-lg font-semibold">{item.ItemName}</h3>
            {item.ImageURL && (
                <Image
                className="self-center w-full aspect-square object-cover"
                width={50}
                height={50}
                src={item.ImageURL}
                alt={`User photo of item ${item.ItemName}`}
            />
            )}
        </Link>
    )
}
export default ItemCard;