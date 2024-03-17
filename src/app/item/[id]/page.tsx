/**
 * useEffect only works in client components
 */

'use client'
import { GetItem, UpdateItemIsDibbed } from "@/data/client";
import Item from "@/data/models/item";
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const ItemPage = () => {
    const [item, setItem] = useState<Item>()
    const [clickedCallDibs, setClickedCallDibs] = useState(false)
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
        const hasUpdated = await UpdateItemIsDibbed(item?.$id as string)
        const nextPagePath = `/item/${item?.$id}/calledDibs`
        !!hasUpdated && hasUpdated.isDibbed == true && SendToNextPage(nextPagePath)
    }

    const handleBackButton = () => {
        setClickedCallDibs(false)
    }

    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])

    return (
        <div className="flex flex-col">
            {!!item ? (
                <div className="flex flex-col">
                    <p className="text-green-950 text-2xl">{item.ItemName}</p>
                    <div className="flex justify-center">
                        {item.ImageURL && (
                            <Image
                                className="place-self-center w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 rounded-xl aspect-square object-cover"
                                width={100}
                                height={100}
                                src={item.ImageURL}
                                alt={`User photo of item ${item.ItemName}`}
                            />
                        )}
                    </div>
                    {item.Description && (
                        <p className="text-lime-200">{item.Description}</p>
                    )}
                    {/* Image gallery swipe/grid if multiple */}
                    {/* Is owner offering to pay postage */}
                    {/* Ask quesiton / message owner if consent */}
                    {/* View Q&A */}

                    <div className="absolute w-full bottom-0 left-0 right-0 p-2">
                        <button onClick={()=>setClickedCallDibs(true)} className="w-full border-2 border-solid border-violet-400 rounded-xl py-4 px-4 bg-green-600 text-violet-900">
                    I call dibs!
                        </button>
                    </div>
                </div>
            ) : (
                    <p>Loading...</p>
            )}
            {!!clickedCallDibs && !!item && (
                <div className="bg-green-900 flex flex-col place-items-center justify-center text-lime-200 absolute h-screen w-screen top-0 left-0 z-999">
                    <h1 className="text-3xl">Confirm Calling Dibs</h1>
                    <div className="w-full m-4 flex flex-col items-center space-y-4">
                        <h3 className="text-xl">{item.ItemName}</h3>
                        {item.ImageURL && (<Image
                            className="self-center w-fit aspect-square object-cover"
                            width={100}
                            height={100}
                            src={item?.ImageURL}
                            alt={`User photo of item ${item.ItemName}`}
                        />)}
                    </div>
                    <div className="flex gap-4 absolute bottom-0 w-full left-0 right-0 p-4">
                        <button className="w-1/2 bg-green-700 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={handleBackButton}>Back</button>
                        <button className="w-1/2 bg-green-700 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={confirmCallingDibs}>Confirm</button>
                    </div>
                </div>

            )}
            
        </div>
    )
}
export default ItemPage;