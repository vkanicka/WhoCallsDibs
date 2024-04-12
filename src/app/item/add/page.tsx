/**
 * useRouter only works in client components
 */

'use client'
import { useRouter } from 'next/navigation'
import { AddItemFx } from '@data/client'
import { AddImageStorageFx } from '@data/client'
import { GetImageStorageFx } from '@data/client'
import OptionalComponent from '@components/optional'
import { UserContext } from '@/data/context/user'
import { useContext } from 'react'
import Item from '@models/item'
import CATEGORIES from '@data/const/categories'

const AddItem = () => {

    const router = useRouter()
    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const userCtx = useContext(UserContext)

    // @ts-expect-error
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { name, description, listingUrl, ...CATEGORIES } = payload
        const categories = Object.entries(payload).reduce((acc: string[], [key, value]) => {
            if (value === 'on') {
                acc.push(key);
            }
            return acc;
        }, []);
        let imageUrl: string;
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
    
    return (
        <form onSubmit={submitForm} className="flex flex-col gap-2 mb-36">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input name='name' id='name' className="text-green-950" required type="text"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo  <OptionalComponent/></label>
                <input id="uploader" name='photo' className="text-green-950" type="file"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Item Listing URL<OptionalComponent/></label>
                <input name='listingUrl' id='listingUrl' className="text-green-950" type="url"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Description <OptionalComponent/></label>
                <input maxLength={300} id="description" name='description' className="text-green-950 p-2 text-left justify-start align-top text-wrap row-span-5 flex-wrap whitespace-pre-wrap cols-50 columns-10" type='text'></input>
            </div>
            <div className="flex flex-col text-green-100 overlflow-y-scroll">
                <h4>Categories <span className='text-sm text-gray-500 italic'>*Select all that apply</span></h4>
                {CATEGORIES.map((category, index) => {
                    return (
                        <div className='flex space-x-2 py-[2px]' key={index}>
                            <input id={category} name={category} className="text-green-950" type='checkbox'></input>
                            <label className='text-xl'>{category}</label>
                        </div>
                    )
                })}
            </div>
            <div className='bottom-tray'>
                <button type='submit' className='btn-v'>Submit</button>
            </div>
        </form>
    )
}
export default AddItem