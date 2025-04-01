//
const express =require("express");
require('dotenv').config();
const UserRoute =express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const saltRounds = Number(process.env.SALT_ROUND);
const jwtSecretkey =process.env.JWT_SECRET_KEY

//Create a signup Route

UserRoute.post("/signup", async(req, res)=>{
    try{
        let rawPassword = req.body.password;
        bcrypt.hash(rawPassword , saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                
                res.status(500).json({msg:"Error in Signup"})
            }
            let user= {...req.body, password:hash };
            //store user in Database
            await UserModel.create(user);
            res.status(201).json({msg:"User Created", email: req.body.email, password: req.body.password});
        });
    }catch(err){
        res.status(500).json({msg:"Error in signup, (catch)"});
    }
});

UserRoute.post("/login", async(req, res)=>{
    try{
        let userInDb = await UserModel.findOne({ email: req.body.email });
        if(!userInDb){
            res.status(404).json({msg:"User Not Found, Please Signup"})
        }
            let myPlaintextPassword =req.body.password;
            let hashedPassword = userInDb.password;
            bcrypt.compare(myPlaintextPassword, hashedPassword,  function (err, result) {
                // result == true
                if(err){
                    res.status(500).json({msg:"Error in Login Please try again Later"});
                }
                if(result){
                    let dataToBeEncryptedInToken = { userId: userInDb._id};
                    var token = jwt.sign(dataToBeEncryptedInToken,jwtSecretkey, {expiresIn:"30min"});
                    
                    res.status(200).json({msg:"Login Succuess...", token });
                }else{
                    res.status(403).json({msg:"Wrong password..."})
                }
            });
        }catch(err){
        res.status(500).json({msg:"Error in Login, (catch)"});
    }
});
module.exports = UserRoute;