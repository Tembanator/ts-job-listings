// Main App Component
const App = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
          Your Next Career Starts Here
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mb-12">
          Discover thousands of job opportunities from top companies.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-4xl p-4 md:p-6 bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Job Title Input */}
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full lg:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {/* Location Input */}
          <input
            type="text"
            placeholder="Location (e.g., New York, Remote)"
            className="w-full lg:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {/* Search Button */}
          <button className="w-full lg:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
            Search Jobs
          </button>
        </div>
      </main>

      {/* Featured Job Categories Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Featured Job Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Category Card 1 */}
          <a
            href="#"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3.5M3.68 10.75l-.33-1.67a1.5 1.5 0 011.1-1.89l5.14-.93L12 2l1.41 5.26 5.14.93a1.5 1.5 0 011.1 1.89l-.33 1.67M20.94 12c-1.54 0-2.88.94-3.52 2.36-.64-1.42-1.98-2.36-3.52-2.36s-2.88.94-3.52 2.36c-.64-1.42-1.98-2.36-3.52-2.36-1.54 0-2.88.94-3.52 2.36H4v3.54a2 2 0 002 2h12a2 2 0 002-2v-3.54h-1.06z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Software Engineering
            </h3>
            <p className="text-sm text-gray-500 mt-1">120 jobs available</p>
          </a>
          {/* Category Card 2 */}
          <a
            href="#"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-orange-100 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Marketing</h3>
            <p className="text-sm text-gray-500 mt-1">75 jobs available</p>
          </a>
          {/* Category Card 3 */}
          <a
            href="#"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 text-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414a1 1 0 00-.707-.293H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7h-4v4h4z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Design</h3>
            <p className="text-sm text-gray-500 mt-1">50 jobs available</p>
          </a>
          {/* Category Card 4 */}
          <a
            href="#"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13.5m0-13.5a4.5 4.5 0 100 9m0-9a4.5 4.5 0 110 9m-6.75 3.546a11.964 11.964 0 01-2.924-4.885 1.5 1.5 0 01-.018-.152m-1.056-.475l-.261-1.396a1.5 1.5 0 011.666-1.89l3.5-.636M12 21.75c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm-3.75-2.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
            <p className="text-sm text-gray-500 mt-1">90 jobs available</p>
          </a>
        </div>
      </section>

      {/* Latest Job Listings Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Latest Job Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Job Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                C
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Senior Product Manager
                </h3>
                <p className="text-sm text-gray-600">
                  Company XYZ - San Francisco, CA
                </p>
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Full-time
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We are seeking a seasoned Product Manager to lead our new product
              initiatives. You will be responsible for the full product
              lifecycle, from ideation to launch.
            </p>
            <div className="flex justify-end mt-4">
              <a
                href="#"
                className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
          {/* Job Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                A
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  UI/UX Designer
                </h3>
                <p className="text-sm text-gray-600">Acme Inc. - Remote</p>
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Remote
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We are looking for a creative UI/UX designer to craft beautiful
              and intuitive user experiences for our next-generation software.
            </p>
            <div className="flex justify-end mt-4">
              <a
                href="#"
                className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
          {/* Job Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                G
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Data Scientist
                </h3>
                <p className="text-sm text-gray-600">
                  Global Tech - New York, NY
                </p>
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Full-time
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Join our data team to analyze large datasets and help us make
              data-driven decisions. Experience with machine learning is a plus.
            </p>
            <div className="flex justify-end mt-4">
              <a
                href="#"
                className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            View All Jobs
          </a>
        </div>
      </section>
    </>
  );
};

// Export the main App component as default
export default App;
