"use server";
import Job from "@/models/Job";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { CreateJobFormData } from "@/lib/validation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { findMyCurrentUser } from "./userActions";
import { da } from "zod/v4/locales";
import Application from "@/models/Application";

type JobFilter = {
  location?: { $regex: string; $options: string };
  category?: string;
  remote?: boolean;
  salaryMinimum?: { $gte: number };
  salaryMaximum?: { $lte: number };
  pages?: number;
};

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

export async function getTotalNumberOfJobs(jobSearchParams: JobSearchParams) {
  await connectDB();
  try {
    const filter: JobFilter = {};

    if (jobSearchParams.location) {
      filter.location = { $regex: jobSearchParams.location, $options: "i" };
    }

    if (jobSearchParams.category) {
      filter.category = jobSearchParams.category;
    }

    if (jobSearchParams.remote) {
      filter.remote = jobSearchParams.remote === "on";
    }

    if (jobSearchParams.salaryMinimum) {
      filter.salaryMinimum = { $gte: Number(jobSearchParams.salaryMinimum) };
    }

    if (jobSearchParams.salaryMaximum) {
      filter.salaryMaximum = { $lte: Number(jobSearchParams.salaryMaximum) };
    }

    const jobsTotal = await Job.countDocuments(filter);

    return JSON.parse(JSON.stringify(jobsTotal));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return JSON.parse(JSON.stringify([]));
  }
}

export async function getJobs(
  jobSearchParams: JobSearchParams,
  paginated: boolean
) {
  try {
    const filter: JobFilter = {};

    if (jobSearchParams.location) {
      filter.location = { $regex: jobSearchParams.location, $options: "i" };
    }

    if (jobSearchParams.category) {
      filter.category = jobSearchParams.category;
    }

    if (jobSearchParams.remote) {
      filter.remote = jobSearchParams.remote === "on";
    }

    if (jobSearchParams.salaryMinimum) {
      filter.salaryMinimum = { $gte: Number(jobSearchParams.salaryMinimum) };
    }

    if (jobSearchParams.salaryMaximum) {
      filter.salaryMaximum = { $lte: Number(jobSearchParams.salaryMaximum) };
    }

    const pageSize = 10;
    const pages = Number(jobSearchParams.pages) || 1;

    let jobs: Job[] = [];

    if (paginated) {
      jobs = await Job.find(filter)
        .populate({
          path: "postedBy",
          model: User,
        })
        .limit(pageSize)
        .skip((pages - 1) * pageSize);
    }
    if (!paginated) {
      jobs = await Job.find(filter).populate({
        path: "postedBy",
        model: User,
      });
    }
    return JSON.parse(JSON.stringify({ success: true, data: jobs }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return JSON.parse(JSON.stringify({ success: false, data: [] }));
  }
}
// export async function getAllJobs(jobSearchParams: JobSearchParams) {
//   await connectDB();
//   try {
//     const filter: JobFilter = {};

//     if (jobSearchParams.location) {
//       filter.location = { $regex: jobSearchParams.location, $options: "i" };
//     }

//     if (jobSearchParams.category) {
//       filter.category = jobSearchParams.category;
//     }

//     if (jobSearchParams.remote) {
//       filter.remote = jobSearchParams.remote === "on";
//     }

//     if (jobSearchParams.salaryMinimum) {
//       filter.salaryMinimum = { $gte: Number(jobSearchParams.salaryMinimum) };
//     }

//     if (jobSearchParams.salaryMaximum) {
//       filter.salaryMaximum = { $lte: Number(jobSearchParams.salaryMaximum) };
//     }

//     const jobs = await Job.find(filter).populate({
//       path: "postedBy",
//       model: User,
//     });

//     return JSON.parse(JSON.stringify({ success: true, data: jobs }));
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return JSON.parse(JSON.stringify({ success: false, data: [] }));
//   }
// }

export async function getUniqueCategories() {
  await connectDB();
  try {
    const categories: string[] = await Job.distinct("category");
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching unique categories:", error);
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
    const existingApplications = await Application.find({
      job: deletedJob._id,
    });

    if (existingApplications.length > 0) {
      await Application.deleteMany({ job: deletedJob._id });
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
