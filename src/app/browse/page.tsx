/**
 * useEffect only works in cliient components
 */

'use client'
import { useEffect, useState } from 'react'
import { GetAllItems } from '@data/client'
import Item from '@models/item'
import ItemCard from '@components/itemCard'
const Browse = () => {
    const [allItems, setAllItems] = useState<Item[]>()
    const getStarted = async () => {
        let gottenItems = await GetAllItems()
        setAllItems(gottenItems)
        
    }

    useEffect(() => {
        getStarted()
    }, [])

    console.log(allItems)

    return (
        <div>
            <div className='flex justify-between'>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full gap-6'>
                {!!allItems?.length ? allItems.filter(item=>!item.isDibbed).map((item, index) => {
                    return <ItemCard key={index} item={item} />
                }) : (
                    <p>Loading...</p> 
                )}
            </div>
            <div className='bottom-tray'>
                <button className='btn-v'>Filter</button>
            </div>
        </div>
    )
}
export default Browse;