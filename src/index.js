// modules
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

const bcrypt = require('bcryptjs');
const myFunction = async() =>{
    const password = "red123454!"
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password,hashedPassword);
    console.log(isMatch);
}
myFunction()