import Link from "next/link";
import React from "react";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
          G
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">
            {job.company} - {job.location}
          </p>
          <p className="text-sm text-green-600 mt-1 font-medium">
            {job.jobType}
          </p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">
        {job.description.length > 100
          ? job.description.substring(0, 100) + "..."
          : job.description}
      </p>
      <div className="flex justify-end mt-4">
        <Link
          href={`/job-details/${job._id}`}
          className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          More details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
