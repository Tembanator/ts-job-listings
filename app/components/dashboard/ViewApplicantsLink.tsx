"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ViewApplicantsLink = ({ jobId }: { jobId: string }) => {
  const currentPath = usePathname();

  return (
    <Link
      href={`${currentPath}/${jobId}/applicants`}
      className="text-green-600 hover:text-green-900"
    >
      <User className="h-4 w-4" />
    </Link>
  );
};

export default ViewApplicantsLink;
