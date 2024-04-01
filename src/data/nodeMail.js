import sdk from 'node-appwrite';

// Init SDK
const client = new sdk.Client();

const messaging = new sdk.Messaging(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID) // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // project ID
    .setKey(process.env.NEXT_PUBLIC_MAILGUN_API_KEY_FIRST) // secret API key
    ;


const sendNodeEmail = async () => {
    try {
        const message = await messaging.createEmail(
        '[MESSAGE_ID]',                          // messageId
        '[POTATO SUBJECT]',                             // subject
        '[CONTENT]',                             // content
        [],                                      // topics (optional)
        [],                                      // users (optional)
        ['vkanicka@gmail.com'], // (optional)
        [],                                      // cc (optional)
        [],                                      // bcc (optional)
        // false,                                   // draft (optional)
        // false,                                   // html (optional)
        // ''                                       // scheduledAt (optional)
        );  
    
        console.log(message)

    }
    catch (error) {
        console.log(error)
    }
}
export default sendNodeEmail

