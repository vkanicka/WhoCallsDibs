/**
 * useRouter only works in client components
 */

'use client'
import { useParams, useRouter } from 'next/navigation'
import { AddItemFx, GetItem, UpdateItemNoImage } from '@data/client'
import { AddImageStorageFx } from '@data/client'
import { GetImageStorageFx } from '@data/client'
import OptionalComponent from '@components/optional'
import { UserContext } from '@/data/context/user'
import { useContext, useEffect, useState } from 'react'
import Item from '@models/item'
import CATEGORIES from '@data/const/categories'
import Image from 'next/image'
import { X } from 'react-feather'

const AddItem = () => {
    const [item, setItem] = useState<Item>()
    const params = useParams()
    const itemId = params?.id

    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const userCtx = useContext(UserContext)

    const getAndSetItem = async (id: string) => {
        const gottenItem = await GetItem(id)
        setItem(gottenItem)
    }
    
    const deleteImage = () => {
        item?.$id && UpdateItemNoImage(item?.$id)
        const newItem = { ...item }
        delete newItem?.ImageURL
        //@ts-expect-error
        setItem(newItem)
    }

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
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { name, description, listingUrl } = payload
        const categories = Object.entries(payload).reduce((acc: string[], [key, value]) => {
            if (value === 'on') {
                acc.push(key);
            }
            return acc;
        }, []);
        const clientFile = (document?.getElementById('uploader') as HTMLInputElement)?.files?.[0] as File
        console.log(clientFile)
        AddImageStorageFx()
        .then((addImageResult) =>
            GetImageStorageFx(addImageResult as string)
        )
        .then((imageStorageResult) => {
            const itemToAdd: Partial<Item> = {
                ItemName: name.toString(),
                ImageURL: imageStorageResult as string,
                Description: description.toString(),
                itemOwnerId: userCtx.user.$id?.toString() ?? '',
                itemOwnerEmail: userCtx.user.email?.toString() ?? '',
                itemOwnerName: userCtx.user.name?.toString() ?? '',
                categories: categories.length ? categories : ['Other']
            }
            if (!!listingUrl) {
                itemToAdd['ListingURL'] = listingUrl.toString()
            }
            try {
                const addItemResponse = AddItemFx(itemToAdd)
                return addItemResponse
            }
            catch (error) {
                console.log(error)
            }
        })
        .then((addItemResponse) => {
            Success(`/item/${addItemResponse?.$id}`)
        })
    }
    
    useEffect(() => {
        getAndSetItem(itemId as string)
    }, [])
    console.log(item?.categories)
    return !!item && (
        <form onSubmit={submitForm} className="flex flex-col gap-2 mb-36">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input name='name' id='name' className="text-green-950" required type="text" placeholder={item?.ItemName}></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo  <OptionalComponent/></label>
                {item?.ImageURL ? (
                    <div className='relative w-fit'>
                        <Image priority src={item?.ImageURL} alt={'item image'} width={200} height={200} className='border-limeshine-300 border border-solid rounded-xl my-2' />
                        <X onClick={deleteImage} size={35} className='absolute top-2 right-1 self-center ml-1 text-primrose-500 hover:text-lime-300' />
                    </div>
                ) : (
                    <input id="uploader" name='photo' className="text-green-950" type="file" accept="image/*"></input>
                )}
            </div>
            <div className="flex flex-col text-green-100">
                <label>Item Listing URL<OptionalComponent/></label>
                <input name='listingUrl' id='listingUrl' className="text-green-950" type="url" placeholder={item?.ListingURL}></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Description <OptionalComponent/></label>
                <input placeholder={item?.Description} maxLength={300} id="description" name='description' className="text-green-950 p-2 text-left justify-start align-top text-wrap row-span-5 flex-wrap whitespace-pre-wrap cols-50 columns-10" type='text'></input>
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
                <button type='submit' className='btn-v'>Submit Edits</button>
            </div>
        </form>
    )
}
export default AddItem