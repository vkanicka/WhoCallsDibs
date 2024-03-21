/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

import { LoginUser } from "@/data/client"
import { useRouter } from "next/navigation";

const LoginPage = () => {
        const router = useRouter()
        const Success = (newItemPath: string) => {
            router.push(newItemPath)
        }
    
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        const { email, password } = payload
        
        try {
            LoginUser({ email: email.toString(), password: password.toString() }).then((loginUserResponse) => {
                console.log(loginUserResponse)
        }).then(() => {
                Success(`/account/view/`)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitForm} className="flex flex-col gap-2">
                <div className="flex flex-col text-green-100">
                    <label>Email</label>
                    <input name='email' id='email' className="text-green-950" required type="email"></input>
                </div>
                <div className="flex flex-col text-green-100">
                    <label>Password</label>
                    <input name='password' id='password' className="text-green-950" required type="password"></input>
                </div>
                <div className='bg-green-800 sticky bottom-0 top-0 left-0 right-0 w-full py-2'>
                    <button type='submit' className='text-2xl w-full bg-lime-600 px-4 py-2 border-2 rounded-xl border-green-600 border-solid text-green-900 font-semibold'>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;