"use client";
import {
  Briefcase,
  Building,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavLink } from "./NavLink";
import { useUser } from "@clerk/nextjs";

export default function DashboardTabs() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  if (!user) {
    return null;
  }
  console.log("User role:", role);
  const currentPath = pathname.split("/")[3];
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6 flex flex-wrap justify-center lg:justify-start">
      <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
        <Link
          href={`/dashboard/${user.id}/overview`}
          className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-200 flex items-center space-x-2
            ${
              currentPath === "overview"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
            }
            `}
        >
          <LayoutDashboard size={16} />
          <span>Overview</span>
        </Link>
        <div className="hidden sm:block border-l border-gray-200 mx-2"></div>{" "}
        {/* Separator */}
        {/* Job Seeker specific links */}
        {role === "job-seeker" && (
          <>
            <NavLink
              href={`/dashboard/${user.id}/applied-jobs`}
              currentPath={currentPath}
              Icon={Briefcase} // Pass the Briefcase icon component
            >
              My Applications
            </NavLink>
            <NavLink
              href={`/dashboard/${user.id}/profile-settings`}
              currentPath={currentPath}
              Icon={User} // Pass the User icon component
            >
              Profile Settings
            </NavLink>
            <div className="hidden sm:block border-l border-gray-200 mx-2"></div>
          </>
        )}
        {role === "company" && (
          <>
            <NavLink
              href={`/dashboard/${user.id}/my-job-listings`}
              currentPath={currentPath}
              Icon={Building} // Pass the Building icon component
            >
              My Job Listings
            </NavLink>
            <NavLink
              href={`/dashboard/${user.id}/applicants`}
              currentPath={currentPath}
              Icon={Users} // Pass the Users icon component
            >
              Applicants
            </NavLink>
            <NavLink
              href={`/dashboard/${user.id}/post-job`}
              currentPath={currentPath}
              Icon={PlusCircle} // Pass the PlusCircle icon component
            >
              Post New Job
            </NavLink>
            <div className="hidden sm:block border-l border-gray-200 mx-2"></div>
          </>
        )}
        {role === "admin" && (
          <>
            <NavLink
              href={`/dashboard/${user.id}/admin`}
              currentPath={currentPath}
              Icon={Settings} // Pass the Settings icon component
            >
              Admin Panel
            </NavLink>
            <div className="hidden sm:block border-l border-gray-200 mx-2"></div>
          </>
        )}
      </nav>
    </div>
  );
}
