import React from "react";

export default function page() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
      <p className="text-gray-700 mb-8">
        Manage users, job listings, and site configurations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">
            Total Users
          </h3>
          <p className="text-4xl font-bold text-purple-600">1200</p>
          <p className="text-sm text-purple-700">Job seekers and companies</p>
        </div>
        <div className="bg-teal-50 p-6 rounded-lg shadow-sm border border-teal-200">
          <h3 className="text-lg font-semibold text-teal-800 mb-2">
            Pending Jobs
          </h3>
          <p className="text-4xl font-bold text-teal-600">7</p>
          <p className="text-sm text-teal-700">Awaiting approval</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Reported Content
          </h3>
          <p className="text-4xl font-bold text-red-600">2</p>
          <p className="text-sm text-red-700">Requires review</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Manage Job Listings
      </h2>
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
                Company
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Marketing Manager
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Innovate LLC
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-3 focus:outline-none">
                  Approve
                </button>
                <button className="text-red-600 hover:text-red-900 focus:outline-none">
                  Reject
                </button>
              </td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </div>
    </>
  );
}
