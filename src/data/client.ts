'use client'

import { Client, Databases, ID, Storage } from 'appwrite';

const client = new Client();
const storage = new Storage(client);


client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

type Item = {
    ItemName: string;
    ImageURL: string;
    Email: string;
}

export const AddItemFx = async ({ ItemName, ImageURL, Email }: Item) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, 
                ID.unique(),
                { "ItemName": ItemName, "ImageURL": ImageURL, "Email": Email }
            );
        console.log(response)
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
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, 

        )
        if (!!response) {
            return response
        }
    }
    catch (error) {
        console.error(error)
    }

}