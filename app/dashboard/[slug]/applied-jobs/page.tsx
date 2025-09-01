import { getUserApplications } from "@/app/actions/applicationActions";
import { findUserByClerkId } from "@/app/actions/userActions";
import ApplicationItem from "@/app/components/ApplicationItem";
import NoApplicationsFound from "@/app/components/NoApplicationsFound";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const myUser = await findUserByClerkId(user.id);

  const applications = await getUserApplications({
    applicant: myUser._id.toString(),
  });

  if (applications.length === 0) {
    return <NoApplicationsFound />;
  }

  console.log(applications);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Job Applications
      </h1>
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
                Application Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Applied On
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application: any) => (
              <ApplicationItem
                key={application._id}
                application={application}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
