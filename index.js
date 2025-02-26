const express =require("express");
const connectToDb = require("./config");
const UserRoute = require("./routes/user.route");
require('dotenv').config();
const app =express();
app.use(express.json())
const PORT = process.env.PORT||8080

app.get("/", (req, res)=>{
    res.send("This is a test route")
})

app.use("/users", UserRoute);
app.listen(PORT,()=>{
    connectToDb();
    console.log("Server started");
})