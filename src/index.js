// modules
const express = require("express");
require("./db/mongoose"); // require mongoose connection
const User = require("./models/user"); // User model
const Task = require ("./models/task"); // Task model

const app = express(); // set up Express
const PORT = process.env.PORT || 3000; // set Port

app.use(express.json()); // Receive JSON back from Express

app.post("/users",async (req,res)=>{ // POST to users
    const user = new User(req.body); // use the request as the JSON body
    try{
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send();
    }

})
app.post("/tasks",async (req,res) =>{ // POST to tasks
    const task = new Task(req.body); // use the request as the JSON body
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(error);
    }
})

app.get("/users",async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).send(users);

    }catch(e){
        res.status(500).send(e);

    }
})

app.get("/users/:id", async (req,res)=>{
    const _id = req.params.id; // find by ID
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }catch(e){
        res.status(500).semd(e);
    }
})

app.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({}); // find all (no params)
        res.status(200).send(tasks);
    }catch(e){
        res.status(500).send(e);
    }        
})

app.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id; // find by ID
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(error)
    }
})

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});