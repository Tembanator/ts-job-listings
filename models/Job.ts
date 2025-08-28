// models/Job.js
// This file defines the Mongoose schema and model for a job listing,
// now including a reference to the user who posted it.

import mongoose from "mongoose";

// Define the schema for the Job model.
const jobSchema = new mongoose.Schema({
  // The job title, e.g., "Senior Product Designer"
  title: {
    type: String,
    required: true,
  },
  // The company offering the job, e.g., "Acme Inc."
  company: {
    type: String,
    required: true,
  },
  // The job location, e.g., "San Francisco, CA"
  location: {
    type: String,
    required: true,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  // The type of job, e.g., "Full-time"
  jobType: {
    type: String,
    required: true,
  },
  // The salary range for the position, e.g., "$120k - $150k"
  salaryMinimum: {
    type: Number,
    required: true,
  },
  // The salary range for the position, e.g., "$120k - $150k"
  salaryMaximum: {
    type: Number,
    required: true,
  },
  // A detailed description of the job.
  description: {
    type: String,
    required: true,
  },
  // An array of key responsibilities.
  responsibilities: {
    type: [String], // An array of strings
    required: true,
  },
  // An array of required qualifications for the role.
  qualifications: {
    type: [String], // An array of strings
    required: true,
  },
  status: {
    type: String,
    default: "draft",
  },
  // Reference to the user who posted the job.
  // This links a Job document to a User document in the database.
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 'User' is the name of the model we'll reference.
    required: true,
  },
  // A timestamp for when the job was created.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model from the schema.
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
