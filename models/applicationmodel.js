const mongoose =require("mongoose");

const ApplicationSchema =new mongoose.Schema({

    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String },
    resume: { type: String }, // Resume URL
    status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" },
},
{timestamps:true}
);


const ApplicationModel = mongoose.model("application","ApplicationSchema");

module.exports = ApplicationModel;