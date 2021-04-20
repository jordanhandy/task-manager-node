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
    user.save().then(() =>{
        res.status(200).send(user);
    }).catch((e)=>{
        res.status(400).send(error);
    })

})

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});