'use client'
import TestContextProvider, { TestContext } from '@data/context/test'
import { useContext } from 'react'

export default function Home() {
  const testCtx = useContext(TestContext)
  console.log(testCtx)
  return (
    <main>
      {/* <p>Add New</p>
      <p>Categories</p>
      <p>Browse All</p> */}
      <TestContextProvider>
        <p>{testCtx.word}</p> 
      </TestContextProvider>
    </main>
  );
}
