'use client'
import LoadingIndicator from "@/components/loading";
import { DeleteImageStorage, GetAllItems, GetCatItems, GetFriendsItems, GetUserDetailsByAuthId, ListImageStorage } from "@/data/client";
import { UserContext } from "@/data/context/user";
import Item from "@/data/models/item";
import UserDetails from "@/data/models/userDetails";
import { Models } from "appwrite";
import { useContext, useState } from "react";

const Sandbox = () => {
    const userCtx = useContext(UserContext)
    const [userDetails, setUserDetails] = useState<Partial<Models.Document>>()
    const [allItems, setAllItems] = useState<Partial<Item[]>>()
    const [friendItems, setFriendItems] = useState<Partial<Item[]>>()
    const [catItems, setCatItems] = useState<Partial<Item[]>>()
    const tempCat = ['Pets']


    const handleUser = () => {
        console.log('handleUser')
        console.log(userCtx.user.$id)
    }
    const handleUserDetails = () => {
        console.log('handleUserDetails')
        userCtx.user.$id && GetUserDetailsByAuthId(userCtx.user.$id)
        .then((result) => {
            setUserDetails(result?.documents?.[0])
            return result
        })
        .then((result) => console.log(result))
    }
    const handleAllItems = () => {
        console.log('handleAllItems')
        GetAllItems()
        .then((result) => {
            setAllItems(result)
            return result
        })
        .then((result) => { console.log(result) })
    }
    const handleCatItems = () => {
        console.log('handleCatItems')
        console.log(tempCat)
        GetCatItems(tempCat)
        .then((result: any) => {
            setCatItems(result)
            return result
        })
        .then((result) =>
        console.log(result))
    }
    const handleFriendItems = () => {
        console.log('handleFriendItems')
        console.log(userDetails?.friends)
        GetFriendsItems(userDetails?.friends)
        .then((result: any) => {
            setFriendItems(result)
            return result
        })
        .then((result) =>
        console.log(result))
    }
    const handleDetailFriendItems = async () => {
        console.log('handleDetailFriendItems')
        console.log(userDetails)
        userCtx.user.$id && GetUserDetailsByAuthId(userCtx.user.$id)
            .then((userDetailsResult) => {
                console.log(userDetailsResult)
                setUserDetails(userDetailsResult?.documents?.[0])
                return userDetailsResult?.documents?.[0]
            })
            .then((userDetailsResult) => {
                console.log(userDetailsResult)
                return GetFriendsItems(userDetailsResult?.friends)
            })
            .then((friendsItemsResult: any) => {
                setFriendItems(friendsItemsResult)
                console.log(friendsItemsResult)
            return friendsItemsResult
            })
    }
    const handleUpdateFriendDetailsByAuthId = async () => {
        const aFriendAuthId = '66102a0f803ad05dc220'
        const bFriendAuthId = '456'
    }
    const cleanUpStorage = async () => {
        ListImageStorage()
        .then((response) => response?.files.map(x => x.$id))
        .then((idList) => {
            idList?.forEach((id, index) => {
                DeleteImageStorage(id)
                .then((response)=>console.log(response))
            })
        })
        }
    return (
        <div>
            <h1>Sandbox</h1>
            <div className="flex space-x-6">
                <button className="btn-test" onClick={handleUser}>handleUser</button>
                <button className="btn-test" onClick={handleUserDetails}>handleUserDetails</button>
                <button className="btn-test" onClick={handleAllItems}>handleAllItems</button>
                <button className="btn-test" onClick={handleCatItems}>handleCatItems</button>
                <button className="btn-test" onClick={handleFriendItems}>handleFriendItems</button>
                <button className="btn-test" onClick={handleDetailFriendItems}>handleDetailFriendItems</button>
                <button className="btn-test" onClick={handleUpdateFriendDetailsByAuthId}>handleUpdateFriendDetailsByAuthId</button>
                <button className="btn-test" onClick={cleanUpStorage}>cleanUpStorage</button>
            </div>
            <LoadingIndicator/>
        </div>
    )
}
export default Sandbox;