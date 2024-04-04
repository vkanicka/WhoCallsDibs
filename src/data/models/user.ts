import { Models } from "appwrite";

interface User extends Models.Document {
    email: string;
    name: string;
    password: string;
    isLoggedIn?: boolean;
}

export default User;