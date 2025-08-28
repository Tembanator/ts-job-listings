import { getJobById } from "@/app/actions/jobActions";
import JobForm from "@/app/components/dashboard/JobForm";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function page({ params }: { params: any }) {
  const user = await currentUser();

  const { jobSlug } = await params;

  const job = await getJobById(jobSlug);

  if (!job) {
    return <div>Job not found</div>;
  }
  return <JobForm post={false} job={job} />;
}
