// modules
const express = require("express");
const User = require("./models/user");
require("./db/mongoose");
require("./models/user");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users",(req,res)=>{
    const user = new User(req.body);
    user.save().then((result) =>{
        res.send("User created successfully",user);
    }).catch((error)=>{
        res.send("Unable to create user!",error);
    })

})

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});