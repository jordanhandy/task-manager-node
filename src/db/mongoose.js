const mongoose = require('mongoose');
const validator = require("validator");
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
});
const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot contain password");
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number!");
            }
        }
    }
})
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
const Task = mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        required: false,
        default: false
    }
});
const task = new Task({
    description:"Clean room    "
});
task.save().then((result) =>{
    console.log(result,"Saved to database");
}).catch((error)=>{
    console.log("Error",error);
})