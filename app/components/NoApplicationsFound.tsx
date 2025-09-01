"use client";

import React from "react";
import Link from "next/link";
import { Frown } from "lucide-react";

// The NoApplications component displays a message and a call-to-action button
// when a user has no job applications in their list.
// The design is inspired by the provided image, using a clean, modern card layout.
const NoApplicationsFound = () => {
  return (
    <div className="min-h-screen font-sans antialiased flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center flex flex-col items-center">
        {/* An icon to visually represent the absence of applications */}
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-200 text-gray-500 mb-6">
          <Frown className="h-10 w-10" />
        </div>

        {/* The main message */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          No Applications Found
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          It looks like you have not applied for any jobs yet.
        </p>

        {/* The call-to-action button */}
        <Link
          href="/find-jobs"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
};

export default NoApplicationsFound;
