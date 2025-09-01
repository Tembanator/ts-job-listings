// JobListing.js
// This component displays a hardcoded job listing for a Senior Product Designer,
// replicating the design from the provided image using Tailwind CSS.
// All content is static and does not use any props.

import React from "react";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import { getJobById } from "@/app/actions/jobActions";
import BackButton from "@/app/components/BackButton";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

// The main component that renders the job listing page.
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const { slug } = await params;
  const job = await getJobById(slug);
  return (
    <div className="min-h-screen font-sans flex flex-col items-center md:p-8">
      {/* Main content card */}
      <div className="bg-gray-100 rounded-3xl shadow-xl p-8 max-w-3xl w-full">
        {/* Back to Listings link */}
        <BackButton />

        {/* Job Title and Company section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-600 mb-1">
            {job?.title}
          </h2>
          <p className="text-indigo-600 font-semibold text-xl">
            {job?.company}
          </p>
        </div>

        {/* Job Metadata: Location, Job Type, Salary */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-lg mb-8">
          <div className="flex items-center">
            <MapPin
              size={20}
              className="mr-2 text-gray-100 p-1 bg-gray-400 rounded-full"
            />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center text-green-600">
            <Briefcase
              size={20}
              className="mr-2 text-gray-100 p-1 bg-gray-400 rounded-full"
            />
            <span>{job?.jobType}</span>
          </div>
          <div className="flex items-center">
            <DollarSign
              size={20}
              className="mr-2 text-gray-100 p-1 bg-gray-400 rounded-full"
            />
            <span>
              {job?.salaryMinimum} - {job?.salaryMaximum}
            </span>
          </div>
        </div>

        {/* Job Description section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            Job Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{job?.description}</p>
        </div>

        {/* Key Responsibilities section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            Key Responsibilities
          </h3>
          <ul className="list-none space-y-2 text-gray-700">
            {job?.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        {/* Qualifications section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            Qualifications
          </h3>
          <ul className="list-none space-y-2 text-gray-700">
            {job?.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>

        {/* Apply Now button */}
        {role === "job-seeker" && (
          <div className="text-center">
            <Link
              href={`/job-details/${slug}/apply`}
              className="inline-flex items-center px-8 py-4 font-semibold text-white cursor-pointer rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
            bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              Apply Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
