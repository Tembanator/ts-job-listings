import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import DeleteButton from "../DeleteButton";
import ClientLink from "./ClientLink";
import { ExternalLink } from "lucide-react";

const JobListingItem = ({ job }: { job: Job }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {job.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            job.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {job.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {format(new Date(job.createdAt), "PPP")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center">
        <Link
          href={`/job-details/${job._id}`}
          className="text-indigo-600 hover:text-indigo-900 mr-3"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
        <ClientLink jobId={job._id.toString()} />
        <DeleteButton id={job._id.toString()} />
      </td>
    </tr>
  );
};

export default JobListingItem;
