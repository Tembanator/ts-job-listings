import React from "react";

function SearchJobsForm() {
  return (
    <form className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-3xl mx-auto px-4">
      <input
        type="text"
        placeholder="Job title, keywords, or company"
        className="flex-grow w-full md:w-auto p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
      />
      <input
        type="text"
        placeholder="Location (e.g., New York, Remote)"
        className="flex-grow w-full md:w-auto p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
      />
      <button
        type="button"
        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors cursor-pointer"
      >
        Search Jobs
      </button>
    </form>
  );
}

export default SearchJobsForm;
