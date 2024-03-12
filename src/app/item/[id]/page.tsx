'use client'
import DibsButton from "@/components/dibsButton";
import ItemCard from "@/components/itemCard";
import { GetItem, UpdateItemIsDibbed } from "@/data/client";
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

    const confirmCallingDibs = async () => {
        setConfirmedCallingDibs(true)
        const hasUpdated = await UpdateItemIsDibbed(item?.$id as string)
        const nextPagePath = `/item/${item?.$id}/calledDibs`
        !!hasUpdated && hasUpdated.isDibbed == true && SendToNextPage(nextPagePath)
    }

    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])

    return (
        <div className="flex flex-col">
            {!!item ? (
                <div className="flex flex-col">
                    <p>{item.ItemName}</p>
                    <div>
                        <Image
                            className="place-self-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 rounded-xl aspect-square object-cover"
                            width={200}
                            height={200}
                            src={item.ImageURL}
                            alt={`User photo of item ${item.ItemName}`}
                        />
                    </div>
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
                    <h1 className="text-3xl">Confirm Calling Dibs</h1>
                    <div className="w-full m-4 flex flex-col items-center space-y-4">
                        <h3 className="text-xl">{item.ItemName}</h3>
                        <Image
                            className="self-center w-fit aspect-square object-cover"
                            width={100}
                            height={100}
                            src={item?.ImageURL}
                            alt={`User photo of item ${item.ItemName}`}
                        />
                    </div>
                    <button className="bg-green-700 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={confirmCallingDibs}>Confirm</button>
                </div>

            )}
            
        </div>
    )
}
export default ItemPage;