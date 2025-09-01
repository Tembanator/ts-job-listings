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
  interface JobSearchParams {
    location?: string;
    remote?: string;
    category?: string;
    salaryMinimum?: string;
    salaryMaximum?: string;
    page?: string;
    pageSize?: string;
  }
}
// declare global {
//   interface JobFilter {
//     location?: string;
//     remote?: string;
//     category?: string;
//     salaryMinimum?: string;
//     salaryMaximum?: string;
//     page?: string;
//     pageSize?: string;
//   }
// }
