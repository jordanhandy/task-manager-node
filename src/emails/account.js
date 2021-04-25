require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_KEY;
sgMail.setApiKey(apiKey);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'jordanwhandy@icloud.com',
        subject:"Thanks for signing up!",
        text:`Hey ${name}.  Welcome to the app.  Let me know how you like it`
    }).then((mail) =>{
        console.log("Mail sent successfully",mail)
    }).catch((e)=>{
        console.log("Unable to send mail.")
    })

}
module.exports = {
    sendWelcomeEmail
}
const msg = {    
    to:'handy.jordan@gmail.com',
    from:'jordanwhandy@icloud.com',
    subject:'This is a test email',
    text:"Can you see this?"
};
