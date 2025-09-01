export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: string;
    };
  }
}

declare global {
  interface User {
    clerkUserId: string;
    email: string;
    name: string;
    isCompany: boolean;
    isAdmin: boolean;
  }
}

import { LucideIcon } from "lucide-react";
import { ObjectId } from "mongodb";
import { CreateJobFormData } from "./lib/validation";

declare global {
  interface Job {
    _id: ObjectId;
    title: string;
    company: string;
    location: string;
    category: string;
    salaryMinimum: number;
    jobType: string;
    remote: boolean;
    salaryMaximum: number;
    description: string;
    responsibilities: string[];
    qualifications: string[];
    status: string;
    postedBy: ObjectId;
    createdAt: Date;
    __v?: number;
  }
}

// Define the props for the InputWithIcon component
declare global {
  interface InputWithIconProps {
    Icon: LucideIcon;
    label: string;
    name: keyof CreateJobFormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }
}
declare global {
  interface FileObject {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }
}
declare global {
  interface Applicant {
    clerkUserId: string;
    createdAt: string;
    email: string;
    isAdmin: boolean;
    isCompany: boolean;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }
}
declare global {
  interface Application {
    _id: string;
    job: Job;
    applicationStatus: string;
    resumeUrl: string;
    applicant: Applicant;
    createdAt: string;
    __v: number;
  }
}
declare global {
  interface JobSearchQuery {
    /**
     * The requested page size. A string or number.
     * Defaults to 10 if not provided.
     */
    pageSize?: string | number;

    /**
     * The requested page number. A string or number.
     * Defaults to 1 if not provided.
     */
    pages?: string | number;

    /**
     * The job location. A string used for a regex search.
     */
    location?: string | { $regex: string; $options: string };

    /**
     * The remote status, typically "on" or "off" from a checkbox or toggle.
     */
    remote?: "on" | "off" | boolean;

    /**
     * The minimum salary, provided as a string or number.
     */
    salaryMinimum?: string | number | { $gte: number };

    /**
     * The maximum salary, provided as a string or number.
     */
    salaryMaximum?: string | number | { $lte: number };
  }
}
