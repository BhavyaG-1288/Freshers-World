//Schema for Jobs
const mongoose =require("mongoose");

const JobSchema =new mongoose.Schema( {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Remote", "Contract"], required: true },
    skills: [{ type: String, required: true }], //skills
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }], 
     
},
{timestamps:true}
);

const JobModel = mongoose.model("job", JobSchema);

module.exports = JobModel;
