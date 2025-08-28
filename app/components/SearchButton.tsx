"use client";
import { useFormStatus } from "react-dom";
import { Search, Loader2 } from "lucide-react";

/**
 * A dynamic button that gives real-time feedback when a form is submitting.
 */
export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full px-6 py-3 my-6
        text-white font-bold tracking-wide uppercase
        rounded-md shadow-lg transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
        flex items-center justify-center cursor-pointer
        ${
          pending
            ? "bg-gray-500 cursor-not-allowed transform scale-95"
            : "bg-gradient-to-r from-blue-600 to-indigo-700"
        }
      `}
    >
      {pending ? (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Searching...
        </span>
      ) : (
        <span className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Search
        </span>
      )}
    </button>
  );
}
