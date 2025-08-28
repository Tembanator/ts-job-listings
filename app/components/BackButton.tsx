"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6 cursor-pointer"
    >
      <ChevronLeft size={16} className="mr-2" />
      <span className="font-semibold text-lg">Back</span>
    </button>
  );
}
