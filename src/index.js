// modules
const app = require("./app");
const PORT = process.env.PORT; // set Port

app.listen(PORT,() =>{
    console.log("Server is listening on port " + PORT);
});

