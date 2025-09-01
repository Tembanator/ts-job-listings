import React from "react";
import {
  getAllJobs,
  getJobs,
  getTotalNumberOfJobs,
} from "../actions/jobActions";
import FilterForm from "../components/FilterForm";
import JobListings from "../components/JobListings";

async function page({ searchParams }: { searchParams: JobSearchQuery }) {
  const awaitedSearchParams = searchParams;
  const jobPosts: Job[] | [] = await getJobs(awaitedSearchParams);
  const numJobs = await getTotalNumberOfJobs(awaitedSearchParams);
  const allJobPosts: Job[] | [] = await getAllJobs({});

  const activeJobPosts = jobPosts.filter((job) => job.status === "draft");
  const activeAllJobPosts = allJobPosts.filter(
    (job) => job.status === "active"
  );

  // Get unique categories and locations from the mock data for the select dropdowns
  const uniqueCategories = [
    ...new Set(activeAllJobPosts.map((job) => job.category)),
  ];

  if (activeJobPosts.length === 0) {
    return <div className="grid grid-cols-1 gap-6">No job postings found.</div>;
  }
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-2/5 lg:sticky lg:top-6 lg:h-screen lg:overflow-y-auto bg-gray-200/10 p-6 rounded-lg shadow-md border border-gray-200">
        <FilterForm
          uniqueCategories={uniqueCategories}
          params={awaitedSearchParams}
        />
      </aside>

      {/* Job Listings Results */}
      <JobListings jobs={activeJobPosts} numJobs={numJobs} />
    </div>
  );
}

export default page;
