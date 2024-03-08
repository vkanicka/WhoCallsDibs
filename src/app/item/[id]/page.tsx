'use client'
import DibsButton from "@/components/dibsButton";
import { GetItem } from "@/data/client";
import Item from "@/data/models/item";
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const ItemPage = () => {
    const [item, setItem] = useState<Item>()
    const params = useParams()
    const { id: itemId } = params
    console.log(itemId)
    console.log(params)

    const getAndSetItem = async (id: string) => {
        const gottenItem = await GetItem(id)
        console.log(gottenItem)
        setItem(gottenItem)
    }

    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])

    return (
        <div className="flex flex-col">
            {!!item ? (
                <div className="flex flex-col">
                    <p>{item.ItemName}</p>
                    <Image
                        className="place-self-center w-full py-2 rounded-xl aspect-square object-cover"
                        width={200}
                        height={200}
                        src={item.ImageURL}
                        alt={`User photo of item ${item.ItemName}`}
                    />
                    {/* Image gallery swipe/grid if multiple */}
                    {/* Is owner offering to pay postage */}
                    {/* Description if provided */}
                    {/* Ask quesiton / message owner if consent */}
                    {/* View Q&A */}

                    {/* Make footer button sticky */}
                    <div className="sticky bottom-0">
                        <DibsButton item={item} />
                    </div>
                </div>
            ) : (
                    <p>Loading...</p>
            )}
            
        </div>
    )
}
export default ItemPage;