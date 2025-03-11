const express =require("express");
const authMiddleware = require("../middleware/authmiddleware");
const JobRoute =express.Router();

//creating a job
JobRoute.post("/create", authMiddleware, async(req,res)=>{
    try{
        const newJob =new Job(req.body);
        await newJob.save();
        res.status(201).json({msg:"Job Created successfully", job:newJob});
    }catch(error){
        res.status(500).json({msg:"Error in creating a Job"})
    }
});

//Get all Jobs
JobRoute.get("/", async(req,res)=>{
    try{
        const jobs= await Job.find();
        res.status(200).json(jobs);
    }catch(error){
        res.status(500).json({msg:"Error in getting in jobs data"});
    }
});

//Get a single Job by ID
JobRoute.get("/:id", async(req, res)=>{
    try{
        const job =await Job.findById(req.params.id);
        if(!job) return res.status(404).json({msg:"Job not found"});
        res.status(200).json({msg:"job"});
    }catch(error){
        res.status(500).json({msg:"Error in receving data"});
    }
});

// Update Job (Protected)
JobRoute.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Job (Protected)
JobRoute.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = JobRoute;
