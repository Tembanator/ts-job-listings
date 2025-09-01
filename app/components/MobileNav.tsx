"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { LogIn, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function MobileNav() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="absolute top-0 right-0 m-4 bg-white z-50">
      {!showMenu && (
        <MenuIcon
          onClick={toggleMenu}
          className="h-6 w-6 text-indigo-600 cursor-pointer ml-auto"
        />
      )}
      {showMenu && (
        <X
          onClick={toggleMenu}
          className="h-6 w-6 text-indigo-600 cursor-pointer ml-auto"
        />
      )}
      <div
        className={`flex flex-col space-y-4 items-center white shadow-lg rounded-lg p-4 sm:hidden ${
          showMenu ? "block" : "hidden"
        }`}
      >
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
              href={`/dashboard/${user?.id}/post-job`}
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
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <Link
          href="#"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
          Sign Up
          </Link> */}
      </div>
    </div>
  );
}

export default MobileNav;
