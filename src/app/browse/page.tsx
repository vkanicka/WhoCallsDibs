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
            <h1 className='text-lg font-bold mb-4'>Browse</h1>
            <div className='grid grid-cols-2 w-full gap-2'>
                {!!allItems?.length ? allItems.map((item, index) => {
                    return <ItemCard key={index} item={item} />
                }) : (
                    <p>Loading...</p> 
                )}
            </div>
        </div>
    )
}
export default Browse;