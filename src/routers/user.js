const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post("/users",async (req,res)=>{ // POST to users
    const user = new User(req.body); // use the request as the JSON body
    try{
        // await the result of saving to db
        await user.save();
        res.status(201).send(user); // if successful
    }catch(e){ 
        res.status(400).send(e); // if unsuccessful
    }

})

router.post("/users/login",async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(e){
        res.status(400).send();
    }
})

router.get("/users",async (req,res)=>{
    try{
        const users = await User.find({}); // find users
        res.status(200).send(users); // send back

    }catch(e){
        res.status(500).send(e); // error

    }
})

router.get("/users/:id", async (req,res)=>{
    const _id = req.params.id; // find by ID
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send(); // 404 if user not found
        }
        res.status(200).send(user); // otherwise, send user
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch('/users/:id',async(req,res) =>{
    const updates = Object.keys(req.body); // for updates, get keys of JSON params
    const allowedUpdates = ["name","email","password","age"]; // allowed update params
    isValidOperation = updates.every((update)=>{ // for every key, check if allowedUpdate exists
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!" }); // if not, invalid update
    }
    try{
        const _id = req.params.id;
        const user = await User.findById(_id);
        updates.forEach((update) =>{
            user[update] = req.body[update]
        })
        await user.save();
        //const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}); // find user
        if(!user){
            return res.status(404).send(); // if user not found
        }
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e)

    }

})

router.delete("/users/:id",async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id); // find user by id
        if(!user){
            return res.status(404).send(); // if user not found
        }
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e); // if error
    }
})


module.exports = router;