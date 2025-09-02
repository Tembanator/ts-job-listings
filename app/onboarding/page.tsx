"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Loader2 } from "lucide-react";

// SVG icons for visual flair
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  // State to track the user's selected role
  const [selectedRole, setSelectedRole] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      setIsLoading(false);

      router.refresh();
    }
    if (res?.error) {
      setError(res?.error);
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      {/* Main content container with a soft shadow and rounded corners */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          How do you plan to use our platform?
        </h1>
        <p className="text-gray-500 mb-10 text-lg">
          Please select the option that best describes you.
        </p>

        {/* The form element */}
        <form action={handleSubmit} className="flex flex-col items-center">
          {/* Flex container for the role selection cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
            {/* Job Seeker Card (now a label for the radio button) */}
            <label
              htmlFor="job-seeker"
              className={`
                flex-1 p-6 md:p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${
                  selectedRole === "job-seeker"
                    ? "bg-violet-50 border-violet-500 shadow-lg scale-105"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
              `}
            >
              {/* Hidden radio input */}
              <input
                type="radio"
                id="job-seeker"
                name="role"
                value="job-seeker"
                checked={selectedRole === "job-seeker"}
                onChange={() => setSelectedRole("job-seeker")}
                className="sr-only" // sr-only class hides the input visually but keeps it accessible
              />
              <div className="flex flex-col items-center pointer-events-none">
                <div
                  className={`p-4 rounded-full ${
                    selectedRole === "job-seeker"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <UserIcon />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mt-4 text-gray-800">
                  Job Seeker
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-2">
                  I am looking for a new job.
                </p>
              </div>
            </label>

            {/* Company Card (now a label for the radio button) */}
            <label
              htmlFor="company"
              className={`
                flex-1 p-6 md:p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${
                  selectedRole === "company"
                    ? "bg-violet-50 border-violet-500 shadow-lg scale-105"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
              `}
            >
              {/* Hidden radio input */}
              <input
                type="radio"
                id="company"
                name="role"
                value="company"
                checked={selectedRole === "company"}
                onChange={() => setSelectedRole("company")}
                className="sr-only"
              />
              <div className="flex flex-col items-center pointer-events-none">
                <div
                  className={`p-4 rounded-full ${
                    selectedRole === "company"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <BriefcaseIcon />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mt-4 text-gray-800">
                  Company
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-2">
                  I want to post a job and hire talent.
                </p>
              </div>
            </label>
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {/* Call to action button, disabled until a choice is made */}
          <button
            type="submit"
            disabled={!selectedRole || isLoading}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer
              ${
                selectedRole
                  ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin" /> Loading...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
