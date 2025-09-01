import { getJobById } from "@/app/actions/jobActions";
import JobForm from "@/app/components/dashboard/JobForm";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ jobSlug: string }>;
}) {
  const { jobSlug } = await params;

  const job = await getJobById(jobSlug);

  if (!job) {
    return <div>Job not found</div>;
  }
  return <JobForm post={false} job={job} />;
}
