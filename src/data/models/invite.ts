import { Models } from "appwrite";
import UserDetails from "./userDetails";

interface Invite extends Models.Document {
    userAEmail: string;
    userAId: string; // authId
    userAName: string;
    userBEmail?: string;
    userBId?: string; // authId
    userBName?: string;
    status?: string;
    userADetailsId?: string;
    userBDetailsId?: string;
}

export default Invite;