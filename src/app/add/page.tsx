'use client'
import { AddItemFx } from '../../data/client'

const AddItem = () => {
    return (
        <form className="flex flex-col gap-2">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input id='name' className="text-green-950" required type="text"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo</label>
                <input className="text-green-950" type="file"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Email</label>
                <input id='email' className="text-green-950" required type="email"></input>
            </div>
            <button onClick={() => AddItemFx({ ItemName: 'Test2', Email: 'vkanicka@gmail.com'})} className="border p-1 border-solid border-green-300 rounded-lg hover:font-bold" type="submit">Submit</button>
        </form>
    )
}
export default AddItem