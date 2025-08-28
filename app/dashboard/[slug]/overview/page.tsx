import { getUserApplications } from "@/app/actions/applicationActions";
import { findUserByClerkId } from "@/app/actions/userActions";
import { currentUser } from "@clerk/nextjs/server";
import { FileText, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  if (!user) {
    return;
  }

  const myUser = await findUserByClerkId(user.id);

  if (role === "job-seeker") {
    var applications = await getUserApplications({
      applicant: myUser._id.toString(),
    });
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, User!</h1>
      <p className="text-gray-700 mb-8">
        This is your personalized dashboard. Explore your applications, manage
        your job listings, or update your profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {role === "job-seeker" && (
          <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">
              Total Applications
            </h3>
            <p className="text-4xl font-bold text-indigo-600">
              {applications.length}
            </p>
            <p className="text-sm text-indigo-700">Across all jobs</p>
          </div>
        )}

        {role === "company" && (
          <>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Active Listings
              </h3>
              <p className="text-4xl font-bold text-green-600">5</p>
              <p className="text-sm text-green-700">Currently active jobs</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                New Applicants
              </h3>
              <p className="text-4xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">In the last 24 hours</p>
            </div>
          </>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-4">
        {role === "company" && (
          <Link
            href={`/dashboard/${myUser._id}/post-job`}
            className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Post New Job</span>
          </Link>
        )}
        {role === "job-seeker" && (
          <Link
            href={`/dashboard/${user.id}/applied-jobs`}
            className="px-5 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center space-x-2"
          >
            <FileText size={20} />
            <span>View My Applications</span>
          </Link>
        )}
        {role === "job-seeker" && (
          <button className="px-5 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex items-center space-x-2">
            <Settings size={20} />
            <span>Update Profile</span>
          </button>
        )}
      </div>
    </>
  );
}
