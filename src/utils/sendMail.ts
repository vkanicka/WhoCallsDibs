/**
 * 200 status on terminal command: node src/data/node2.js
 */

import Item from '@/data/models/item';
import User from '@/data/models/user';
import { Models } from 'appwrite';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

type Props = {
    user: Partial<Models.User<Models.Preferences>>,
    item: Item
    url: string
}
const sendMail = ({ user, item, url }: Props) => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: 'api', key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY_FIRST as string });
    

    user.email && mg.messages.create(process.env.NEXT_PUBLIC_MAILGUN_DOMAIN as string, {
        from: `Who Called Dibs App <victoria@${process.env.NEXT_PUBLIC_MAILGUN_DOMAIN as string}>`,
        to: [item.itemOwnerEmail, user.email],
        subject: "Dibs Called!",
        text: `${user.name} Called Dibs on ${item.itemOwnerName}'s Item!nItem dibbed: ${item.ItemName} (url: ${url}). Connect via email. Dibs Caller: ${user.email}, Item Owner: ${item.itemOwnerEmail}.`,
        html: `<h1>${user.name} Called Dibs on ${item.itemOwnerName}'s Item!</h1><br><h3>Item dibbed: <a href=${url}>${item.ItemName}</a></h3><br><h4>Connect via email:</h4><ul><li>Dibs Caller: ${user.email}</li><li>Item Owner: ${item.itemOwnerEmail}</li></ul>`
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
}
export default sendMail