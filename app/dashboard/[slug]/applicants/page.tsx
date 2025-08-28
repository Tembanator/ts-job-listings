import React from "react";

export default function page() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Applicants for "Software Engineer"
      </h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Applicant Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
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
                Applied On
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                John Doe
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                john.doe@example.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  New
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Jun 15, 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View Resume
                </a>
                <button className="text-green-600 hover:text-green-900 mr-3 focus:outline-none">
                  Accept
                </button>
                <button className="text-red-600 hover:text-red-900 focus:outline-none">
                  Reject
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Jane Smith
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                jane.smith@example.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Interview
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Jun 12, 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View Resume
                </a>
                <button className="text-green-600 hover:text-green-900 mr-3 focus:outline-none">
                  Accept
                </button>
                <button className="text-red-600 hover:text-red-900 focus:outline-none">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
