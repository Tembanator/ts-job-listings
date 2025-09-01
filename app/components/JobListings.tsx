import React from "react";
import JobCard from "./JobCard";
import NoJobsFound from "./NoJobsFound";
import Pagination from "./Pagination";

const JobListings = async ({
  jobs,
  numJobs,
}: {
  jobs: Job[];
  numJobs: number;
}) => {
  if (jobs.length === 0) {
    return (
      <NoJobsFound
        mainMessage="No job listings found"
        subMessage="Please try adjusting your search filters or check back later."
      />
    );
  }

  return (
    <div className="w-full lg:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id.toString()} job={job} />
        ))}
      </div>
      <Pagination totalItems={numJobs} />
    </div>
  );
};

export default JobListings;
