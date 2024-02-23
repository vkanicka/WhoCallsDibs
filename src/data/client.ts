'use client'

import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

type Item = {
    ItemName: string;
    Email: string;
}

export const AddItemFx = async ({ItemName, Email}: Item) => {
    try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, 
                ID.unique(),
                { "ItemName": ItemName, "Email": Email }
            );
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}