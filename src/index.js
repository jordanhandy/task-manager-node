// modules
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require ("./models/task");
const { Mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users",(req,res)=>{
    const user = new User(req.body);
    user.save().then(() =>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(error);
    })

})
app.post("/tasks",(req,res) =>{
    const task = new Task(req.body);
    task.save().then((task) => {
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    });
})

app.get("/users",(req,res)=>{
    User.find({}).then((users) =>{
        res.status(200).send(users);
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.get("/users/:id",(req,res)=>{
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});