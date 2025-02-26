const express =require("express");
require("dotenv").config();
const UserRoute =express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = Number(process.env.SALT_ROUND);

//User Signup (Hash the password before storing in Database)

UserRoute.post("/signup", async(req,res)=>{
    try{
        //name email password role coming form req.body
        let rawPassword =req.body.password;
        bcrypt.hash(rawPassword, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            if(err) {
                res.status(500).json({msg:"Error in Signup"});
            }
            //hashed the password and generated
            //replace the password which is comming from body with hashed one
            let user = {...req.body, password: hash };
            //Store user in Db
            await UserModel.create(user);
            res.status(201).json({msg:"User Created", email:req.body.email, password:req.body.password});
        });
    }catch(err){
        console.log(err.errors);
        res.status(500).json({msg:"Error in signup, (catch)"});
    }
});
//Creating a Login 
UserRoute.post("/login", async (req,res)=>{
    //Email and password coming in from req.body
    //check the user present in Database 
    //if yes compare the password & generate token
    //if No send response Usernot found please signup.
    try{
        let userInDb = await UserModel.findOne({email:req.body.email});
        if(!userInDb){
            res.status(404).json({msg:"User Not Found,Please Signup"});
    }else{
        //user found
        let myPlaintextPassword =req.body.password;
        let hashedPassword =userInDb.password;
        bcrypt.compare(myPlaintextPassword, hashedPassword, function(err, result) {
            // result == true
            if(err){
                res.status(500).json({msg:"Error in Login,Please try again later"})
            }
            if(result){
                let dataToBeEncryptedInToken ={userId: userInDb._id};
                var token = jwt.sign( dataToBeEncryptedInToken, jwtSecretkey, {
                    expiresIn:"30min",
                });
                res.status(200).json({msg:"Login success..",token});
            }else{
                res.status(403).json({msg:"Wrong Paassword..."});
            }
        });
    }

    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Error in Login,(catch)"});
    }
});
UserRoute.post("/resetpassword", async (req, res) => {
    // email is coming from query and password is coming from body
    try {
      let userInDb = await UserModel.findOne({ email: req.query.email });
      console.log(userInDb)
      if (!userInDb) {
        /// user not found,
        console.log("if block")
        res.status(404).json({ msg: "User Not Found, Please Signup...." });
      } else {
        // user is present
        // hash the raw password coming from body
        let rawPassword = req.body.password;
        bcrypt.hash(rawPassword, saltRounds, async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            res.status(500).json({ msg: "Error in Reset" });
          }
          // hash generated
          // replace the raw password cominng from body with hashed password
          // update the user witrh new hashed password
  
          /// update password in db
          //method 1, is .save() method
  
          // userInDb.password = hash
          // await userInDb.save()
  
          // method2, findByID& Update
          await UserModel.findByIdAndUpdate(userInDb._id, { password: hash });
          res.status(200).json({
            msg: "Password Reset Sucess...",
            email: req.body.email,
            password: req.body.password,
          });
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error in Reset Password , (catch)" });
    }
  });




module.exports = UserRoute;