'use client'
import { GetAllItems, GetCatItems, GetFriendsItems, GetUserDetailsByAuthId } from "@/data/client";
import { UserContext } from "@/data/context/user";
import Item from "@/data/models/item";
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
        GetUserDetailsByAuthId(userCtx.user.$id).then((result) => {
            setUserDetails(result?.documents?.[0])
            return result
        }).then((result)=>console.log(result))
    }
    const handleAllItems = () => {
        console.log('handleAllItems')
        GetAllItems().then((result) => {
            setAllItems(result)
            return result
        }).then((result)=>{console.log(result)})
    }
    const handleCatItems = () => {
        console.log('handleCatItems')
        console.log(tempCat)
        GetCatItems(tempCat).then((result: any) => {
            setCatItems(result)
            return result
        }).then((result) =>
        console.log(result))
    }
    const handleFriendItems = () => {
        console.log('handleFriendItems')
        console.log(userDetails?.friends)
        GetFriendsItems(userDetails?.friends).then((result: any) => {
            setFriendItems(result)
            return result
        }).then((result) =>
        console.log(result))
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
            </div>
        </div>
    )
}
export default Sandbox;