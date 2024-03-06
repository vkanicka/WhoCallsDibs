'use client'
import { useEffect, useState } from 'react'
import { GetAllItems } from '../../data/client'
import Item from '../../data/models/item'
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
            <h1>Browse</h1>
            {!!allItems?.length ? allItems.map((item, index) => {
                return <p key={index}>{item.ItemName}</p>
            }) : (
                <p>Loading...</p> 
            )}
        </div>
    )
}
export default Browse;