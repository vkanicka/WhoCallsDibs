'use client'
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
        <div>
            <p>{params.id}</p>
            {!!item ? (
                <div>
                    <p>{item.ItemName}</p>
                    <Image
                        width={50}
                        height={50}
                        src={item.ImageURL}
                        alt={`User photo of item ${item.ItemName}`}
                    />
                </div>
            ) : (
                    <p>Loading...</p>
            )}
            
        </div>
    )
}
export default ItemPage;