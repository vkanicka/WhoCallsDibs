'use client'
import { GetAccount } from "@/data/client";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const ViewAccount = () => {
    let [userAccount, setUserAccount] = useState<Partial<Models.Preferences>>()
    const handleSession = () => {
        try {
            GetAccount().then((result) => {
                if (result) {
                        console.log(result)
                        setUserAccount(result)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
        handleSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>View Account</h1>
            {!!userAccount && (
                <div>
                    <p>Username: {userAccount.name}</p>
                    <p>Email: {userAccount.email}</p>
                </div>
            )}
        </div>
    )
}
export default ViewAccount;