const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require ("../models/task"); // Task model

router.post("/tasks",auth,async (req,res) =>{ // POST to tasks
    const task = new Task({
        ...req.body,
        owner:req.user._id
    }) // Spread the task body info found from the original request, (req.body.description)
    // req.body.title.  We're also adding an owner property to the object, and this is
    // the user ID passed back from the auth middleware
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(error);
    }
})
//* GET /tasks?completed=true | false
//* GET /tasks?limit=10&skip=10
router.get('/tasks',auth,async (req,res)=>{
    const match = {};
        if(req.query.completed){
            match.completed = req.query.completed === "true" 
        }
    try{
        //? This find criteria comes from the returned userID from the auth middleware
        const tasks = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate(); //? find all (comes from the relationship between users and task [see model])
        res.status(200).send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }        
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id; // find by ID
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
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
        const task = await Task.findOne({_id,owner:req.user._id});
        //const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update) =>{
            task[update] = req.body[update]
        })
        await task.save();
        res.status(200).send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete( {_id:req.params.id, owner:req.user._id} ); // find by id
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = router;