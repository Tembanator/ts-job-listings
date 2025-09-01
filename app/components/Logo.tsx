import React from "react";
import { Briefcase, Check } from "lucide-react";

const JobBoardLogo = () => {
  return (
    <div className="flex items-center bg-white transition-transform duration-300">
      <div className="relative w-8 h-8 md:w-10 md:h-10 mr-1">
        {/* Lucide Briefcase Icon */}
        <Briefcase
          className="w-full h-full text-indigo-600 drop-shadow-md"
          strokeWidth={1.5}
        />
        {/* Lucide Check Icon */}
        <Check
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 text-emerald-500"
          strokeWidth={2}
        />
      </div>
      <div className="flex-shrink-0">
        <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-gray-700">
          Job<span className="text-indigo-600">Board</span>
        </h1>
      </div>
    </div>
  );
};

export default JobBoardLogo;
