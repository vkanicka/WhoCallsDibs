/**
 * useRouter only works in client components
 */

'use client'
import { useRouter } from 'next/navigation'
import { AddItemFx } from '@data/client'
import { AddImageStorageFx } from '@data/client'
import { GetImageStorageFx } from '@data/client'
import OptionalComponent from '@components/optional'

const AddItem = () => {

    const router = useRouter()

    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { name, email, description, listingUrl } = payload
        let imageUrl: string;
        AddImageStorageFx().then((addImageResult) => {
            GetImageStorageFx(addImageResult as string).then((getImageResult) => {
                imageUrl = getImageResult as string;
            }).then(() => {
                try {
                    const addItemResponse = AddItemFx({ ItemName: name.toString(), ImageURL: imageUrl, ListingURL: listingUrl.toString(), Email: email.toString(), Description: description.toString() })
                    // console.log(addItemResponse)
                    return addItemResponse
                }
                catch (error) {
                    console.log(error)
                }
            }
            ).then((addItemResponse) => {
                // add error response path if undefined
                const newItemPath = `/item/${addItemResponse?.$id}`
                Success(newItemPath)
                })
        })
    }
    
    return (
        <form onSubmit={submitForm} className="flex flex-col gap-2">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input name='name' id='name' className="text-green-950" required type="text"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo  <OptionalComponent/></label>
                <input id="uploader" name='photo' className="text-green-950" type="file"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Email</label>
                <input name='email' id='email' className="text-green-950" required type="email"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Item Listing URL<OptionalComponent/></label>
                <input name='listingUrl' id='listingUrl' className="text-green-950" type="url"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Description <OptionalComponent/></label>
                <input maxLength={300} id="description" name='description' className="text-green-950 p-2 text-left justify-start align-top text-wrap row-span-5 flex-wrap whitespace-pre-wrap cols-50 columns-10" type='text'></input>
            </div>
            {/* <button className="border p-1 border-solid border-green-300 rounded-lg hover:font-bold" type="submit">Submit</button> */}
            <div className='bg-green-800 sticky bottom-0 top-0 left-0 right-0 w-full py-2'>
                <button type='submit' className='text-2xl w-full bg-lime-600 px-4 py-2 border-2 rounded-xl border-green-600 border-solid text-green-900 font-semibold'>Submit</button>
            </div>
        </form>
    )
}
export default AddItem