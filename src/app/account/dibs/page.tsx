'use client'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@data/context/user';
import Logout from '@/components/logout';
import Link from 'next/link';
import { UserPlus, Users } from 'react-feather';
import ItemDetailList from '@/components/itemDetailList';
import Item from '@/data/models/item';
import { GetItemsICalledDibsOn, GetMyItemsWithDibs } from '@/data/client';

const ViewAccount = () => {
    const userCtx = useContext(UserContext);
    const [itemsIDibbed, setItemsIDibbed] = useState<Partial<Item[]>>()
    const [myDibbedItems, setMyDibbedItems] = useState<Partial<Item[]>>()

        const HandleGetMyItemsWithDibs = async () => {
        const results = userCtx.user.$id && await GetMyItemsWithDibs(userCtx.user.$id)
        !!results && setMyDibbedItems(results.filter(item => item !== undefined))
    }
    const HandleGetItemsICalledDibsOn = async () => {
        const results = userCtx.user.$id && await GetItemsICalledDibsOn(userCtx.user.$id)
        !!results && setItemsIDibbed(results.filter(item => item !== undefined))
    }

    useEffect(() => {
        HandleGetMyItemsWithDibs()
        HandleGetItemsICalledDibsOn()
    }, [userCtx])

    return (
        <div>
            {/* <h1>My Dibs</h1> */}
            {!!userCtx.user.email && (
                <div className='flex flex-col justify-between mb-128 gap-8'>
                    {!!myDibbedItems && <ItemDetailList itemList={myDibbedItems} userIsOwner={true} />}
                    {!!itemsIDibbed && <ItemDetailList itemList={itemsIDibbed} userIsOwner={false} />}

                </div>
            )}
        </div>
    )
}
export default ViewAccount;