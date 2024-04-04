import { Models } from "appwrite";
import UserDetails from "./userDetails";

interface Invite extends Models.Document {
    userAEmail: string;
    userAId: string;
    userAName: string;
    userBEmail?: string;
    userBId?: string;
    userBName?: string;
    status?: string;
}

export default Invite;