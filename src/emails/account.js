require('dotenv').config(); // import for environment variables
const sgMail = require('@sendgrid/mail'); // sendgrid api
const apiKey = process.env.SENDGRID_KEY;
sgMail.setApiKey(apiKey);

// Object for sending sendgrid emails.  These are passed to this function
// when a user is first created
const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'jordanwhandy@icloud.com',
        subject:"Thanks for signing up!",
        text:`Hey ${name}.  Welcome to the app.  Let me know how you like it`
    })
    // .then((mail) =>{
    //     console.log("Mail sent successfully",mail)
    // }).catch((e)=>{
    //     console.log("Unable to send mail.")
    // })

}

// Object for sending sendgrid emails.  These are passed to this function
// when a user is deleted from the database
const sendGoodbyeEmail = async (email,name)=>{
    await sgMail.send({
        to:email,
        from:'jordanwhandy@icloud.com',
        subject:"Sorry to see you go! :(",
        text:`Hey ${name}.  We're sad to see you go, but hope you come back soon`
    })
    // .then((mail) =>{
    //     console.log("Mail sent successfully",mail)
    // }).catch((e)=>{
    //     console.log("Unable to send mail.")
    // })

}
module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}
const msg = {    
    to:'handy.jordan@gmail.com',
    from:'jordanwhandy@icloud.com',
    subject:'This is a test email',
    text:"Can you see this?"
};
