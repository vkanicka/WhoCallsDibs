import { Client, Databases, ID, Storage, Account } from 'appwrite';
import Item from '../data/models/item'
import User from '../data/models/user'
const client = new Client();
const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);


client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);


export const AddItemFx = async ({ ItemName, ImageURL, Email, ListingURL, Description }: Item) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, 
                ID.unique(),
                { "ItemName": ItemName, "ImageURL": ImageURL, "Email": Email, "ListingURL": ListingURL, "Description": Description }
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
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,)
        const items = response.documents as Item[]
        return items
    }
    catch (error) {
        console.error(error)
    }
}

export const GetItem = async (id:string) => {
    try {
        const response = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, id)
        const item = response as Item
        return item
    }
    catch (error) {
        console.error(error)
    }
}

export const UpdateItemIsDibbed = async (id: string) => {
    try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, id,
            {
            "isDibbed": true
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
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}
