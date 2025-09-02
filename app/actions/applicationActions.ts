"use server";
import Job from "@/models/Job";
import User from "@/models/User";
import Application from "@/models/Application";
import connectDB from "@/lib/mongodb";
import { findMyCurrentUser } from "./userActions";

export async function createApplication(resumeUrl: string, jobId: string) {
  try {
    await connectDB();
    const currentUser = await findMyCurrentUser();

    const newApplication = {
      resumeUrl: resumeUrl,
      applicant: currentUser._id,
      job: jobId,
    };
    const application = new Application(newApplication);
    await application.save();
    return { success: true };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false };
  }
}

export async function getUserApplications(query: { applicant: string }) {
  await connectDB();
  try {
    const applications = await Application.find(query)
      .populate({
        path: "applicant",
        model: User,
      })
      .populate({
        path: "job",
        model: Job,
      });

    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    console.error("Error fetching applications:", error);
    return JSON.parse(JSON.stringify([]));
  }
}
export async function getJobApplications(query: { job: string }) {
  await connectDB();
  try {
    const applications = await Application.find(query)
      .populate({
        path: "applicant",
        model: User,
      })
      .populate({
        path: "job",
        model: Job,
      });

    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    console.error("Error fetching applications:", error);
    return JSON.parse(JSON.stringify([]));
  }
}
export async function getTotalNumberOfApplications(query: { job: string }) {
  await connectDB();
  try {
    const applicationsTotal = await Application.countDocuments(query);

    // console.log("Fetched jobs:", jobs);
    return JSON.parse(JSON.stringify(applicationsTotal));
  } catch (error) {
    console.error("Error fetching applications count:", error);
    return JSON.parse(JSON.stringify([]));
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await connectDB();

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { applicationStatus: status },
      {
        new: true,
      }
    );
    if (!updatedApplication) {
      return { success: false };
    }
    console.log("Application updated successfully:", updatedApplication);
    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false };
  }
}
