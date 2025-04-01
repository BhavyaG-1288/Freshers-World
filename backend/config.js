const mongoose = require("mongoose");

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to DB")
    }catch(err){
        console.log("Failed to connect")
    }
}

module.exports = connectToDb;