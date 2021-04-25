require('dotenv').config();
const jwt = require("jsonwebtoken"); // JWT 
const User = require("../models/user"); // need the user Model

// Middleware
const auth = async (req,res,next) =>{
    try{
        // get the Bearer token from the header.  Strip 'Bearer'
        const token = req.header('Authorization').replace('Bearer ','');
        // console.log(token);
        // Verify the token
        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        // find the user based on the token
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token});

        if(!user){
            throw new Error();
        }
        // return the found user
        req.user=user;
        req.token=token;
        next(); // continue with route

    }catch(e){
        res.status(401).send({error:"Please authenticate first"});
    }
}
module.exports = auth;