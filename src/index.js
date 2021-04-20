// modules
const express = require("express");
require("./db/mongoose"); // require mongoose connection
const User = require("./models/user"); // User model
const Task = require ("./models/task"); // Task model

const app = express(); // set up Express
const PORT = process.env.PORT || 3000; // set Port

app.use(express.json()); // Receive JSON back from Express

app.post("/users",(req,res)=>{ // POST to users
    const user = new User(req.body); // use the request as the JSON body
    user.save().then(() =>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(error);
    })

})
app.post("/tasks",(req,res) =>{ // POST to tasks
    const task = new Task(req.body); // use the request as the JSON body
    task.save().then((task) => {
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    });
})

app.get("/users",(req,res)=>{
    User.find({}).then((users) =>{ // find all (no criteria)
        res.status(200).send(users);
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.get("/users/:id",(req,res)=>{
    const _id = req.params.id; // find by ID
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send(); // 404
        }
        res.status(200).send(user);
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{ // find all (no params)
        res.status(200).send(tasks)
    }).catch((error)=>{
        res.status(500).send(error)
    });
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id; // find by ID
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send() // 404
        }
        res.status(200).send(task)
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});