'use client'
import { useEffect, useState, Suspense, useContext } from 'react'
import { GetFriendsItems, GetUserDetailsByAuthId, GetMyItems } from '@data/client'
import Item from '@models/item'
import ItemCard from '@components/itemCard'
import CATEGORIES from '@/data/const/categories'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { X } from 'react-feather'
import { UserContext } from '@/data/context/user'
import UserDetails from '@/data/models/userDetails'
import LoadingIndicator from '@/components/loading'
import Link from 'next/link'

const Browse = () => {
    
    const ItemsList = () => {
        const router = useRouter()
        const [allItems, setAllItems] = useState<Item[]>()
        const [isLoading, setIsLoading] = useState(false)
        const [noItemsFound, setNoItemsFound] = useState(false)
        const searchParams = useSearchParams()
        let catParams: string[];
        let showFilters: boolean;
        let myItems: boolean;
        catParams = searchParams?.getAll('categories') ?? []
        showFilters = searchParams?.get('showFilters') == 'true'
        myItems = searchParams?.get('myItems') === 'true'
        const userCtx = useContext(UserContext)

        // const getStarted = async () => {
        //     await handleDetailFriendItems()
        // }
        const getDetails = async () => {
            let details: Partial<UserDetails>
            if (userCtx.user.$id) {
                details = GetUserDetailsByAuthId(userCtx.user.$id)
                console.log(details)
            }
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
            const newPath = `?${newArr.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}&showFilters=${showFilters}&myItems=${myItems}`
            // const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            // window.history.pushState({ path: newurl }, '', newurl);
            router.push(newPath)
        }
        const handleShowFilters = () => {
            const newPath = `?${catParams.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}&showFilters=${!showFilters}&myItems=${myItems}`
            // const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            // window.history.pushState({ path: newurl }, '', newurl);
            router.push(newPath)
        }
        const handleMyItems = () => {
            const newPath = `?${catParams.map(x=>`categories=${x.replaceAll(' ','+')}`).join('&')}&showFilters=${showFilters}&myItems=${!myItems}`
            // const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            // window.history.pushState({ path: newurl }, '', newurl);
            router.push(newPath)
        }
        const handleClearFilters = () => {
            const newPath = `?showFilters=${showFilters}`
            // const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newPath;
            // window.history.pushState({ path: newurl }, '', newurl);
            router.push(newPath)
        }
        const handleDetailFriendItems = async () => {
            setIsLoading(true)
            userCtx.user.$id && GetUserDetailsByAuthId(userCtx.user.$id)
            .then((userDetailsResult) => {
                return userDetailsResult?.documents?.[0]
            })
                .then((userDetailsResult) => {
                    if (!!myItems && !!userCtx.user.$id) {
                    return GetMyItems(userCtx.user.$id)
                    }
                    else if (userDetailsResult?.friends.length) {
                        return GetFriendsItems(userDetailsResult?.friends)
                    }
            })
                .then((friendsItemsResult: any) => {
                if (!friendsItemsResult.length) setNoItemsFound(true)
                if (catParams.length) {
                    setAllItems(friendsItemsResult.filter((item: Item)=> item.categories?.some(x=>catParams.includes(x))))
                } else {
                    setAllItems(friendsItemsResult)
                }
                setIsLoading(false)
            })
    }
        useEffect(() => {
            handleDetailFriendItems()
            // getDetails()
        }, [userCtx])


        
        return (
            <div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full gap-6 pb-36'>
                    {isLoading && (
                        <LoadingIndicator/>
                    )}
                    {!!allItems?.length && allItems.map((item, index) => {
                        return <ItemCard key={index} item={item} />
                    }) 
                    // : (
                    //     <p>Loading...</p> 
                    // )
                    }
                    {noItemsFound && (
                        <div className='flex flex-col'>
                            <p>No items found. </p>
                        </div>
                    )}
                </div>
                {((noItemsFound && myItems) || !!allItems?.length) && (
                    <div className='bottom-tray'>
                        <div className={`${showFilters ? 'w-full absolute flex flex-wrap bottom-24 right-0 bg-ikigai-200 p-6 gap-3 rounded-t-3xl' : 'hidden'}`}>
                            {CATEGORIES.map((category, index) => {
                                return (
                                    <button onClick={()=>handleCatParams(category)} className={`px-3 py-[4px] border border-solid border-gray-400 rounded-2xl text-2xl bg-ikigai-600 bg-opacity-50 ${catParams.includes(category) ? 'text-lime-300 bg-opacity-70 flex' : 'text-gray-100'}`} key={index}>
                                        {category}{catParams.includes(category) && <X size={25} className='self-center ml-1 text-primrose-500 hover:text-lime-300' />}
                                    </button>
                                )
                            })}
                            <button onClick={()=>handleMyItems()} className={`px-3 py-[4px] border border-solid border-gray-400 rounded-2xl text-2xl bg-ikigai-600 bg-opacity-50 ${!!myItems ? 'text-lime-300 bg-opacity-70 flex' : 'text-gray-100'}`} key={'viewMine'}>
                                        {'My Items'}{myItems && <X size={25} className='self-center ml-1 text-primrose-500 hover:text-lime-300' />}
                            </button>
                        </div>
                        <button className='btn-v text-lg' onClick={handleClearFilters}>Clear Filters</button>
                        <button className='btn-v' onClick={handleShowFilters}>{showFilters ? 'Hide Filters' : `Filter${(catParams.length || myItems) ? `s (${catParams.length + Number(myItems)})` : ''}`}</button>
                    </div>)}
                {noItemsFound && !myItems && (
                    <div className='bottom-tray'>
                        <Link className='btn-v text-lg' href='/account/invite'>Add Friends</Link>
                        <button onClick={()=>handleMyItems()} className='btn-v'>
                                        {'My Items'}{myItems && <X size={25} className='self-center ml-1 text-primrose-500 hover:text-lime-300' />}
                            </button>
                    </div>
                )}
            </div>

        )
    }

    return (
        <Suspense fallback={<LoadingIndicator/>}>
            <ItemsList />
        </Suspense>
        
    )
}
export default Browse;