// components/JobForm.js
"use client";
import { toast } from "sonner";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  List,
  Plus,
  Minus,
  Lightbulb,
} from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createJobFormSchema,
  CreateJobFormData,
  defaultValues,
} from "@/lib/validation";
import { createJob, updateJob } from "@/app/actions/jobActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const JobForm = ({ post, job }: { post: boolean; job?: Job }) => {
  const router = useRouter();
  let newDefaultValues = defaultValues;
  if (job) {
    newDefaultValues = {
      title: job?.title,
      company: job?.company,
      category: job?.category,
      location: job?.location || "",
      jobType: job?.jobType,
      salaryMinimum: job?.salaryMinimum.toString(),
      salaryMaximum: job?.salaryMaximum.toString(),
      description: job?.description,
      responsibilities: job?.responsibilities,
      qualifications: job?.qualifications,
      remote: job?.remote,
    };
  }
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: newDefaultValues,
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    // @ts-expect-error never type
    name: "responsibilities",
  });
  // First dynamic field array for "qualifications"
  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    // @ts-expect-error never type
    name: "qualifications",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateJobFormData> = async (
    data: CreateJobFormData
  ) => {
    (async () => {
      setIsLoading(true);
      const response = !job
        ? await createJob(data)
        : // @ts-expect-error never type
          await updateJob(job?._id.toString(), data);
      setIsLoading(false);
      if (response.success) {
        toast.success("Job Post has been created.");
        if (!job) reset();
        router.refresh();
      } else {
        toast.error("Failed to create Job Post.");
      }
    })();
    // Here you can handle the form submission, e.g., send data to an API
  };

  const InputWithIcon: React.FC<InputWithIconProps> = ({
    Icon,
    label,
    name,
    type = "text",
    placeholder,
  }) => (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="flex flex-col">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="block w-full border shadow-sm border-gray-300 rounded-md pl-10 pr-2 py-2 text-sm"
          />
        </div>
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
        )}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-gray-600">
        {post ? "Post a New Job" : "Edit Job Posting"}
      </h2>
      <p className="text-center text-gray-500">
        {post
          ? "Fill out the form below to post a new job."
          : "Update the job details below."}
      </p>

      {/* Basic Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputWithIcon
          Icon={Briefcase}
          label="Job Title"
          name="title"
          placeholder="e.g. Senior Product Designer"
        />
        <InputWithIcon
          Icon={Building}
          label="Company"
          name="company"
          placeholder="e.g. Acme Inc."
        />

        {/* Remote and Location fields */}
        <InputWithIcon
          Icon={MapPin}
          label="Location"
          name="location"
          placeholder="e.g. San Francisco, CA"
        />
        <InputWithIcon
          Icon={Briefcase}
          label="Job Type"
          name="jobType"
          placeholder="e.g. Full-time"
        />
        {/* Salary Range */}
        <InputWithIcon
          Icon={DollarSign}
          label="Minimum Salary"
          name="salaryMinimum"
          type="number"
          placeholder="Minimum Salary ($)"
        />
        <InputWithIcon
          Icon={DollarSign}
          label="Maximum Salary"
          name="salaryMaximum"
          type="number"
          placeholder="Maximum Salary ($)"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithIcon
          Icon={MapPin}
          label="Category"
          name="category"
          placeholder="e.g. San Francisco, CA"
        />
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label
              htmlFor="remote"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Remote
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                {...register("remote")}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
        >
          <FileText size={18} /> Job Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          placeholder="Provide a detailed description of the role..."
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Dynamic fields for Responsibilities */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <List size={18} /> Key Responsibilities
        </label>
        <div className="space-y-2">
          {responsibilityFields.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Lightbulb size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                {...register(`responsibilities.${index}`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                placeholder="e.g. Develop and maintain web applications"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeResponsibility(index)}
                  className="p-1 rounded-full text-red-500 cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
              )}
              {errors.responsibilities?.[index] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.responsibilities?.[index]?.message}
                </p>
              )}
            </div>
          ))}
          {errors.responsibilities && (
            <p className="mt-1 text-sm text-red-600">
              {errors.responsibilities.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => appendResponsibility("")}
            className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700 transition-colors text-sm font-medium mt-2"
          >
            <Plus size={16} className="mr-1 cursor-pointer" /> Add
            responsibility
          </button>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <List size={18} /> Key Qualifications
        </label>
        <div className="space-y-2">
          {qualificationFields.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Lightbulb size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                {...register(`qualifications.${index}`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                placeholder="e.g. Develop and maintain web applications"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="p-1 rounded-full cursor-pointer text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
              )}
              {errors.qualifications?.[index] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.qualifications?.[index]?.message}
                </p>
              )}
            </div>
          ))}
          {errors.qualifications && (
            <p className="mt-1 text-sm text-red-600">
              {errors.qualifications.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => appendQualification("")}
            className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700 transition-colors text-sm font-medium mt-2"
          >
            <Plus size={16} className="mr-1" /> Add qualification
          </button>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 cursor-pointer text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        <Briefcase size={20} />{" "}
        {isLoading
          ? post
            ? "Posting..."
            : "Updating Job Posting"
          : post
          ? "Post Job"
          : "Update Job"}
      </button>
    </form>
  );
};

export default JobForm;
