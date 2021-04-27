const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

//? Generate our Own user ID so that it is consistent at each test
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name:"Jason Hidalgo",
    email:"jason@testsuite.com",
    password:"what561.ca",
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.JWT_TOKEN)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name:"Bo Bichalka",
    email:"bo@testsuite.com",
    password:"what561.ca",
    tokens: [{
        token: jwt.sign({_id: userTwoId},process.env.JWT_TOKEN)
    }]
}

const taskOneId = new mongoose.Types.ObjectId();
const taskOne = {
    _id: taskOneId,
    description: "This is task one",
    completed: false,
    owner: userOneId
}
const taskTwoId = new mongoose.Types.ObjectId();
const taskTwo = {
    _id: taskTwoId,
    description: "This is completed task two",
    completed: true,
    owner: userTwoId
}

const taskThreeId = new mongoose.Types.ObjectId();
const taskThree = {
    _id: taskThreeId,
    description: "This is completed task three",
    completed: true,
    owner: userOneId
}

const setupDatabase = async ()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    setupDatabase,
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree
}