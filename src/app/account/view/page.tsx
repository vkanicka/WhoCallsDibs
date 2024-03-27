'use client'
import { useContext } from 'react';
import { UserContext } from '@data/context/user';

const ViewAccount = () => {
    const userCtx = useContext(UserContext);
    console.log(userCtx)
    return (
        <div>
            <h1>View Account</h1>
            {!!userCtx.user.email && (
                <div>
                    <p>Username: {userCtx.user.name}</p>
                    <p>Email: {userCtx.user.email}</p>
                </div>
            )}
        </div>
    )
}
export default ViewAccount;