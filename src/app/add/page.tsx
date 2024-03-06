'use client'
import { AddItemFx } from '../../data/client'

const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)
    console.log(payload)
    const { name, email } = payload
    AddItemFx({ItemName: name.toString(), Email: email.toString()})

}

const AddItem = () => {
    return (
        <form onSubmit={submitForm} className="flex flex-col gap-2">
            <div className="flex flex-col text-green-100">
                <label>Item Name</label>
                <input name='name' id='name' className="text-green-950" required type="text"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Photo</label>
                <input name='photo' className="text-green-950" type="file"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Email</label>
                <input name='email' id='email' className="text-green-950" required type="email"></input>
            </div>
            <button className="border p-1 border-solid border-green-300 rounded-lg hover:font-bold" type="submit">Submit</button>
        </form>
    )
}
export default AddItem