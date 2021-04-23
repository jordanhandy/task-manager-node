const express = require("express");
const router = express.Router();
const Task = require ("../models/task"); // Task model

router.post("/tasks",async (req,res) =>{ // POST to tasks
    const task = new Task(req.body); // use the request as the JSON body
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(error);
    }
})

router.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({}); // find all (no params)
        res.status(200).send(tasks);
    }catch(e){
        res.status(500).send(e);
    }        
})

router.get('/tasks/:id',async(req,res)=>{
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

router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)  // get JSON keys
    const allowedUpdates = ["description","completed"]; // allowed updates
    isValidOperation = updates.every((update)=>{ // check if keys exist in allowed updates
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid update!"}); // if not, invalid update
    }
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        updates.forEach((update) =>{
            task[update] = req.body[update]
        })
        await task.save();
        //const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/tasks/:id",async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id); // find by id
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = router;