import { Models } from "appwrite";

interface Item extends Models.Document {
    ItemName: string;
    ImageURL?: string;
    isDibbed?: boolean;
    Description?: string;
    ListingURL?: string;
    hasReceived?: boolean;
    hasSent?: boolean;
    imageId?: string;
    itemOwnerId: string;
    itemOwnerEmail: string;
    itemOwnerName: string;
    dibsCallerId?: string;
    dibsCallerEmail?: string;
    dibsCallerName?: string;
    categories?: string[];
}

export default Item;