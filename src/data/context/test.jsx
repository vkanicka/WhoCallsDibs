/**
 * This file is to test setup of context in nextjs app router using minimal data for simplicity and speed
 */

'use client'
import { createContext, useState } from 'react';

export const TestContext = createContext({
    word: 'green'
})

const TestContextProvider = ({ children }) => {
    const [test, setTest] = useState({
        word: 'green',
    })
    // update fx
    // const handleUpdateTest = () => {
    //     setTest('blue')
    // }
    // console.log(handleUpdateTest)

    const ctxValue = {
        word: test.word
    }

    return <TestContext.Provider value={ctxValue}>
        {children}
    </TestContext.Provider>
}
export default TestContextProvider;