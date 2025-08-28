"use client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const ClientLink = ({ jobId }: { jobId: string }) => {
  const currentPath = usePathname();
  return (
    <Link
      href={`${currentPath}/${jobId}/edit`}
      className="text-blue-600 hover:text-blue-900 mr-3"
    >
      <Pencil className="h-4 w-4" />
    </Link>
  );
};

export default ClientLink;
