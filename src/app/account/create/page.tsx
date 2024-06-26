/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

import { UserContext } from "@/data/context/user"
import { CreateUser, CreateUserDetails } from "@data/client"
import User from "@models/user"
import { Models } from "appwrite"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from "react"


const CreateAccountPage = () => {

    const SuspenseWrapper = () => {
        const params = useSearchParams()
        const inviteId: string | null = params?.get('invite') ?? ''

            const router = useRouter()
            const Success = (newPath: string) => {
                router.push(newPath)
            }

            const submitForm = async (e: any) => {
                e.preventDefault();
                const formData = new FormData(e.target)
                const payload = Object.fromEntries(formData)
                const { name, email, password } = payload
                
                const newUser: Partial<Models.User<Models.Preferences>> | Partial<User> = {
                    email: email.toString(),
                    password: password.toString(),
                    name: name.toString(),
                }

                try {
                    // @ts-expect-error
                    CreateUser(newUser)
                    .then((createdUser) => {
                        const newUserDetails = {
                            authId: createdUser?.$id,
                            email: createdUser?.email,
                            name: createdUser?.name,
                        }
                        createdUser?.$id && CreateUserDetails(newUserDetails)    
                    })
                    .then(() => {
                        Success(`/account/login${!!inviteId ? `?invite=${inviteId}`: ''}`)
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
                    <Link className="btn-v font-normal text-sm" href={`/account/login${!!inviteId ? `?invite=${inviteId}`:''}`}>Have an Account?<br></br> Login</Link>
                    <button type='submit' className='btn-v'>Submit</button>
                </div>
            </form>
            </div>
        )
    }
    
    return (
    <Suspense>
        <SuspenseWrapper />
    </Suspense>
    )
}
export default CreateAccountPage;