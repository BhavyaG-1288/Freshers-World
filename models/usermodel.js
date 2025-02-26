const mongoose =require("mongoose");

const UserSchema = new mongoose.Schema({
        name:{type:string, required:true},
        email:{type:string, required:true, unique:true},
        password:{type:string, required:true, minlength:6},
        role:{type:string, enum:["user","admin", "admin"],default:"user"},
        company:{type:string},
        bio:{type:string},
        resume:{type:string},
        appliedjobs:[{type:mongoose.Schema.Types.ObjectId, ref:"Application"}],
},
{timestamps:true}

);
const UserModel = mongoose.model("user", UserSchema);


module.exports = UserModel; 