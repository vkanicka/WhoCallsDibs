'use client'
import DibsButton from "@/components/dibsButton";
import ItemCard from "@/components/itemCard";
import { GetItem } from "@/data/client";
import Item from "@/data/models/item";
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const ItemPage = () => {
    const [item, setItem] = useState<Item>()
    const [clickedCallDibs, setClickedCallDibs] = useState(false)
    const [confirmedCallingDibs, setConfirmedCallingDibs] = useState(false)
    const params = useParams()
    const { id: itemId } = params

    const getAndSetItem = async (id: string) => {
        const gottenItem = await GetItem(id)
        setItem(gottenItem)
    }

    const router = useRouter()
    const SendToNextPage = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const confirmCallingDibs = () => {
        setConfirmedCallingDibs(true)
        setClickedCallDibs(false)
        const nextPagePath = `/item/${item?.$id}/calledDibs`
        SendToNextPage(nextPagePath)
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

                    <div className="sticky bottom-0">
                        <DibsButton item={item} setClickedCallDibs={setClickedCallDibs} />
                    </div>
                </div>
            ) : (
                    <p>Loading...</p>
            )}
            {!!clickedCallDibs && !!item && (
                <div className="bg-green-900 text-green-100 flex flex-col place-items-center justify-around absolute h-screen w-screen top-0 left-0 z-999">
                    <h1>Confirm Calling Dibs</h1>
                    <ItemCard item={item} />
                    <button className="bg-green-700 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={confirmCallingDibs}>Confirm</button>
                </div>

            )}
            
        </div>
    )
}
export default ItemPage;