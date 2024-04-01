import { Models } from "appwrite";

interface Item extends Models.Document {
    // Email: string; removed 3/27/24, replaced with userId
    ItemName: string;
    ImageURL?: string;
    isDibbed?: boolean;
    Description?: string;
    ListingURL?: string;
    itemOwnerId: string;
    itemOwnerEmail: string;
    itemOwnerName: string;
    dibsCallerId?: string;
    dibsCallerEmail?: string;
    dibsCallerName?: string;
    // $id?: string;
    // $collectionId?: string;
    // $databaseId?: string;
    // $createdAt?: string;
    // $updatedAt?: string;
    // $permissions?: string;
}

export default Item;