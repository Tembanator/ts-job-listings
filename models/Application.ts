import mongoose, { Schema } from "mongoose";

const ApplicationSchema: Schema = new Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // 'Job' is the name of the model we'll reference.
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ["Under Review", "Rejected", "Interview Scheduled"],
    required: true,
    default: "Under Review", // Set a default status when a new application is created
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  applicant: {
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

// Create the Mongoose model from the schema
const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
