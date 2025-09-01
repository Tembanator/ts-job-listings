"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/app/actions/applicationActions";

const ChangeApplicationStatusButton = ({
  id,
  status,
  displayText,
}: {
  id: string;
  status: string;
  displayText: string;
}) => {
  const router = useRouter();
  const handleUpdate = async () => {
    const res = await updateApplicationStatus(id, status);

    if (res.success === true) {
      toast.success("Application status updated successfully.");
      router.refresh();
      // Optionally, you can trigger a re-fetch of the job listings or update the UI
    } else {
      toast.error("Failed to update application status.");
    }
  };

  return (
    <button
      onClick={handleUpdate}
      className={`${
        status === "Accepted"
          ? "text-green-600 hover:text-green-900"
          : "text-red-600 hover:text-red-900"
      }  focus:outline-none cursor-pointer`}
    >
      {displayText}
    </button>
  );
};

export default ChangeApplicationStatusButton;
