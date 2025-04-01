const express =require("express");
const connectToDb = require("./config");
const UserRoute = require("./routes/user.routes");
const JobRoute = require("./routes/job.routes");
const ApplicationRoute = require("./routes/application.routes");
require('dotenv').config()
const app =express();
const PORT = process.env.PORT||8080;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("This is a test route")
});
app.use("/users",UserRoute);
app.use("/job",JobRoute);
app.use("/applications", ApplicationRoute);

app.listen(PORT,()=>{
    connectToDb();
    console.log("Server started");
})