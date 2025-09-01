import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

export const DesktopNav = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  // if (!user) {
  //   return null;
  // }
  return (
    <div className="flex space-x-4 items-center">
      <Link
        href="/find-jobs"
        className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
      >
        Find Jobs
      </Link>
      {/* Placeholder for company page */}
      <SignedIn>
        <Link
          href={`/dashboard/${user?.id}/overview`}
          className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
        >
          Dashboard
        </Link>
        {role === "company" && (
          <Link
            href="#"
            className="px-2 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors focus:outline-none"
          >
            Post a Job
          </Link>
        )}
      </SignedIn>
      {/* Placeholder for authentication links - integrate with NextAuth */}
      <SignedOut>
        <SignInButton>
          <button className="flex items-center justify-center cursor-pointer space-x-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            <LogIn size={20} />
            <span>Sign In</span>
          </button>
        </SignInButton>
        {/* <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton> */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* <Link
        href="#"
        className="px-2 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
      >
        Login
      </Link> */}
      {/* <Link
          href="#"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
          Sign Up
          </Link> */}
    </div>
  );
};
