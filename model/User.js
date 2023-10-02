const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    location:{
        type:String,
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    occupation:{
        type:String
    }
});
module.exports=mongoose.model('user',UserSchema)