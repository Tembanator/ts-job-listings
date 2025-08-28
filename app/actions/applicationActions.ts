"use server";
import Job from "@/models/Job";
import User from "@/models/User";
import Application from "@/models/Application";
import connectDB from "@/lib/mongodb";
import { CreateJobFormData } from "@/lib/validation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
    console.log("Application created successfully:");
    return { success: true };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false };
  }
}
// export async function getTotalNumberOfJobs(query: any) {
//   await connectDB();
//   try {
//     const pageSize = Number(query.pageSize) || 5;
//     const pages = Number(query.pages) || 1;

//     delete query.pageSize;
//     delete query.pages;

//     if (query.location) {
//       query.location = { $regex: query.location, $options: "i" };
//     }
//     if (query.remote) {
//       if (query.remote === "on") {
//         query.remote = true;
//       } else if (query.remote === "off") {
//         query.remote = false;
//       }
//     }
//     if (query.salaryMinimum) {
//       query.salaryMinimum = {
//         ...(query.salaryMinimum && { $gte: Number(query.salaryMinimum) }),
//       };
//     }
//     if (query.salaryMaximum) {
//       query.salaryMaximum = {
//         ...(query.salaryMaximum && { $lte: Number(query.salaryMaximum) }),
//       };
//     }

//     const jobsTotal = await Job.countDocuments(query);

//     // console.log("Fetched jobs:", jobs);
//     return JSON.parse(JSON.stringify(jobsTotal));
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return JSON.parse(JSON.stringify([]));
//   }
// }
export async function getUserApplications(query: any) {
  await connectDB();
  try {
    const pageSize = Number(query.pageSize) || 10;
    const pages = Number(query.pages) || 1;

    delete query.pageSize;
    delete query.pages;

    const applications = await Application.find(query)
      .populate({
        path: "applicant",
        model: User,
      })
      .populate({
        path: "job",
        model: Job,
      })
      .limit(pageSize)
      .skip((pages - 1) * pageSize);

    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    console.error("Error fetching applications:", error);
    return JSON.parse(JSON.stringify([]));
  }
}
// export async function getAllJobs(query: any) {
//   await connectDB();
//   try {
//     const pageSize = Number(query.pageSize) || 10;
//     const pages = Number(query.pages) || 1;

//     delete query.pageSize;
//     delete query.pages;

//     if (query.location) {
//       query.location = { $regex: query.location, $options: "i" };
//     }
//     if (query.remote) {
//       if (query.remote === "on") {
//         query.remote = true;
//       } else if (query.remote === "off") {
//         query.remote = false;
//       }
//     }
//     if (query.salaryMinimum) {
//       query.salaryMinimum = {
//         ...(query.salaryMinimum && { $gte: Number(query.salaryMinimum) }),
//       };
//     }
//     if (query.salaryMaximum) {
//       query.salaryMaximum = {
//         ...(query.salaryMaximum && { $lte: Number(query.salaryMaximum) }),
//       };
//     }

//     const jobs = await Job.find(query).populate({
//       path: "postedBy",
//       model: User,
//     });

//     // console.log("Fetched jobs:", jobs);
//     return JSON.parse(JSON.stringify(jobs));
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return JSON.parse(JSON.stringify([]));
//   }
// }

// export async function searchJobs(formData: FormData) {
//   "use server";
//   // Get all filter terms from the form data.
//   const locationTerm = formData.get("location")?.toString() || "";
//   const categoryTerm = formData.get("category")?.toString() || "";
//   const salaryMinimum = formData.get("salaryMinimum")?.toString() || "";
//   const salaryMaximum = formData.get("salaryMaximum")?.toString() || "";
//   const remote = formData.get("remote")?.toString() || "";

//   // Create a new URLSearchParams object to build the query string.
//   const params = new URLSearchParams();

//   // Conditionally add parameters if they have a value.
//   if (locationTerm) params.set("location", locationTerm);
//   if (categoryTerm) params.set("category", categoryTerm);
//   if (salaryMinimum) params.set("salaryMinimum", salaryMinimum);
//   if (salaryMaximum) params.set("salaryMaximum", salaryMaximum);
//   if (remote) params.set("remote", remote);

//   // Get the full current URL from the request headers.
//   // The 'referer' header is a reliable way to get the source URL on the server.
//   const headersList = headers();
//   const currentUrl = (await headersList).get("referer");

//   // Check if the URL exists to prevent errors.
//   if (!currentUrl) {
//     console.error("Could not get current URL from 'referer' header.");
//     // Redirect to a safe default path if the referer is not available.
//     redirect(`/?${params.toString()}`);
//   }

//   // Create a URL object to easily extract the pathname.
//   const url = new URL(currentUrl);

//   // Get the pathname from the current URL (e.g., "/").
//   const pathname = url.pathname;

//   // Create a new URLSearchParams object to build the query string.
//   // const params = new URLSearchParams();

//   // Redirect the user to the current pathname with the new query string.
//   redirect(`${pathname}?${params.toString()}`);
// }

// export async function getJobById(id: string): Promise<Job | null> {
//   await connectDB();
//   try {
//     const job = await Job.findById(id).populate("postedBy");
//     if (!job) {
//       return null;
//     }
//     return JSON.parse(JSON.stringify(job));
//   } catch (error) {
//     console.error("Error fetching job by ID:", error);
//     return null;
//   }
// }
// export async function deleteJob(
//   id: string
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     await connectDB();
//     const deletedJob = await Job.findByIdAndDelete(id);
//     if (!deletedJob) {
//       return { success: false, message: "Job not found." };
//     }
//     console.log("Job deleted successfully:", deletedJob);
//     return { success: true, message: "Job deleted successfully." };
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     return { success: false, message: "Failed to delete job." };
//   }
// }
// export async function updateJob(id: string, formData: FormData) {
//   try {
//     await connectDB();

//     const updatedJob = await Job.findByIdAndUpdate(id, formData, {
//       new: true,
//     });
//     if (!updatedJob) {
//       return { success: false };
//     }
//     console.log("Job updated successfully:", updatedJob);
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating job:", error);
//     return { success: false };
//   }
// }
