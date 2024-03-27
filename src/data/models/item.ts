import { Models } from "appwrite";

interface Item extends Models.Document {
    // Email: string; removed 3/27/24, replaced with userId
    ItemName: string;
    ImageURL?: string;
    isDibbed?: boolean;
    Description?: string;
    ListingURL?: string;
    userId: string;
    // $id?: string;
    // $collectionId?: string;
    // $databaseId?: string;
    // $createdAt?: string;
    // $updatedAt?: string;
    // $permissions?: string;
}

export default Item;