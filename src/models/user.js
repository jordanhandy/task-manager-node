const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
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
    },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},{
    timestamps:true //? To allow for timestamps to be stored in the db
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

//! This is run when res.send is called.  This happens before
//! the send completes, as the data is converted to JSON
//! delete unimportant data from being sent back
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    delete userObject.avatar;
    return userObject;
}

// define a method per instance of the model creation
userSchema.methods.generateAuthToken = async function(){
    const user = this; // create a user var
    // create a token, and sign it with a payload of the user ID
    // needs to be converted to String, because of mongo
    const token = jwt.sign({ _id:user.id.toString() },process.env.JWT_TOKEN);
    // concat the token to the end of the user record that already exists
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token; // return the token

}

// define new method for finding users by credentials.  The 'statics'
// method on the schema allows us to do this
userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Unable to login");
    }
    return user;
}

// has the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();

})
// Delete user tasks when user is removed
userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;