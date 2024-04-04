import { Models } from "appwrite";

interface UserDetails extends Models.Document {
    authId: string;
    email: string;
    name: string;
    friends?: string[];
}

export default UserDetails;