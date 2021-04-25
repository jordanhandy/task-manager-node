const express = require('express');
const User = require('../models/user');
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require('multer');
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload an image file"));
        }
        cb(undefined,true);
        // cb(new Error("File must be an image"));
        // cb(undefined,true);
        // cb(undefined,false)
    }
});

router.post("/users",async (req,res)=>{ // POST to users
    const user = new User(req.body); // use the request as the JSON body
    try{
        // await the result of saving to db
        await user.save();
        const token = await user.generateAuthToken(); // ge the token for a new acct
        res.status(201).send({user,token}); // if successful
    }catch(e){ 
        res.status(400).send(e); // if unsuccessful
    }

})

// when a user logs in, fire the generateAuthToken model method
// to automatically authenticate the user
router.post("/users/login",async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(e){
        res.status(400).send();
    }
})

// filter out the token currently associated with the user session
// re-save to db
router.post("/users/logout",auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.status(200).send();

    }catch(e){
        res.status(500).send();
    }
})

// set the users token array to an empty array
// save this to db.
// Because there are no tokens in array, user is logged out
router.post("/users/logoutAll",auth,async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(500).send();

    }
})

// auth middleware only returns if valid user
// send to user route
router.get("/users/me",auth,async (req,res)=>{
    res.send(req.user);
})

router.patch('/users/me',auth,async(req,res) =>{
    const updates = Object.keys(req.body); // for updates, get keys of JSON params
    const allowedUpdates = ["name","email","password","age"]; // allowed update params
    isValidOperation = updates.every((update)=>{ // for every key, check if allowedUpdate exists
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!" }); // if not, invalid update
    }
    try{
        updates.forEach((update) =>{
            req.user[update] = req.body[update]
        })
        await req.user.save();
        //const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}); // find user
        res.status(200).send(req.user);
    }catch(e){
        res.status(400).send(e)

    }

})

// for uploading profile picture
router.post("/users/me/avatar",auth,upload.single('avatar'),async(req,res)=>{
    req.user.avatar = req.file.buffer //? Save the buffer data to the user avatar field
    console.log(req.file.buffer);
    await req.user.save(); //? Save to user profile
    res.send();
    //* MULTER IS CONFIGURED ABOVE
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

// delete currently auth'd user (auth) middleware
router.delete("/users/me",auth,async(req,res) => {
    try{
        await req.user.remove();
        res.status(200).send(req.user);
    }catch(e){
        res.status(500).send(e); // if error
    }
})
router.delete("/users/me/avatar",auth,async(req,res)=>{
    try{
        req.user.avatar = undefined; //? Delete the image binary in the avatar model field
        await req.user.save(); //? Re-save the user
        res.status(200).send({message:"Avatar removed"})

    }catch(e){
        res.status(500).send(e);
    }
})

//* Get user profile pictures
router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type','image/jpg');
        res.send(user.avatar)

    }catch(e){
        res.status(404).send();
    }
})

module.exports = router;