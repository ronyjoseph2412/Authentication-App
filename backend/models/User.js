const { default: mongoose } = require("mongoose");

// Importing Mongoose
const {Schema} = mongoose
const UserSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
    },
    bio:{
        type:String,
    },
    phone:{
        type:String,
    },
    photo:{
        type:String,
    },

}) 
const User=mongoose.model('user',UserSchema);
module.exports = User;
