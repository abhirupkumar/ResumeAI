"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resumeTemplates } from "@/lib/resume-data";
import { sampleResumeData } from "@/lib/resume-data";
import { TemplateType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ProfessionalTemplate } from "@/components/templates/professional-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ExecutiveTemplate } from "@/components/templates/executive-template";
import { Download, ChevronLeft, Share2, FileText } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [format, setFormat] = useState<"letter" | "a4">("letter");
    const { toast } = useToast();

    // Handle invalid template ID
    const templateId = params.id as TemplateType;

    if (!Object.values(TemplateType).includes(templateId)) {
        router.push("/templates");
        return null;
    }

    const template = resumeTemplates.find(t => t.id === templateId);

    if (!template) {
        router.push("/templates");
        return null;
    }

    const handleDownload = () => {
        toast({
            title: "Resume Downloaded",
            description: `Your resume has been downloaded in ${format.toUpperCase()} format.`,
        });
    };

    const handleShare = () => {
        toast({
            title: "Share Link Generated",
            description: "A shareable link to your resume has been copied to clipboard.",
        });
    };

    const renderTemplate = () => {
        switch (templateId) {
            case TemplateType.Professional:
                return <ProfessionalTemplate data={sampleResumeData} />;
            case TemplateType.Modern:
                return <ModernTemplate data={sampleResumeData} />;
            case TemplateType.Creative:
                return <CreativeTemplate data={sampleResumeData} />;
            case TemplateType.Minimal:
                return <MinimalTemplate data={sampleResumeData} />;
            case TemplateType.Executive:
                return <ExecutiveTemplate data={sampleResumeData} />;
            default:
                return <ProfessionalTemplate data={sampleResumeData} />;
        }
    };

    return (
        <div className="space-y-6 sm:p-8 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{template.name} Template</h1>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>

                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 space-y-4">
                    <Card className="p-4">
                        <h2 className="font-semibold mb-3">Download Options</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Paper Size</h3>
                                <div className="flex gap-2">
                                    <Button
                                        variant={format === "letter" ? "default" : "outline"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setFormat("letter")}
                                    >
                                        Letter
                                    </Button>
                                    <Button
                                        variant={format === "a4" ? "default" : "outline"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setFormat("a4")}
                                    >
                                        A4
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">File Format</h3>
                                <Tabs defaultValue="pdf" className="w-full">
                                    <TabsList className="grid grid-cols-2 w-full">
                                        <TabsTrigger value="pdf">PDF</TabsTrigger>
                                        <TabsTrigger value="docx">DOCX</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <Button className="w-full" onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h2 className="font-semibold mb-3">Template Details</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-sm text-muted-foreground">ATS Score</h3>
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded text-xs font-medium">
                                        {template.atsScore}/100
                                    </div>
                                    <span className="text-sm">
                                        {template.atsScore >= 90 ? "Excellent" :
                                            template.atsScore >= 80 ? "Very Good" : "Good"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm text-muted-foreground">Best For</h3>
                                <p className="text-sm">
                                    {template.id === TemplateType.Professional ? "Traditional industries" :
                                        template.id === TemplateType.Modern ? "Tech and modern roles" :
                                            template.id === TemplateType.Creative ? "Design and creative fields" :
                                                template.id === TemplateType.Minimal ? "Technical and focused roles" :
                                                    "Senior positions and executives"}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm text-muted-foreground">Description</h3>
                                <p className="text-sm">{template.description}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h2 className="font-semibold mb-3">Other Templates</h2>
                        <div className="space-y-2">
                            {resumeTemplates
                                .filter(t => t.id !== templateId)
                                .map((otherTemplate) => (
                                    <Link
                                        key={otherTemplate.id}
                                        href={`/templates/${otherTemplate.id}`}
                                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{otherTemplate.name}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {otherTemplate.atsScore}/100
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </Card>
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden border">
                    <div className="aspect-[1/1.4] overflow-y-auto bg-white">
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
}