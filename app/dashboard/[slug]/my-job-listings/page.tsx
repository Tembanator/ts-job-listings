import {
  getAllJobs,
  getJobs,
  getTotalNumberOfJobs,
} from "@/app/actions/jobActions";
import { findUserByClerkId } from "@/app/actions/userActions";
import JobListingItem from "@/app/components/dashboard/JobListingItem";
import NoJobsFound from "@/app/components/NoJobsFound";
import Pagination from "@/app/components/Pagination";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) {
  const { slug: clerkUserId } = await params;

  const myUser = await findUserByClerkId(clerkUserId);

  const awaitedSearchParams = await searchParams;
  awaitedSearchParams.postedBy = myUser._id;

  // console.log(awaitedSearchParams);
  const jobs = await getJobs(awaitedSearchParams);
  const allJobPosts: Job[] | [] = await getAllJobs({
    postedBy: myUser._id,
  });
  // console.log(jobs);
  if (!jobs || jobs.length === 0) {
    return (
      <NoJobsFound
        mainMessage="No job listings found"
        subMessage="Please post job posts for your company."
      />
    );
  }

  const totalJobs = allJobPosts.length;
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Job Listings</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Job Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Applicants
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Posted On
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job: Job) => (
              <JobListingItem key={job._id.toString()} job={job} />
            ))}
          </tbody>
        </table>
        <Pagination totalItems={totalJobs} />
      </div>
    </>
  );
}
