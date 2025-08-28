"use client";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function MobileNav() {
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
        <Link
          href="#"
          className="text-gray-600 hover:text-indigo-600 transition-colors"
        >
          Companies
        </Link>
        {/* Placeholder for company page */}
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className="px-2 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors focus:outline-none"
        >
          Post a Job
        </Link>
        {/* Placeholder for authentication links - integrate with NextAuth */}
        <Link
          href="#"
          className="px-2 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Login
        </Link>
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
