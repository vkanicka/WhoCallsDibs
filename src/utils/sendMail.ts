/**
 * 200 status on terminal command: node src/data/node2.js
 */

import formData from 'form-data';
import Mailgun from 'mailgun.js';

const sendMail = () => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: 'api', key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY_FIRST as string });
    

    mg.messages.create(process.env.NEXT_PUBLIC_MAILGUN_DOMAIN as string, {
        from: `Who Called Dibs App <mailgun@${process.env.NEXT_PUBLIC_MAILGUN_DOMAIN as string}>`,
        to: ["vkanicka@gmail.com"],
        subject: "Dibs Called on Your Item",
        text: "...",
        html: "<h1>Someone Called Dibs on Your Item!</h1>"
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
}
export default sendMail