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


export const AddItemFx = async ({ ItemName, ImageURL, ListingURL, Description, itemOwnerId, itemOwnerEmail, itemOwnerName, categories }: Item) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string, 
                ID.unique(),
                { "ItemName": ItemName, "ImageURL": ImageURL, "ListingURL": ListingURL, "Description": Description, "itemOwnerId": itemOwnerId, "itemOwnerEmail": itemOwnerEmail, "itemOwnerName": itemOwnerName, "categories": categories}
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

export const GetImageStorageFx = async (imageId: string) => {
    try {
        const response = await storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, imageId)
        return response.href
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
export const GetCategoryFilteredItems = async (catParams: string[]) => {
    try {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ITEMS as string,
            [
                Query.contains('categories', catParams)
            ]
        )
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}

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
        const response = await account.createEmailPasswordSession(email, password)
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
export const UpdateUserDetails = async ({id, friends}: Partial<Invite>) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER_DETAILS as string, id,
            {
                "friends": friends,
            }
        )
        console.log(response)
        return response
    }
    catch (error) {
        console.error(error)
    }
}