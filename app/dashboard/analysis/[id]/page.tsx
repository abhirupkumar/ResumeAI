"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, Edit, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { sampleResumeData, sampleATSAnalysis } from "@/lib/resume-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AnalysisPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("summary");
    const { overallScore } = sampleATSAnalysis;
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Resume Downloaded",
            description: "Your optimized resume has been downloaded successfully.",
        });
    };

    const handleShare = () => {
        toast({
            title: "Share Link Generated",
            description: "A shareable link to your resume has been copied to clipboard.",
        });
    };

    return (
        <div className="space-y-6 sm:p-8 p-4 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Analysis</h1>
                    <p className="text-muted-foreground">
                        ATS compatibility analysis for {sampleResumeData.basics.name}'s resume
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>

                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>

                    <Link href="/dashboard/templates">
                        <Button variant="secondary">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Template
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {/* Main content - 2 columns on large screens */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>ATS Compatibility Score</CardTitle>
                            <CardDescription>
                                How well your resume performs with Applicant Tracking Systems
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center p-4">
                                <div className="relative w-48 h-48 mb-6">
                                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                                        <div className="text-5xl font-bold">
                                            {overallScore}
                                            <span className="text-2xl font-normal text-muted-foreground">/100</span>
                                        </div>
                                    </div>
                                    <svg
                                        className="absolute top-0 left-0 w-full h-full"
                                        viewBox="0 0 100 100"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${overallScore * 2.83}, 283`}
                                            className={`transform -rotate-90 origin-center transition-all duration-1000 ${overallScore >= 80
                                                ? "text-green-500"
                                                : overallScore >= 60
                                                    ? "text-amber-500"
                                                    : "text-red-500"
                                                }`}
                                        />
                                    </svg>
                                </div>

                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {overallScore >= 80
                                            ? "Excellent ATS Compatibility"
                                            : overallScore >= 60
                                                ? "Good ATS Compatibility"
                                                : "Needs Improvement"}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {overallScore >= 80
                                            ? "Your resume is well-optimized for ATS systems."
                                            : overallScore >= 60
                                                ? "Your resume performs well but has room for improvement."
                                                : "Your resume needs significant optimization for ATS systems."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                    {sampleATSAnalysis.sectionScores.slice(0, 6).map((section, index) => (
                                        <div key={index} className="text-center">
                                            <h4 className="text-sm font-medium mb-1">{section.name}</h4>
                                            <div className="flex items-center justify-center mb-1">
                                                <span className="text-xl font-semibold">
                                                    {Math.round((section.score / section.max) * 100)}%
                                                </span>
                                            </div>
                                            <Progress
                                                value={(section.score / section.max) * 100}
                                                className="h-1.5 w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList className="grid grid-cols-4 w-full">
                            <TabsTrigger value="summary">Summary</TabsTrigger>
                            <TabsTrigger value="keywords">Keywords</TabsTrigger>
                            <TabsTrigger value="sections">Sections</TabsTrigger>
                            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="summary" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analysis Summary</CardTitle>
                                    <CardDescription>
                                        Key insights from your resume analysis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Key Strengths</h3>
                                        <div className="space-y-2">
                                            {sampleATSAnalysis.strengths.map((strength, index) => (
                                                <div key={index} className="flex items-start">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{strength}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Areas for Improvement</h3>
                                        <div className="space-y-2">
                                            {sampleATSAnalysis.improvementAreas.map((area, index) => (
                                                <div key={index} className="flex items-start">
                                                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{area}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            onClick={() => setActiveTab("suggestions")}
                                            className="w-full"
                                        >
                                            View Detailed Suggestions
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="keywords" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Keyword Analysis</CardTitle>
                                    <CardDescription>
                                        Evaluation of important keywords in your resume
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold">Keyword Match Rate</h3>
                                                <span className="text-sm font-medium">
                                                    {Math.round((sampleATSAnalysis.keywordMatches.filter(k => k.present).length / sampleATSAnalysis.keywordMatches.length) * 100)}%
                                                </span>
                                            </div>
                                            <Progress
                                                value={(sampleATSAnalysis.keywordMatches.filter(k => k.present).length / sampleATSAnalysis.keywordMatches.length) * 100}
                                                className="h-2"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-semibold">Present Keywords</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {sampleATSAnalysis.keywordMatches
                                                    .filter(k => k.present)
                                                    .map((keyword, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {keyword.keyword}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-semibold">Missing Keywords</h3>
                                            <div className="space-y-2">
                                                {sampleATSAnalysis.keywordMatches
                                                    .filter(k => !k.present)
                                                    .map((keyword, index) => (
                                                        <div key={index} className="flex items-start">
                                                            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-medium">{keyword.keyword}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {keyword.suggestions ? keyword.suggestions[0] :
                                                                        "Consider adding this keyword to improve your match rate."}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sections" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Section Analysis</CardTitle>
                                    <CardDescription>
                                        Detailed breakdown of each resume section
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {sampleATSAnalysis.sectionScores.map((section, index) => (
                                            <div key={index} className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-semibold">{section.name}</h3>
                                                    <span className="text-sm font-medium">
                                                        {section.score}/{section.max} points
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={(section.score / section.max) * 100}
                                                    className="h-2"
                                                />

                                                {section.feedback && section.feedback.length > 0 && (
                                                    <div className="space-y-1 pt-1">
                                                        {section.feedback.map((feedback, idx) => (
                                                            <div key={idx} className="flex items-start">
                                                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">{feedback}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="suggestions" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Improvement Suggestions</CardTitle>
                                    <CardDescription>
                                        Actionable recommendations to enhance your resume
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            {sampleATSAnalysis.suggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 bg-muted rounded-lg flex items-start"
                                                >
                                                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <p>{suggestion}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2 text-center">
                                            <p className="text-muted-foreground mb-4">
                                                Want to implement these suggestions automatically?
                                            </p>
                                            <Link href="/dashboard/templates">
                                                <Button>
                                                    Choose an ATS-Optimized Template
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Preview sidebar - 1 column on large screens */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resume Preview</CardTitle>
                            <CardDescription>
                                Current version of your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 rounded-lg overflow-hidden border">
                                <div className="bg-muted p-6 flex flex-col items-center text-center border-b">
                                    <h3 className="text-xl font-bold mb-1">{sampleResumeData.basics.name}</h3>
                                    <p className="text-muted-foreground">{sampleResumeData.basics.label}</p>
                                    <div className="text-sm mt-2 space-y-1">
                                        <p>{sampleResumeData.basics.email}</p>
                                        <p>{sampleResumeData.basics.phone}</p>
                                        <p>
                                            {sampleResumeData.basics.location?.city}, {sampleResumeData.basics.location?.state}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 text-sm">
                                    <div className="mb-4">
                                        <h4 className="font-semibold border-b pb-1 mb-2">Summary</h4>
                                        <p className="text-xs">{sampleResumeData.basics.summary}</p>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold border-b pb-1 mb-2">Experience</h4>
                                        {sampleResumeData.work.slice(0, 1).map((job, index) => (
                                            <div key={index} className="mb-2">
                                                <div className="flex justify-between">
                                                    <p className="font-medium">{job.position}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {job.startDate} - {job.endDate}
                                                    </p>
                                                </div>
                                                <p className="text-xs">{job.company}, {job.location}</p>
                                                <p className="text-xs mt-1 line-clamp-2">{job.description}</p>
                                            </div>
                                        ))}
                                        <p className="text-xs text-muted-foreground text-center italic mt-2">
                                            [Content truncated for preview]
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold border-b pb-1 mb-2">Education</h4>
                                        {sampleResumeData.education.slice(0, 1).map((edu, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between">
                                                    <p className="font-medium">{edu.degree}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {edu.startDate} - {edu.endDate}
                                                    </p>
                                                </div>
                                                <p className="text-xs">{edu.institution}, {edu.location}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold border-b pb-1 mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {sampleResumeData.skills.slice(0, 8).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-muted-foreground/10 px-2 py-0.5 rounded text-xs"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                            {sampleResumeData.skills.length > 8 && (
                                                <span className="text-xs text-muted-foreground">
                                                    +{sampleResumeData.skills.length - 8} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                </Button>

                                <Link href="/dashboard/templates">
                                    <Button size="sm">
                                        <FileText className="h-4 w-4 mr-1" />
                                        Change Template
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Next Steps</CardTitle>
                            <CardDescription>
                                Recommended actions to improve your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-muted rounded-lg p-4 flex items-start">
                                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium">Apply our suggested changes</p>
                                        <p className="text-sm text-muted-foreground">
                                            Implement the recommended improvements to boost your ATS score
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted rounded-lg p-4 flex items-start">
                                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium">Choose an optimized template</p>
                                        <p className="text-sm text-muted-foreground">
                                            Select from our ATS-friendly templates to format your resume
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted rounded-lg p-4 flex items-start">
                                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium">Download and apply</p>
                                        <p className="text-sm text-muted-foreground">
                                            Get your optimized resume and start applying with confidence
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={() => router.push("/dashboard/templates")}
                                >
                                    Choose a Template
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}