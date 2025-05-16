"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resumeTemplates, sampleResumeData } from "@/lib/resume-data";
import { TemplateType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Download, FileCheck, FileText, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ProfessionalTemplate } from "@/components/templates/professional-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ExecutiveTemplate } from "@/components/templates/executive-template";
import { render } from "react-dom";

export default function TemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TemplateType.Professional);
    const { toast } = useToast();
    const handleDownload = () => {
        toast({
            title: "Resume Downloaded",
            description: "Your resume has been downloaded successfully.",
        });
    };

    const renderTemplate = (template: string) => {
        switch (template) {
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
        <div className="space-y-6 sm:p-8 p-4 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Templates</h1>
                    <p className="text-muted-foreground">
                        Choose from our collection of ATS-optimized resume templates
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Current
                    </Button>

                    <Link href={`/dashboard/templates/${selectedTemplate}`}>
                        <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Preview Full Page
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Template selector */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose a Template</CardTitle>
                            <CardDescription>
                                All templates are optimized for ATS compatibility
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {resumeTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedTemplate === template.id
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                        }`}
                                    onClick={() => setSelectedTemplate(template.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {selectedTemplate === template.id ? (
                                                <Check className="h-5 w-5 mr-2" />
                                            ) : (
                                                <div className="w-5 h-5 border rounded-full mr-2" />
                                            )}
                                            <div>
                                                <p className="font-medium">{template.name}</p>
                                                <p className={`text-xs ${selectedTemplate === template.id
                                                    ? "text-primary-foreground/80"
                                                    : "text-muted-foreground"
                                                    }`}>
                                                    ATS Score: {template.atsScore}/100
                                                </p>
                                            </div>
                                        </div>

                                        <FileCheck className={`h-5 w-5 ${selectedTemplate === template.id
                                            ? "text-primary-foreground/80"
                                            : "text-muted-foreground"
                                            }`} />
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4">
                                <Button className="w-full" onClick={handleDownload}>
                                    Use This Template
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Template Features</CardTitle>
                            <CardDescription>
                                Benefits of our professionally designed templates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>ATS-optimized formatting</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Clean, professional layouts</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Properly structured sections</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Designed by HR professionals</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>PDF and DOCX download options</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Industry-specific variations</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Template preview and details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>{resumeTemplates.find(t => t.id === selectedTemplate)?.name} Template</CardTitle>
                                    <CardDescription>
                                        {resumeTemplates.find(t => t.id === selectedTemplate)?.description}
                                    </CardDescription>
                                </div>
                                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                                    ATS Score: {resumeTemplates.find(t => t.id === selectedTemplate)?.atsScore}/100
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="preview" className="space-y-4">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="details">Template Details</TabsTrigger>
                                </TabsList>

                                <TabsContent value="preview">
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                                            {renderTemplate(selectedTemplate)}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                                <div className="p-4 text-white w-full">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-bold">
                                                                {resumeTemplates.find(t => t.id === selectedTemplate)?.name}
                                                            </h3>
                                                            <p className="text-sm text-white/80">
                                                                Perfect for {selectedTemplate === TemplateType.Creative ? "creative industries" :
                                                                    selectedTemplate === TemplateType.Executive ? "senior positions" :
                                                                        selectedTemplate === TemplateType.Modern ? "tech roles" :
                                                                            selectedTemplate === TemplateType.Minimal ? "clean presentation" :
                                                                                "traditional industries"}
                                                            </p>
                                                        </div>

                                                        <Link href={`/dashboard/templates/${selectedTemplate}`}>
                                                            <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                                                                <ArrowRight className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <Button onClick={handleDownload}>
                                            Use This Template
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="details">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Template Features</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        {selectedTemplate === TemplateType.Creative ? "Unique visual elements with ATS-safe formatting" :
                                                            selectedTemplate === TemplateType.Executive ? "Premium layout for executive positions" :
                                                                selectedTemplate === TemplateType.Modern ? "Contemporary design with balanced sections" :
                                                                    selectedTemplate === TemplateType.Minimal ? "Clean, efficient use of space" :
                                                                        "Traditional structure optimized for ATS systems"}
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        Sections arranged for maximum ATS readability
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        {selectedTemplate === TemplateType.Creative ? "Subtle color accents to highlight key information" :
                                                            selectedTemplate === TemplateType.Executive ? "Strategic use of white space and typography" :
                                                                selectedTemplate === TemplateType.Modern ? "Clean section dividers and consistent spacing" :
                                                                    selectedTemplate === TemplateType.Minimal ? "Focused content presentation without distractions" :
                                                                        "Clear section headings and standardized formatting"}
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        Standard fonts optimized for digital and print readability
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Best For</h3>
                                            <p>
                                                {selectedTemplate === TemplateType.Creative ?
                                                    "Design, marketing, and creative professionals who want to stand out while maintaining ATS compatibility." :
                                                    selectedTemplate === TemplateType.Executive ?
                                                        "Senior managers, executives, and C-suite candidates who need a polished, authoritative presentation." :
                                                        selectedTemplate === TemplateType.Modern ?
                                                            "Tech professionals, digital marketers, and candidates in forward-thinking industries." :
                                                            selectedTemplate === TemplateType.Minimal ?
                                                                "Candidates who prefer streamlined design that puts content first, ideal for technical roles." :
                                                                "Traditional industries like finance, law, healthcare, and government positions."}
                                            </p>
                                        </div>

                                        <div className="flex justify-center pt-2">
                                            <Button onClick={handleDownload}>
                                                Use This Template
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumeTemplates
                            .filter(t => t.id !== selectedTemplate)
                            .slice(0, 2)
                            .map((template) => (
                                <motion.div
                                    key={template.id}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card className="cursor-pointer overflow-hidden h-full" onClick={() => setSelectedTemplate(template.id)}>
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            {renderTemplate(template.id)}
                                        </div>
                                        <CardContent className="pt-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold">{template.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        ATS Score: {template.atsScore}/100
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    Select
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Need more templates?</h3>
                                    <p className="text-muted-foreground">
                                        Upgrade to access our full library of premium templates
                                    </p>
                                </div>
                                <Button variant="outline">
                                    View Premium Templates
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}