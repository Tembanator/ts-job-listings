"use server";
import Job from "@/models/Job";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { CreateJobFormData } from "@/lib/validation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { findMyCurrentUser } from "./userActions";

export async function createJob(formData: CreateJobFormData) {
  try {
    await connectDB();
    const currentUser = await findMyCurrentUser();

    const newJob = {
      ...formData,
      salaryMinimum: Number(formData.salaryMinimum),
      salaryMaximum: Number(formData.salaryMaximum),
      postedBy: currentUser._id,
    };
    const job = new Job(newJob);
    await job.save();
    return { success: true };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false };
  }
}

export async function getTotalNumberOfJobs(query: any) {
  await connectDB();
  try {
    delete query.pageSize;
    delete query.pages;

    if (query.location) {
      query.location = { $regex: query.location, $options: "i" };
    }
    if (query.remote) {
      if (query.remote === "on") {
        query.remote = true;
      } else if (query.remote === "off") {
        query.remote = false;
      }
    }
    if (query.salaryMinimum) {
      query.salaryMinimum = {
        ...(query.salaryMinimum && { $gte: Number(query.salaryMinimum) }),
      };
    }
    if (query.salaryMaximum) {
      query.salaryMaximum = {
        ...(query.salaryMaximum && { $lte: Number(query.salaryMaximum) }),
      };
    }

    const jobsTotal = await Job.countDocuments(query);

    return JSON.parse(JSON.stringify(jobsTotal));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return JSON.parse(JSON.stringify([]));
  }
}
export async function getJobs(jobSearchParams: JobSearchParams) {
  await connectDB();
  try {
    console.log("getJobs query:", jobSearchParams);
    const filter = {
      ...(jobSearchParams.location && {
        location: { $regex: jobSearchParams.location, $options: "i" },
      }),
      ...(jobSearchParams.category && {
        category: jobSearchParams.category,
      }),
      ...(jobSearchParams.remote && {
        remote: jobSearchParams.remote === "on",
      }),
      ...(jobSearchParams.salaryMinimum && {
        salaryMinimum: { $gte: Number(jobSearchParams.salaryMinimum) },
      }),
      ...(jobSearchParams.salaryMaximum && {
        salaryMaximum: { $lte: Number(jobSearchParams.salaryMaximum) },
      }),
    };
    const pageSize = Number(jobSearchParams.pageSize) || 10;
    const pages = Number(jobSearchParams.page) || 1;

    const jobs = await Job.find(filter)
      .populate({
        path: "postedBy",
        model: User,
      })
      .limit(pageSize)
      .skip((pages - 1) * pageSize);

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return JSON.parse(JSON.stringify([]));
  }
}
export async function getAllJobs(jobSearchParams: JobSearchParams) {
  await connectDB();
  try {
    console.log("getJobs query:", jobSearchParams);
    const filter = {
      ...(jobSearchParams.location && {
        location: { $regex: jobSearchParams.location, $options: "i" },
      }),
      ...(jobSearchParams.category && {
        category: jobSearchParams.category,
      }),
      ...(jobSearchParams.remote && {
        remote: jobSearchParams.remote === "on",
      }),
      ...(jobSearchParams.salaryMinimum && {
        salaryMinimum: { $gte: Number(jobSearchParams.salaryMinimum) },
      }),
      ...(jobSearchParams.salaryMaximum && {
        salaryMaximum: { $lte: Number(jobSearchParams.salaryMaximum) },
      }),
    };
    console.log("getJobs filter:", filter);

    const jobs = await Job.find(filter).populate({
      path: "postedBy",
      model: User,
    });

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return JSON.parse(JSON.stringify([]));
  }
}

export async function searchJobs(formData: FormData) {
  "use server";
  // Get all filter terms from the form data.
  const locationTerm = formData.get("location")?.toString() || "";
  const categoryTerm = formData.get("category")?.toString() || "";
  const salaryMinimum = formData.get("salaryMinimum")?.toString() || "";
  const salaryMaximum = formData.get("salaryMaximum")?.toString() || "";
  const remote = formData.get("remote")?.toString() || "";

  // Create a new URLSearchParams object to build the query string.
  const params = new URLSearchParams();

  // Conditionally add parameters if they have a value.
  if (locationTerm) params.set("location", locationTerm);
  if (categoryTerm) params.set("category", categoryTerm);
  if (salaryMinimum) params.set("salaryMinimum", salaryMinimum);
  if (salaryMaximum) params.set("salaryMaximum", salaryMaximum);
  if (remote) params.set("remote", remote);

  // Get the full current URL from the request headers.
  // The 'referer' header is a reliable way to get the source URL on the server.
  const headersList = headers();
  const currentUrl = (await headersList).get("referer");

  // Check if the URL exists to prevent errors.
  if (!currentUrl) {
    console.error("Could not get current URL from 'referer' header.");
    // Redirect to a safe default path if the referer is not available.
    redirect(`/?${params.toString()}`);
  }

  // Create a URL object to easily extract the pathname.
  const url = new URL(currentUrl);

  // Get the pathname from the current URL (e.g., "/").
  const pathname = url.pathname;

  // Create a new URLSearchParams object to build the query string.
  // const params = new URLSearchParams();

  // Redirect the user to the current pathname with the new query string.
  redirect(`${pathname}?${params.toString()}`);
}

export async function getJobById(id: string): Promise<Job | null> {
  await connectDB();
  try {
    const job = await Job.findById(id).populate("postedBy");
    if (!job) {
      return null;
    }
    return JSON.parse(JSON.stringify(job));
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
}
export async function deleteJob(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await connectDB();
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return { success: false, message: "Job not found." };
    }
    return { success: true, message: "Job deleted successfully." };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, message: "Failed to delete job." };
  }
}
export async function updateJob(id: string, formData: FormData) {
  try {
    await connectDB();

    const updatedJob = await Job.findByIdAndUpdate(id, formData, {
      new: true,
    });
    if (!updatedJob) {
      return { success: false };
    }
    console.log("Job updated successfully:", updatedJob);
    return { success: true };
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false };
  }
}
