// modules
require('dotenv').config();
const express = require("express");
require("./db/mongoose"); // require mongoose connection
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express(); // set up Express

const multer = require("multer");
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 10
    }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})

app.use(express.json()); // Receive JSON back from Express
app.use(userRouter);
app.use(taskRouter);
module.exports = app;
