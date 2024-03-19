import { Models } from "appwrite";

interface Item extends Models.Document {
    Email: string;
    ItemName: string;
    ImageURL?: string;
    isDibbed?: boolean;
    Description?: string;
    ListingURL?: string;
    // $id?: string;
    // $collectionId?: string;
    // $databaseId?: string;
    // $createdAt?: string;
    // $updatedAt?: string;
    // $permissions?: string;
}

export default Item;