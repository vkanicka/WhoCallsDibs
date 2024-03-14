'use client'
import { AddItemFx } from '../../data/client'
import { AddImageStorageFx } from '../../data/client'
import { GetImageStorageFx } from '../../data/client'
import { useRouter } from 'next/navigation'



const AddItem = () => {

    const router = useRouter()

    const Success = (newItemPath: string) => {
        router.push(newItemPath)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { name, email, description } = payload
        let imageUrl: string;
        AddImageStorageFx().then((addImageResult) => {
            GetImageStorageFx(addImageResult as string).then((getImageResult) => {
                imageUrl = getImageResult as string;
            }).then(() => {
                const addItemResponse = AddItemFx({ ItemName: name.toString(), ImageURL: imageUrl, Email: email.toString(), Description: description.toString() })
                // console.log(addItemResponse)
                return addItemResponse
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
                <label>Photo  <span className='text-gray-400 italic'>*Optional</span></label>
                <input id="uploader" name='photo' className="text-green-950" type="file"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Email</label>
                <input name='email' id='email' className="text-green-950" required type="email"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Description <span className='text-gray-400 italic'>*Optional</span></label>
                <input maxLength={300} id="description" name='description' className="text-green-950 p-2 text-left justify-start align-top text-wrap row-span-5 flex-wrap whitespace-pre-wrap cols-50 columns-10" type='text'></input>
            </div>
            <button className="border p-1 border-solid border-green-300 rounded-lg hover:font-bold" type="submit">Submit</button>
        </form>
    )
}
export default AddItem