'use client'

import { Client, Databases, ID, Storage } from 'appwrite';

const client = new Client();

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
    console.log('clientFiles')
    console.log(clientFiles)
    const storage = new Storage(client);
    try {
        const response = await storage.createFile(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
    ID.unique(),
            clientFiles as File
        )
        // console.log(response)
        imageId = response.$id
        // console.log('imageId')
        // console.log(imageId)
        // try {
        //     const response2 = await storage.getFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, imageId)
        //     console.log(response2)
        // } catch (error) {
        //     console.error(error)
        // }
        return imageId
    } catch (error) {
        console.error(error)
    }
}

export const GetImageStorageFx = async (imageId: string) => {
    const storage = new Storage(client);
    try {
        const response = await storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, imageId)
        // console.log(response)
        return response.href
    }
    catch (error) {
        console.error(error)
    }
}