"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FileText, Upload, X, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);

    if (acceptedFiles.length === 0) {
      return;
    }

    const selectedFile = acceptedFiles[0];
    const fileType = selectedFile.type;

    // Check file type
    if (
      fileType !== "application/pdf" &&
      fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Please upload a PDF or DOCX file");
      return;
    }

    // Check file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    // Simulate processing delay
    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setProgress(0);
      setFile(null);

      toast({
        title: "Resume uploaded successfully",
        description: "Redirecting to analysis page...",
      });

      // Redirect to the analysis page
      router.push("/dashboard/analysis/7918f570-d079-4cba-b55a-3ea7400a352c");
    }, 3000);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors text-center cursor-pointer",
            isDragActive && !isDragReject
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/50",
            isDragReject && "border-destructive bg-destructive/5"
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: isDragActive ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Upload
                className={cn(
                  "h-12 w-12 mb-2",
                  isDragActive && !isDragReject ? "text-primary" : "text-muted-foreground"
                )}
              />
            </motion.div>

            {isDragActive ? (
              <p className="text-primary font-medium">Drop your resume here</p>
            ) : (
              <>
                <p className="font-medium">Drag & drop your resume here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse (PDF or DOCX)
                </p>
              </>
            )}

            {isDragReject && (
              <p className="text-destructive font-medium mt-2">
                File type not supported
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded mr-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)}MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFile(null)}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {uploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-center mt-4">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span className="text-sm">Processing your resume</span>
              </div>
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full">
              Analyze Resume
            </Button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-3">
        By uploading, you agree to our{" "}
        <a href="#" className="underline hover:text-primary">
          Terms of Service
        </a>
      </p>
    </div>
  );
}