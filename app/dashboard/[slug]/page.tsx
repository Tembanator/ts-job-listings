import React from "react";

export default function page() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Profile Settings
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-2xl">
        <form>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              defaultValue="John Doe"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue="john.doe@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue="New York, NY"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="resume"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Resume (Upload new)
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              Current:{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                john_doe_resume.pdf
              </a>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
