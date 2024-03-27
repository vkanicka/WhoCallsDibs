/**
 * This file is to test setup of context in nextjs app router using minimal data for simplicity and speed
 */

'use client'
import { createContext, useState } from 'react';

export const TestContext = createContext({
    word: 'green',
    toggleTest: ()=>{},
})

const TestContextProvider = ({ children }) => {
    const [test, setTest] = useState({
        word: 'green',
        toggleTest: ()=>{},
    })
    const handleUpdateTest = () => {
        setTest({
                word: test.word === 'green' ? 'blue' : 'green'
            })
    }

    const ctxValue = {
        word: test.word,
        toggleTest: handleUpdateTest,
    }

    return <TestContext.Provider value={ctxValue}>
        {children}
    </TestContext.Provider>
}
export default TestContextProvider;