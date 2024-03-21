/**
 * Event handlers cannot be passed to child component Props
 */
'use client'

const LoginPage = () => {
    const submitForm = () => {
        console.log('submitting create account form...')
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
                <input name='email' id='email' className="text-green-950" required type="password"></input>
            </div>
            {/* <button className="border p-1 border-solid border-green-300 rounded-lg hover:font-bold" type="submit">Submit</button> */}
            <div className='bg-green-800 sticky bottom-0 top-0 left-0 right-0 w-full py-2'>
                <button type='submit' className='text-2xl w-full bg-lime-600 px-4 py-2 border-2 rounded-xl border-green-600 border-solid text-green-900 font-semibold'>Submit</button>
            </div>
        </form>
        </div>
    )
}
export default LoginPage;