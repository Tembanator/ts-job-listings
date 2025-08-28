"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ totalItems }: { totalItems: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const currentPage = searchParams.get("pages") || "1";
  const pageSize = searchParams.get("pageSize") || "5";
  const totalPages = Math.ceil(totalItems / Number(pageSize));

  const pageButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={`px-3 py-2 rounded-md cursor-pointer ${
          currentPage === (i + 1).toString()
            ? "bg-indigo-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        } focus:outline-none`}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </button>
    )).slice(
      Math.max(0, Number(currentPage) - 3),
      Math.min(Number(currentPage) + 2, totalPages)
    );
  };

  const handlePageChange = (page: number) => {
    params.set("pages", page.toString());
    replace(`${pathname}?${params.toString()}`);
    // Handle page change logic here
  };
  const handlePreviousPage = () => {
    params.set("pages", (Number(currentPage) - 1).toString());
    replace(`${pathname}?${params.toString()}`);
    // Handle page change logic here
  };
  const handleNextPage = () => {
    params.set("pages", (Number(currentPage) + 1).toString());
    replace(`${pathname}?${params.toString()}`);
    // Handle page change logic here
  };
  return (
    <div
      className={`flex justify-center mt-8 ${totalPages === 1 ? "hidden" : ""}`}
    >
      <nav className="flex items-center space-x-2">
        <button
          disabled={searchParams.get("pages") === "1"}
          onClick={handlePreviousPage}
          className={`px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none flex items-center ${
            searchParams.get("pages") === "1"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <ChevronLeftIcon size={18} className="pt-0.5" /> Previous
        </button>

        {pageButtons()}
        <button
          disabled={searchParams.get("pages") === totalPages.toString()}
          onClick={handleNextPage}
          className={`px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none flex items-center ${
            searchParams.get("pages") === totalPages.toString()
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
          
          `}
        >
          Next <ChevronRightIcon size={18} className="pt-0.5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
