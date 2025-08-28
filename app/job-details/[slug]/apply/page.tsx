"use client"; // This directive is necessary to make this a client component in Next.js

import React, { useState } from "react";
import { Upload, CheckCircle, Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createApplication } from "@/app/actions/applicationActions";
import { useParams } from "next/navigation";

// The main component for uploading a CV.
// It features a drag-and-drop area and a file input button.
const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const params = useParams();
  const { slug } = params;

  // Handle file selection from the input.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle file drop onto the drag area.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Prevent default behavior for drag events and provide visual feedback.
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleApplication = async (signedUrl: string, slug: string) => {
    if (!signedUrl) {
      toast.error("No file uploaded");
      return;
    }
    const response = await createApplication(signedUrl, slug.toString());
    if (response.success) {
      toast.success("Application submitted successfully");
    } else {
      toast.error("Error submitting application");
    }
  };

  const uploadFile = async () => {
    try {
      if (!file) {
        toast.error("No file selected");
        return;
      }
      if (typeof slug !== "string") {
        toast.error("Invalid application URL");
        return;
      }
      console.log(file);
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      if (uploadRequest.status === 200) {
        setUrl(signedUrl);
        setUploading(false);
        // console.log(url);
        await handleApplication(signedUrl, slug);
        toast.success("File uploaded successfully");
      } else {
        toast.error("Trouble uploading file");
      }
    } catch (e) {
      console.log(e);
      setUploading(false);
      toast.error("Trouble uploading file");
    }
  };
  return (
    <div className="min-h-screen font-sans antialiased flex items-center justify-center sm:p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Upload Your CV
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please upload your resume or CV in PDF format.
        </p>

        {/* Drag and Drop Area */}
        <div
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-colors
            ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 bg-gray-50"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <span>{file.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500">Drag and drop your file here, or</p>
              <label
                htmlFor="file-upload"
                className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Browse Files
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}

        <button
          disabled={uploading}
          onClick={uploadFile}
          className={`px-6 py-3 text-base mt-3 flex justify-center font-semibold w-full cursor-pointer text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="animate-spin mr-2" />
              Uploading CV
            </span>
          ) : (
            "Submit CV"
          )}
        </button>

        <div className="mt-6 flex justify-end"></div>
      </div>
    </div>
  );
};

export default App;
