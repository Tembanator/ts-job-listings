import { z } from "zod";

export const createJobFormSchema = z
  .object({
    // The job title must be a non-empty string.
    title: z.string().min(1, { message: "Job title is required." }),
    // The job category must be a non-empty string.
    category: z.string().min(1, { message: "Job category is required." }),

    // The company name must be a non-empty string.
    company: z.string().min(1, { message: "Company name is required." }),

    // The location must be a non-empty string.
    location: z.string().min(1, { message: "Location is required." }),

    // The job type must be a non-empty string.
    jobType: z.string().min(1, { message: "Job type is required." }),

    // Salary minimum and maximum are numbers. We use z.coerce.number()
    // to automatically convert the input string from the form into a number.
    salaryMinimum: z
      .string()
      .min(1, { message: "Minimum salary must be a positive number." })
      .refine((val) => !isNaN(Number(val)), {
        message: "Minimum salary must be a number.",
      }),
    salaryMaximum: z
      .string()
      .min(1, { message: "Maximum salary must be a positive number." })
      .refine((val) => !isNaN(Number(val)), {
        message: "Maximum salary must be a number.",
      }),

    // A detailed description is required and must be a non-empty string.
    description: z.string().min(1, { message: "Job description is required." }),

    // Responsibilities must be an array of strings.
    // We refine this further to ensure each string in the array is not empty
    // and that the array itself contains at least one item.
    responsibilities: z
      .array(z.string().min(1, "Responsibility is required"))
      .min(1, { message: "At least one responsibility is required." }),

    // Qualifications must be an array of non-empty strings, with at least one item.
    qualifications: z
      .array(z.string().min(1, "Qualification is required"))
      .min(1, { message: "At least one qualification is required." }),

    // The remote field is a boolean, representing a true/false checkbox value.
    remote: z.boolean().optional(),
  })
  .refine((data) => Number(data.salaryMaximum) >= Number(data.salaryMinimum), {
    message:
      "Maximum salary must be greater than or equal to the minimum salary.",
    path: ["salaryMaximum"], // This tells Zod which field to attach the error to
  });

export type CreateJobFormData = z.infer<typeof createJobFormSchema>;

export const defaultValues: CreateJobFormData = {
  title: "",
  company: "",
  category: "",
  location: "",
  jobType: "",
  salaryMinimum: "0",
  salaryMaximum: "0",
  description: "",
  responsibilities: [],
  qualifications: [],
  remote: false,
};
