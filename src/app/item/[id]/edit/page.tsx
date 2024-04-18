/**
 * useRouter only works in client components
 */

'use client'
import { useParams, useRouter } from 'next/navigation'
import { AddResizedImageToStorage, GetItem, UpdateItem } from '@data/client'
import OptionalComponent from '@components/optional'
import { useEffect, useState } from 'react'
import Item from '@models/item'
import CATEGORIES from '@data/const/categories'
import Image from 'next/image'
import { ArrowLeft, CheckCircle,  X, } from 'react-feather'
import resizeImage from '@/utils/resizeimage'
import Link from 'next/link'

const AddItem = () => {
    const [item, setItem] = useState<Item>()
    const [newFileState, setNewFileState] = useState<File>()
    const params = useParams()
    const itemId = params?.id

    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const getAndSetItem = async (id: string) => {
        const gottenItem = await GetItem(id)
        setItem(gottenItem)
    }

    //@ts-expect-error
    const handleNameChange = async (e) => {
        const value = e.target.value
        const newItem = { ...item }
        //@ts-expect-error
        setItem({...newItem, ItemName: value})
    }
    //@ts-expect-error
    const handleDescriptionChange = async (e) => {
        const value = e.target.value
        const newItem = { ...item }
        //@ts-expect-error
        setItem({...newItem, Description: value})
    }
    //@ts-expect-error
    const handleListingURLChange = async (e) => {
        const value = e.target.value
        const newItem = { ...item }
        //@ts-expect-error
        setItem({...newItem, ListingURL: value})
    }

    const deleteImage = () => {
        const newItem = { ...item }
        delete newItem?.ImageURL
        //@ts-expect-error
        setItem(newItem)
    }

    //@ts-expect-error
    const uploadImage = (event) => {
        resizeImage(event, setNewFileState)
    };

    //@ts-expect-error
    const handleCheckboxToggle = (category) => {
        
        if (item?.categories?.includes(category)) {
            const newItem = { ...item, categories: item.categories.filter(x => x !== category) }
            setItem(newItem)
        } else {
            const newItem = { ...item }
            newItem?.categories?.push(category)
            //@ts-expect-error
            setItem(newItem)
        }
    }

    // @ts-expect-error
    const submitForm = async (e) => {
        e.preventDefault();

        if (newFileState) {
            AddResizedImageToStorage(newFileState)
                .then((AddImageResult) => {
                    const newImageId = AddImageResult?.$id
                    const newImageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string}/files/${newImageId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string}`
                    if (!!item) {
                        try {
                            UpdateItem({ ...item, imageId: newImageId, ImageURL: newImageUrl })
                                .then(() => {
                                    Success(`/item/${item?.$id}`)
                                })
                        }
                        catch (error) {
                            console.log(error)
                        }
                    }
            })
        }
        else {
            if (!!item) {
                    try {
                        UpdateItem(item)
                            .then(() => {
                                Success(`/item/${item?.$id}`)
                            })
                    }
                    catch (error) {
                        console.log(error)
                    }
                }

        }
    }
    
    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])

    return !!item && (
        <form onSubmit={submitForm} className="flex flex-col gap-2 mb-36">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input onChange={handleNameChange} name='name' id='name' className="text-green-950" required type="text" value={item?.ItemName}></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo</label>
                {item?.ImageURL ? (
                    <div className='relative w-fit justify-center'>
                        <Image priority src={item?.ImageURL} alt={'item image'} width={300} height={300} className='border-limeshine-300 border border-solid rounded-xl my-2' />
                        <X onClick={deleteImage} size={30} className='bg-verbena-900 rounded-full absolute top-3 right-1 self-center ml-1 text-limeshine-300' />
                    </div>
                ) : (
                    <input onChange={uploadImage} id="uploader" name='photo' className="text-green-950" type="file" accept="image/*"></input>
                )}
            </div>
            <div className="flex flex-col text-green-100">
                <label>Item Listing URL<OptionalComponent/></label>
                <input onChange={handleListingURLChange} name='listingUrl' id='listingUrl' className="text-green-950" type="url" placeholder={item?.ListingURL}></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Description <OptionalComponent/></label>
                <input onChange={handleDescriptionChange} value={item?.Description} maxLength={300} id="description" name='description' className="text-green-950 p-2 text-left justify-start align-top text-wrap row-span-5 flex-wrap whitespace-pre-wrap cols-50 columns-10" type='text'></input>
            </div>
            <div className="flex flex-col text-green-100 overlflow-y-scroll">
                <h4>Categories <span className='text-sm text-gray-500 italic'>*Select all that apply</span></h4>
                {CATEGORIES.map((category, index) => {
                    return (
                        <label key={index} className='text-xl w-full md:w-fit py-[3px] flex flex-row gap-2 bg-ikigai-600 bg-opacity-20 my-1 px-2 items-center rounded-xl'><input id={category} name={category} onChange={()=>handleCheckboxToggle(category)} checked={item?.categories?.includes(category)} className="text-green-950 self-center my-auto" type='checkbox'></input>{category}</label>
                    )
                })}
            </div>
            <div className='bottom-tray'>
                <Link href={`/item/${item.$id}`} className='btn-v flex items-center justify-center gap-4'><ArrowLeft/>Cancel</Link>
                <button type='submit' className='btn-v flex items-center justify-center gap-4'><CheckCircle/>Update</button>
            </div>
        </form>
    )
}
export default AddItem