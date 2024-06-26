import { Client, Databases, ID, Storage, Account, Query } from 'appwrite';
import Item from '@models/item'
import User from '@models/user'
import Invite from './models/invite';
import UserDetails from './models/userDetails';
const client = new Client();
const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);


export const AddItemFx = async ({ ItemName, ImageURL, imageId, ListingURL, Description, itemOwnerId, itemOwnerEmail, itemOwnerName, categories }: Partial<Item>) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, 
                ID.unique(),
                { "ItemName": ItemName, "ImageURL": ImageURL, "imageId": imageId, "ListingURL": ListingURL, "Description": Description, "itemOwnerId": itemOwnerId, "itemOwnerEmail": itemOwnerEmail, "itemOwnerName": itemOwnerName, "categories": categories}
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const UpdateItem = async ({ $id, ItemName, ImageURL, imageId, ListingURL, Description, itemOwnerId, itemOwnerEmail, itemOwnerName, categories }: Partial<Item>) => {
    if (!!$id) {
        try {
            const response = await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, 
                $id,
                { "ItemName": ItemName, "ImageURL": ImageURL, "imageId": imageId, "ListingURL": ListingURL, "Description": Description, "itemOwnerId": itemOwnerId, "itemOwnerEmail": itemOwnerEmail, "itemOwnerName": itemOwnerName, "categories": categories}
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }}
}
export const DeleteItem = async ({ existingItemId }: Partial<Item>) => {
    try {
            const response = await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, 
                existingItemId
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const AddImageStorageFx = async () => {
    let imageId;
    const clientFiles = (document?.getElementById('uploader') as HTMLInputElement)?.files?.[0]
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
            ID.unique(),
            clientFiles as File
        )
        imageId = response.$id
        return imageId
    } catch (error) {
        console.error(error)
    }
}
export const AddResizedImageToStorage = async (resizedImage: File) => {
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
            ID.unique(),
            resizedImage as File
        )
        return response
    } catch (error) {
        console.error(error)
    }
}

export const GetImageStorageFx = async (imageId: string) => {
    try {
        const response = await storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, imageId)
        return {imageId, response}
    }
    catch (error) {
        console.error(error)
    }
}
export const DeleteImageStorage = async (imageId: string) => {
    try {
        const response = await storage.deleteFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, imageId)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const ListImageStorage = async () => {
    try {
        const response = await storage.listFiles(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, 
            [
                Query.limit(50)
            ]
        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}

export const GetAllItems = async () => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,)
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
// export const GetCategoryFilteredItems = async (catParams: string[]) => {
//     try {
//         const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
//             process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
//             [
//                 Query.contains('categories', catParams)
//             ]
//         )
//         const items = response.documents as Item[]
//         return items
//     }
//     catch (error) {
//         console.error(error)
//     }
// }

export const GetItem = async (id:string) => {
    try {
        const response: Item = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, id)
        // const item = response as Item
        return response
    }
    catch (error) {
        console.error(error)
    }
}

export const UpdateItemIsDibbed = async (id: string, dibsCallerId: string, dibsCallerEmail: string, dibsCallerName: string) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, id,
            {
                "isDibbed": true,
                "dibsCallerId": dibsCallerId,
                "dibsCallerEmail": dibsCallerEmail,
                "dibsCallerName": dibsCallerName
            }
        )
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const UpdateItemSent = async (id: string, newStatus: boolean) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, id,
            {
                "hasSent": newStatus,
            }
        )
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const UpdateItemReceived = async (id: string, newStatus: boolean) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, id,
            {
                "hasReceived": newStatus,
            }
        )
        return response
    }
    catch (error) {
        console.error(error)
    }
}

export const CreateUser = async ({ email, password, name }: User) => {
    try {
        const response = await account.create(ID.unique(), email, password, name)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const LoginUser = async ({ email, password }: User) => {
    try {
        const response = await account.createEmailSession(email, password)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const LogoutUser = async () => {
    try {
        const response = await account.deleteSession('current');
        // console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const GetSessions = async () => {
    try {
        const response = await account.listSessions();
        // console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const GetAccount = async () => {
    try {
        const response = await account.get();
        // console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const CreateInvite = async ({ userAEmail, userAId, userAName, userADetailsId }: Partial<Invite>) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, 
                ID.unique(),
                { 'userAEmail': userAEmail, 'userAId': userAId, 'userAName': userAName, 'userADetailsId': userADetailsId }
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const GetInvite = async ( id : string) => {
    try {
            const response: Invite = await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, 
                id,
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const CreateUserDetails = async ({ authId, email, name  }: Partial<UserDetails>) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string, 
                ID.unique(),
                {
                    'authId': authId,
                    'email': email,
                    'name': name,
                }
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const UpdateInvite = async ({id, userBId, userBEmail, userBName}: Partial<Invite>) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, id,
            {
                "userBId": userBId,
                "userBEmail": userBEmail,
                "userBName": userBName,
            }
        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const GetUserDetails = async (id: string) => {
    try {
        const response = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string, id        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const UpdateUserDetails = async (id: string, newFriends: string[]) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string, id,
            {
                "friends": newFriends,
            }
        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const DeleteInvite = async ( id : string) => {
    try {
            const response = await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, 
                id,
            );
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const AcceptInvite = async (id: string) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, id,
            {
                "Status": 'Accepted'
            }
        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const IgnoreInvite = async (id: string) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVITES as string, id,
            {
                "Status": 'Ignored'
            }
        )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
export const GetUserDetailsByAuthId = async (id: string) => {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string, 
                [
                    Query.equal('authId', id)
                ]
            )
        // console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}
// export const GetFilteredItems = async (catParams: string[], friends: string[]) => {
//     try {
//         const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
//             process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
//             [
//                 Query.equal('categories', catParams),
//                 Query.equal('friends', friends),
//                 Query.limit(100)
//             ]
//         )
//         const items = response.documents as Item[]
//         return items
//     }
//     catch (error) {
//         console.error(error)
//     }
// }
export const GetFriendsItems = async (friends: string[]) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('itemOwnerId', friends),
                Query.equal('isDibbed', false),
                Query.limit(100)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
export const GetMyItems = async (id: string) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('itemOwnerId', id),
                Query.equal('isDibbed', false),
                Query.limit(100)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
export const GetMyItemsWithDibs = async (id: string) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('itemOwnerId', id),
                Query.equal('isDibbed', true),
                Query.equal('hasReceived', false),
                Query.limit(100)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
export const GetItemsICalledDibsOn = async (id: string) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('dibsCallerId', id),
                Query.equal('isDibbed', true),
                Query.equal('hasReceived', false),
                Query.limit(100)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
export const GetItemsCompleted = async (id: string) => {
    try {
        const response1 = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('dibsCallerId', id),
                Query.equal('hasReceived', true),
                Query.limit(100)
            ]
        )
        const response2 = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('itemOwnerId', id),
                Query.equal('hasReceived', true),
                Query.limit(100)
            ]
        )
        const items1 = response1.documents as Item[]
        const items2 = response2.documents as Item[]
        return [...items1, ...items2]
    }
    catch (error) {
        console.error(error)
    }
}
export const GetFriendsDetails = async (friends: string[]) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string,
            [
                Query.equal('authId', friends),
                Query.limit(100)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}
export const GetCatItems = async (cats: string[]) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.equal('categories', cats),
                Query.limit(100)
            ]
        )
        // console.log(response)
        const items = response.documents as Item[]
        // console.log(items)
        return items
    }
    catch (error) {
        console.error(error)
    }
}