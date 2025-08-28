"use client";
import React from "react";
import { deleteJob } from "../actions/jobActions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    // const confirmed = confirm("Are you sure you want to delete this job?");
    // if (!confirmed) return;

    const res = await deleteJob(id);

    if (res.success === true) {
      toast.success("Job deleted successfully.");
      router.refresh();
      // Optionally, you can trigger a re-fetch of the job listings or update the UI
    } else {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span
          className="text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
          //   onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            listing and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-red-600 hover:text-red-700 bg-red-200 hover:bg-red-300 cursor-pointer"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
