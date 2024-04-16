/**
 * useEffect only works in client components
 */

'use client'
import Link from 'next/link'
import { GetItem, UpdateItemIsDibbed } from "@data/client";
import Item from "@models/item";
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { UserContext } from '@/data/context/user'
import { useContext } from 'react'
import sendMail from '@/utils/sendMail';
import { Plus } from 'react-feather';

const ItemPage = () => {
    const [item, setItem] = useState<Item>()
    const [clickedCallDibs, setClickedCallDibs] = useState(false)
    const params = useParams()
    const itemId = params?.id
    const userCtx = useContext(UserContext)
    const isDibbed = item?.isDibbed

    const getAndSetItem = async (id: string) => {
        const gottenItem = await GetItem(id)
        setItem(gottenItem)
    }

    const router = useRouter()
    const SendToNextPage = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const confirmCallingDibs = async () => {
        if (userCtx.user.$id && userCtx.user.email && userCtx.user.name) {
            await UpdateItemIsDibbed(item?.$id as string, userCtx.user.$id, userCtx.user.email, userCtx.user.name)
            .then(() => !!item && sendMail({ user: userCtx.user, item, url: window.location.href }))
            .then(() => SendToNextPage(`/item/${item?.$id}/calledDibs`))
        }
    }

    const handleBackButton = () => {
        setClickedCallDibs(false)
    }

    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])

    return (
        <div className="flex flex-col">
            <Link href={'/item/add'} className="fixed right-6 bottom-48 rounded-full h-12 w-12 bg-verbena-600 z-bubble flex place-content-center shadow-glow shadow-lime-100">
                        <Plus size={30} className='self-center text-limeshine-300' />
            </Link>
            {!!item ? (
                <div className="flex flex-col">
                    <p className="text-green-950 text-2xl">{item.ItemName}</p>
                    <p className="text-gray-600 text-lg">Owner: {item.itemOwnerName}</p>
                    <div className="flex justify-center">
                        {item.ImageURL && (
                            <Image
                                className="transition-opacity place-self-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 rounded-xl aspect-square object-contain"
                                width={400}
                                height={400}
                                src={item.ImageURL}
                                alt={`User photo of item ${item.ItemName}`}
                                priority
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
                    <div>
                        <h3>Categories</h3>
                        <ul>
                            {item.categories?.map((category, index) => {
                                return (
                                    <li key={index}>{category}</li>
                                )
                            })}
                        </ul>
                    </div>

                    {item.ListingURL && (
                        <div>
                            <p>Item Listing URL: </p>
                            <Link rel="noopener noreferrer" target="_blank" className='underline break-words text-violet-500 italic' href={item.ListingURL}>
                                {item.ListingURL}
                            </Link>
                            </div>
                    )}
                    {!isDibbed && (
                        <div className="bottom-tray">
                            <button onClick={()=>setClickedCallDibs(true)} className='btn-v'>
                        I call dibs!
                            </button>
                        </div>
                    )}
                    {!!isDibbed && (
                        <div className="bottom-tray">
                            <p className='dibs-called'>
                        Dibs called
                            </p>
                        </div>
                    
                    )}
                </div>
            ) : (
                    <p>Loading...</p>
            )}
            {!!clickedCallDibs && !!item && (
                <div className="bg-ikigai-800 flex flex-col place-items-center justify-center text-lime-200 fixed h-full w-full top-0 left-0 z-thumb">
                    <h1>Confirm Calling Dibs</h1>
                    <div className="w-full m-4 flex flex-col items-center space-y-4">
                        <h3 className="text-xl">{item.ItemName}</h3>
                        {item.ImageURL && (<Image
                            className="self-center w-fit aspect-square object-contain"
                            width={100}
                            height={100}
                            src={item?.ImageURL}
                            alt={`User photo of item ${item.ItemName}`}
                            priority
                        />)}
                    </div>
                    <div className="flex gap-6 fixed bottom-0 w-full left-0 right-0 p-6">
                        <button className="btn-v w-1/2 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={handleBackButton}>Back</button>
                        <button className="btn-v w-1/2 ring-2 ring-violet-300 py-4 px-8 rounded-xl" onClick={confirmCallingDibs}>Confirm</button>
                    </div>
                </div>

            )}
            
        </div>
    )
}
export default ItemPage;