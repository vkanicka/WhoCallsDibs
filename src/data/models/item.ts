import { Models } from "appwrite";

interface Item extends Models.Document {
    ItemName: string;
    ImageURL: string;
    Email: string;
}

export default Item;