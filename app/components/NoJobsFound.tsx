const NoJobsFound = ({
  mainMessage,
  subMessage,
}: {
  mainMessage: string;
  subMessage: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200 text-center mx-auto max-w-md my-16">
      {/* Icon: A simple magnifying glass with a line through it, indicating nothing was found. */}
      <div className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="10" y1="14" x2="12" y2="10" />
        </svg>
      </div>

      {/* Main heading */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {mainMessage}
      </h2>

      {/* Sub-heading with helpful information */}
      <p className="mt-2 text-gray-500">{subMessage}</p>
    </div>
  );
};

export default NoJobsFound;
