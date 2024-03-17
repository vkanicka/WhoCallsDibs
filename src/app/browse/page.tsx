/**
 * useEffect only works in cliient components
 */

'use client'
import { useEffect, useState } from 'react'
import { GetAllItems } from '../../data/client'
import Item from '../../data/models/item'
import ItemCard from '@/components/itemCard'
const Browse = () => {
    const [allItems, setAllItems] = useState<Item[]>()
    const getStarted = async () => {
        let gottenItems = await GetAllItems()
        setAllItems(gottenItems)
        
    }

    useEffect(() => {
        getStarted()
    }, [])

    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold mb-4 text-green-400'>Browse</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full gap-2'>
                {!!allItems?.length ? allItems.filter(item=>!item.isDibbed).map((item, index) => {
                    return <ItemCard key={index} item={item} />
                }) : (
                    <p>Loading...</p> 
                )}
            </div>
            <div className='bg-green-800 sticky bottom-0 top-0 left-0 right-0 w-full py-2'>
                <button className='text-2xl w-full bg-lime-600 px-4 py-2 border-2 rounded-xl border-green-600 border-solid text-green-900 font-semibold'>Filter</button>
            </div>
        </div>
    )
}
export default Browse;