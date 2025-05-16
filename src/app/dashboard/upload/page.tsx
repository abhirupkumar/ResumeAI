"use client";

import { useState } from "react";
import { FileUploader } from "@/components/upload/file-uploader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
    const [urlInput, setUrlInput] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!urlInput.trim()) {
            toast({
                title: "Error",
                description: "Please enter a valid URL",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Processing URL",
            description: "Fetching resume from the provided URL...",
        });

        // Simulate processing delay
        setTimeout(() => {
            router.push("/dashboard/analysis/7918f570-d079-4cba-b55a-3ea7400a352c");
        }, 2000);
    };

    return (
        <div className="mt-12 mx-auto sm:p-8 p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Resume</h1>
                <p className="text-muted-foreground">
                    Upload your resume to analyze its ATS compatibility and get personalized recommendations
                </p>
            </div>

            <Card className="p-6">
                <Tabs defaultValue="upload" className="space-y-6">
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="upload" className="flex items-center justify-center">
                            <Upload className="h-4 w-4 mr-2" />
                            File Upload
                        </TabsTrigger>
                        <TabsTrigger value="url" className="flex items-center justify-center">
                            <Link className="h-4 w-4 mr-2" />
                            URL
                        </TabsTrigger>
                        <TabsTrigger value="paste" className="flex items-center justify-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Paste Text
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload">
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center p-4">
                                <h2 className="text-xl font-semibold mb-6">Upload Your Resume</h2>
                                <FileUploader />
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                <p>Accepted file formats: PDF, DOCX</p>
                                <p>Maximum file size: 5MB</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="url">
                        <div className="space-y-6">
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-semibold mb-2">Enter Resume URL</h2>
                                <p className="text-muted-foreground">
                                    Provide a direct link to your resume file (PDF or DOCX)
                                </p>
                            </div>

                            <form onSubmit={handleUrlSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resume-url">Resume URL</Label>
                                    <Input
                                        id="resume-url"
                                        placeholder="https://example.com/my-resume.pdf"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Analyze from URL
                                </Button>
                            </form>
                        </div>
                    </TabsContent>

                    <TabsContent value="paste">
                        <div className="space-y-6">
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-semibold mb-2">Paste Resume Text</h2>
                                <p className="text-muted-foreground">
                                    Copy and paste the content of your resume
                                </p>
                            </div>

                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resume-text">Resume Content</Label>
                                    <textarea
                                        id="resume-text"
                                        className="w-full h-64 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background"
                                        placeholder="Paste your resume content here..."
                                    />
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        toast({
                                            title: "Processing text",
                                            description: "Analyzing your resume content...",
                                        });

                                        setTimeout(() => {
                                            router.push("/dashboard/analysis/7918f570-d079-4cba-b55a-3ea7400a352c");
                                        }, 2000);
                                    }}
                                >
                                    Analyze Text
                                </Button>
                            </form>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>

            <div className="mt-8 bg-muted/50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Tips for ATS-Friendly Resumes</h2>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Use standard section headings (Experience, Education, Skills)</li>
                    <li>Include keywords from the job description</li>
                    <li>Use a simple, clean format with standard fonts</li>
                    <li>Avoid tables, images, or complex formatting</li>
                    <li>Save your file as a PDF or DOCX for best compatibility</li>
                    <li>Include your contact information at the top</li>
                </ul>
            </div>
        </div>
    );
}