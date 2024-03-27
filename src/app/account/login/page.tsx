/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

import { GetAccount, LoginUser } from "@/data/client";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { UserContext } from '@data/context/user';

const LoginPage = () => {
    const userCtx = useContext(UserContext);

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
        }).then((loginUserResponse) => {
            try {
            GetAccount().then((result) => {
                if (result) {
                    userCtx.loginUser(result)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
            }).then(() => {
                Success(`/browse/`)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
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
                    <button type='submit' className='btn-a'>Login</button>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;