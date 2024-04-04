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
// import { useRouter } from 'next/navigation'
import { X } from 'react-feather'

const Browse = () => {
    const ItemsList = () => {
        const [allItems, setAllItems] = useState<Item[]>()
        const searchParams = useSearchParams()
        let catParams: string[];
        let showFiltersParams: boolean;
        catParams = searchParams.getAll('categories')
        showFiltersParams = searchParams.get('showFiltersParams') == 'true'

        const getStarted = async () => {
            let gottenItems: Item[] | undefined;
            if (catParams.length) {
                // gottenItems = await GetCategoryFilteredItems(catParams)
                gottenItems = await GetAllItems()
                gottenItems = gottenItems?.filter((item: Item)=> item.categories?.some(x=>catParams.includes(x)))
            } else {
                gottenItems = await GetAllItems()
            }
            setAllItems(gottenItems)
        }
    
        // const router = useRouter()
        const handleCatParams = (category: string) => {
            const catIndex = catParams.indexOf(category)
            let newArr: string[] = [...catParams]
            if (catIndex === -1) {
                newArr.push(category)
            } else {
                newArr.splice(catIndex,1)
            }
            const newPath = `?${newArr.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}&showFiltersParams=${showFiltersParams}`
            // console.log(newPath)
            // router.push(newPath)
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            window.history.pushState({ path: newurl }, '', newurl);
        }
        const handleShowFiltersParams = () => {
            const newPath = `?${catParams.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}&showFiltersParams=${!showFiltersParams}`
            // console.log(newPath)
            // router.push(newPath)
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            window.history.pushState({ path: newurl }, '', newurl);
        }
        const handleClearFilters = () => {
            const newPath = `?showFiltersParams=${showFiltersParams}`
            // console.log(newPath)
            // router.push(newPath)
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            window.history.pushState({ path: newurl }, '', newurl);
        }
        useEffect(() => {
            getStarted()
        }, [catParams])
        
        return (
            <div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full gap-6'>
                    {!!allItems?.length && allItems.filter(item=>!item.isDibbed).map((item, index) => {
                        return <ItemCard key={index} item={item} />
                    }) 
                    // : (
                    //     <p>Loading...</p> 
                    // )
                    }
                </div>
                <div className='bottom-tray'>
                    <div className={`${showFiltersParams ? 'absolute flex flex-wrap bottom-24 right-0 bg-ikigai-200 p-6 gap-3 rounded-t-3xl' : 'hidden'}`}>
                        {CATEGORIES.map((category, index) => {
                            return (
                                <button onClick={()=>handleCatParams(category)} className={`px-3 py-[4px] border border-solid border-gray-400 rounded-2xl text-2xl bg-ikigai-600 bg-opacity-50 ${catParams.includes(category) ? 'text-lime-300 bg-opacity-70 flex' : 'text-gray-100'}`} key={index}>
                                    {category}{catParams.includes(category) && <X size={25} className='self-center ml-1 text-primrose-500 hover:text-lime-300' />}
                                </button>
                            )
                        })}
                    </div>
                    <button className='btn-v' onClick={handleClearFilters}>Clear Filters</button>
                    <button className='btn-v' onClick={handleShowFiltersParams}>{showFiltersParams ? 'Hide Filters' : `Filter${catParams.length ? `s (${catParams.length})` : ''}`}</button>
                </div>
            </div>

        )
    }

    return (
        <Suspense>
            <ItemsList />
        </Suspense>
        
    )
}
export default Browse;