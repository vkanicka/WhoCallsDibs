import { Models } from "appwrite";

interface User extends Models.Document {
    email: string;
    name: string;
    password: string;
    isLoggedIn?: boolean;

    // $id?: string;
    // $collectionId?: string;
    // $databaseId?: string;
    // $createdAt?: string;
    // $updatedAt?: string;
    // $permissions?: string;
}

export default User;