import { cookies } from 'next/headers'

const ViewAccount = () => {
    console.log(cookies)
    return (
        <div>
            <h1>View Account</h1>
        </div>
    )
}
export default ViewAccount;