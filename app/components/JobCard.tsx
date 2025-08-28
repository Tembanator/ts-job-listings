import {
  ArrowRight,
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";

const JobCard = ({ job }: { job: Job }) => {
  // const postedDate = formatDistance(new Date(), new Date(job.createdAt), {
  //   includeSeconds: true,
  // });

  // This function automatically calculates the distance from the provided date to "now"
  const postedDate = formatDistanceToNow(job.createdAt, {
    addSuffix: true, // This will add "ago" to the string
  });

  return (
    // <div
    //   className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 transform
    //              bg-white hover:shadow-lg hover:scale-[1.01] hover:bg-gradient-to-br from-purple-500/5 to-indigo-500/5"
    // >
    //   {/* Main card content with flexible layout */}
    //   <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
    //     {/* Job details section */}
    //     <div className="flex-grow mb-4 md:mb-0">
    //       <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
    //         {job.title}
    //       </h2>
    //       <p className="text-indigo-600 font-semibold mt-1">{job.company}</p>

    //       {/* Icon-based info row */}
    //       <div className="mt-3 text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row text-sm">
    //         <span className="flex items-center">
    //           <MapPin size={16} className="text-gray-400 mr-2" />
    //           {job.location || "Remote"}
    //         </span>
    //         <span className="flex items-center">
    //           <Briefcase size={16} className="text-gray-400 mr-2" />
    //           {job.jobType}
    //         </span>
    //         <span className="flex items-center">
    //           <DollarSign size={16} className="text-gray-400 mr-2" />
    //           {job.salaryMinimum} - {job.salaryMaximum}
    //         </span>
    //       </div>
    //     </div>

    //     {/* Button and posted date section */}
    //     <div className="flex flex-col items-start md:items-end space-y-2">
    //       {/* This is the updated indigo button */}
    //       <Link
    //         href={`/job-details/${job._id}`}
    //         className="group relative w-full sm:w-auto flex items-center justify-center
    //                    bg-gradient-to-r from-indigo-500 to-indigo-800 text-white font-medium
    //                    py-2 px-6 rounded-full shadow-lg transition-transform duration-300
    //                    hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2
    //                    focus:ring-indigo-500 cursor-pointer"
    //       >
    //         View Details
    //         <ArrowRight
    //           size={18}
    //           className="ml-2 group-hover:translate-x-1 transition-transform"
    //         />
    //       </Link>
    //       <span className="text-xs text-gray-500 mt-2">
    //         <Calendar size={12} className="inline-block mr-1 -mt-0.5" />
    //         {postedDate}
    //       </span>
    //     </div>
    //   </div>
    // </div>
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
