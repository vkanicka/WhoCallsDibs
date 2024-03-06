'use client'
import { GetAllItems } from '../../data/client'

const Browse = () => {
    const allItems = GetAllItems()
    console.log(allItems)
    return (
        <div>
            <h1>Browse</h1>
        </div>
    )
}
export default Browse;