/**
 * useEffect only works in cliient components
 */

'use client'
import { useEffect, useState, Suspense } from 'react'
import { GetAllItems, GetCategoryFilteredItems } from '@data/client'
import Item from '@models/item'
import ItemCard from '@components/itemCard'
import CATEGORIES from '@/data/const/categories'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Browse = () => {
    const [allItems, setAllItems] = useState<Item[]>()
    const [showCatFilter, setShowCatFilter] = useState(false)
    
    const searchParams = useSearchParams()
    let catParams: string[];
    catParams = searchParams.getAll('categories')

    const getStarted = async () => {
        let gottenItems: Item[] | undefined;
        
        if (catParams.length) {
            // gottenItems = await GetCategoryFilteredItems(catParams)
            gottenItems = await GetAllItems()
        } else {
            gottenItems = await GetAllItems()
        }
        setAllItems(gottenItems)
        catParams = searchParams.getAll('categories')
    }
    
    const router = useRouter()
    const handleCatParams = (category: string) => {
        const catIndex = catParams.indexOf(category)
        let newArr: string[] = [...catParams]
        if (catIndex === -1) {
            newArr.push(category)
        } else {
            newArr.splice(catIndex,1)
        }
        const newCatPath = `?${newArr.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}`
        // console.log(newCatPath)
        router.push(newCatPath)
    }

    useEffect(() => {
        getStarted()
    }, [])



    return (
        <div>
            <div className="flex space-y-2 flex-col space-x-2 text-green-100 overlflow-y-scroll pb-8">
                <h4 className='border border-solid border-violet-400 bg-violet-500 rounded-2xl p-2' onClick={()=>setShowCatFilter(!showCatFilter)}>{showCatFilter ? 'Hide Filter' : 'Filter'} By Categories</h4>
                <div className={`${showCatFilter ? 'flex' : 'hidden'} flex-wrap gap-2`}>
                    {CATEGORIES.map((category, index) => {
                        return (
                            <button onClick={()=>handleCatParams(category)} className={`flex px-2 py-[2px] border border-solid border-gray-400 rounded-2xl ${catParams.includes(category) ? 'text-lime-300' : 'text-gray-100'}`} key={index}>
                                {category}
                            </button>
                        )
                    })}
                </div>
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