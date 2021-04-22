// modules
require("dotenv").config();
const express = require("express");
require("./db/mongoose"); // require mongoose connection
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express(); // set up Express
const PORT = process.env.PORT || 3000; // set Port

app.use(express.json()); // Receive JSON back from Express
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});
