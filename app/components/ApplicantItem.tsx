import Link from "next/link";
import React from "react";
import ChangeApplicationStatusButton from "./dashboard/applicants/ChangeApplicationStatusButton";

const ApplicantItem = ({ application }: { application: any }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {application.applicant.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {application.applicant.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            application.applicationStatus === "New"
              ? "bg-blue-100 text-blue-800"
              : application.applicationStatus === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {application.applicationStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(application.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center space-x-4">
        <Link
          target="_blank"
          href={application.resumeUrl.toString()}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View Resume
        </Link>
        <ChangeApplicationStatusButton
          id={application._id}
          status="Accepted"
          displayText="Accept"
        />
        <ChangeApplicationStatusButton
          id={application._id}
          status="Rejected"
          displayText="Reject"
        />
      </td>
    </tr>
  );
};

export default ApplicantItem;
