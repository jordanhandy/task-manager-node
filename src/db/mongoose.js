const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONNECT,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
});
console.log("DB is Connected!");

// const me = new User({
//     name:"Jordan",
//     age:28,
//     password:"password",
//     email:"jordan@jordan.com"
// });
// me.save().then((result) =>{
//     console.log("Success",result);

// }).catch((error)=>{
//     console.log("Failure",error);

// });

// const task = new Task({
//     description:"Clean room    "
// });
// task.save().then((result) =>{
//     console.log(result,"Saved to database");
// }).catch((error)=>{
//     console.log("Error",error);
// })