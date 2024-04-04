import { Models } from "appwrite";
import Item from "./item";
import Invite from "./invite";

interface UserDetails extends Models.Document {
    authId: string;
    email: string;
    name: string;
    itemsDibbed?: Item[];
    itemsOwned?: Item[];
    invitesSent?: Invite[];
    invitesReceived?: Invite[];
    friends?: string[];
}

export default UserDetails;