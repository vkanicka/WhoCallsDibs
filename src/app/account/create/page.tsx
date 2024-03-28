/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

import { CreateUser } from "@data/client"
import User from "@models/user"
import Link from "next/link"
import { useRouter } from 'next/navigation'


const CreateAccountPage = () => {
        const router = useRouter()
        const Success = (newItemPath: string) => {
            router.push(newItemPath)
        }

        const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { name, email, password } = payload
        
        const newUser: User = {
            email: email.toString(),
            password: password.toString(),
            name: name.toString(),
        }

        try {
            CreateUser(newUser).then((createUserResponse) => {
                    console.log(createUserResponse)
            }).then(() => {
                    Success(`/account/login/`)
                })
        }
        catch (error) {
            console.log(error)
        }
    }   
    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={submitForm} className="flex flex-col gap-2">
            <div className="flex flex-col text-green-100">
                <label>Name</label>
                <input name='name' id='name' className="text-green-950" required type="text"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Email</label>
                <input name='email' id='email' className="text-green-950" required type="email"></input>
            </div>
            <div className="flex flex-col text-green-100">
                <label>Password</label>
                <input name='password' id='password' className="text-green-950" required type="password"></input>
            </div>
                <div className='bottom-tray'>
                <Link className="btn-v font-normal text-sm" href='/account/login'>Have an Account?<br></br> Login</Link>
                <button type='submit' className='btn-v'>Submit</button>
            </div>
        </form>
        </div>
    )
}
export default CreateAccountPage;