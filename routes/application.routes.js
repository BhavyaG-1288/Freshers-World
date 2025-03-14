const express =require("express");
const authMiddleware = require("../middleware/authmiddleware");
const ApplicationRoute =express.Router();

//Apply for a JOB (Users)
ApplicationRoute.post("/jobId",authMiddleware(["users"]), async(req,res)=>{
    try{
        const newApplication =new ApplicationRoute({user:req.user.id, job:req.body.jobId,status:"pending"});
        await newApplication.save();
        res.status(201).json({msg:"Application submitted", application:newApplication})
    }catch(error){
        res.status(500).json({msg:"Error in Apply"})
    }
});

//Application status (Recruiter)

ApplicationRoute.get("/:id/status",authMiddleware(["recruiter","admin"]),async(req,res)=>{
    try{
        const {status}=req.body;
        const applicantions =await Applications.findById(req.params.id);
        if(!applicantions) return res.status(404).json({error:"Application not Found"});

        applicantions.status =status;
        await application.save();
        res.status(200).json({msg:"status Updated"});

    }catch(error){
        res.status(500).json({msg:"Applications not Found"});
    }
});

//View application (Employer)
ApplicationRoute.get("/job/jobId", authMiddleware(["recruiter","admin"]), async(req, res)=>{
    try{
        const applications =await ApplicationRoute.find({job:req.params.jobId}).populate("applicant", "name email");
        res.status(200).json({msg:"applications"});
    }catch(error){
        res.status(500).json({msg:"NOt Found"})
    }
});



module.exports =ApplicationRoute;