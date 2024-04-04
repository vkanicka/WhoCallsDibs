import { Models } from "appwrite";

interface Invite extends Models.Document {
    userAEmail: string;
    userAId: string;
    userAName: string;
}

export default Invite;