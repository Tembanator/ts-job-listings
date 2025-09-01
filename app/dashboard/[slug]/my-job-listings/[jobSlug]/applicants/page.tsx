import { getJobApplications } from "@/app/actions/applicationActions";
import ApplicantItem from "@/app/components/ApplicantItem";
import React from "react";

export default async function page({
  params,
}: {
  params: { jobSlug: string };
}) {
  const { jobSlug } = params;
  const applications = await getJobApplications({ job: jobSlug.toString() });
  console.log(applications);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Applicants for {applications[0]?.job?.title}
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
            {applications.map((application: Application) => (
              <ApplicantItem key={application._id} application={application} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
