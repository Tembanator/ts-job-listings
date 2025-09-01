import React from "react";

const ApplicationItem = ({ application }: { application: Application }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {application.job.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {application.job.company}
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
        {new Date(application.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default ApplicationItem;
