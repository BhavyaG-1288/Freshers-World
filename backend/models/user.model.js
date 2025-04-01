//Schema for Users
const mongoose =require("mongoose");

const UserSchema = new mongoose.Schema({
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        role:{type:String, enum:["user","admin","recruiter"],default:"user"},
        company:{type:String},
        bio:{type:String},
        resume:{type:String},
        appliedjobs:[{type:mongoose.Schema.Types.ObjectId, ref:"Application"}],
},
{timestamps:true}

);
const UserModel = mongoose.model("user", UserSchema);


module.exports = UserModel; 