// components/FilterForm.js

import {
  MapPinIcon,
  FolderIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"; // Assumes you have @heroicons/react installed
import { searchJobs } from "../actions/jobActions";
import SearchButton from "./SearchButton";

// You can install heroicons with: npm install @heroicons/react

const FilterForm = ({
  uniqueCategories,
  params,
}: {
  uniqueCategories: string[];
  params: JobSearchParams;
}) => {
  console.log(params);
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>
      <form action={searchJobs}>
        {/* Location & Remote Toggle */}
        <div className="space-y-6">
          <div className="relative">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-1"
            >
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={params?.location || ""}
                placeholder="e.g., Remote, London"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              id="remote"
              name="remote"
              defaultChecked={params.remote === "on"}
              className="h-5 w-5 rounded-md text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="remote" className="font-medium">
              Include Remote Jobs
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="mt-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-1"
          >
            Category
          </label>
          <div className="relative">
            <FolderIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              id="category"
              name="category"
              defaultValue={params.category || ""}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Salary Range */}
        <div className="mt-6">
          <label
            htmlFor="min-salary"
            className="block text-gray-700 font-medium mb-1"
          >
            Salary Range
          </label>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                id="salaryMinimum"
                name="salaryMinimum"
                defaultValue={params?.salaryMinimum || ""}
                placeholder="Min"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="relative w-1/2">
              <input
                type="number"
                id="salaryMaximum"
                name="salaryMaximum"
                defaultValue={params?.salaryMaximum || ""}
                placeholder="Max"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <SearchButton />
      </form>
    </div>
  );
};

export default FilterForm;
