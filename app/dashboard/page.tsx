"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, BarChart2, Download, AlertCircle, CheckCircle, ChevronUp, ChevronDown, Award } from "lucide-react";
import { sampleATSAnalysis, sampleResumeData } from "@/lib/resume-data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    const { overallScore, sectionScores, keywordMatches } = sampleATSAnalysis;

    // Transform section scores for chart
    const sectionScoreData = sectionScores.map(section => ({
        name: section.name,
        score: (section.score / section.max) * 100
    }));

    // Calculate keyword match percentage
    const keywordMatchPercentage = Math.round(
        (keywordMatches.filter(k => k.present).length / keywordMatches.length) * 100
    );

    // Prepare data for pie chart
    const pieData = [
        { name: "Matched", value: keywordMatches.filter(k => k.present).length },
        { name: "Missing", value: keywordMatches.filter(k => !k.present).length }
    ];

    const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-3))"];

    return (
        <div className="space-y-6 sm:p-8 p-4 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {sampleResumeData.basics.name.split(" ")[0]}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link href="/dashboard/upload">
                        <Button>
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload Resume
                        </Button>
                    </Link>

                    <Link href="/dashboard/templates">
                        <Button variant="outline">
                            View Templates
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ATS Score</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{overallScore}/100</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${overallScore >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : overallScore >= 60 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                            </div>
                        </div>
                        <Progress className="h-2 mt-2" value={overallScore} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Keyword Match</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{keywordMatchPercentage}%</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${keywordMatchPercentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : keywordMatchPercentage >= 60 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {keywordMatchPercentage >= 80 ? 'Strong Match' : keywordMatchPercentage >= 60 ? 'Good Match' : 'Poor Match'}
                            </div>
                        </div>
                        <Progress className="h-2 mt-2" value={keywordMatchPercentage} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Improvement Areas</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{sampleATSAnalysis.improvementAreas.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Actionable suggestions to improve your resume
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Resume downloads in the last 30 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="sections">Section Scores</TabsTrigger>
                    <TabsTrigger value="improvements">Improvements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resume Performance</CardTitle>
                            <CardDescription>
                                Visual overview of your resume's performance metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-2">
                            <div className="h-80 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-3 text-center">Keyword Match Analysis</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-3 text-center">Section Performance</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart
                                            data={sectionScoreData}
                                            layout="vertical"
                                            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" domain={[0, 100]} />
                                            <YAxis type="category" dataKey="name" width={80} />
                                            <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                                            <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Strengths</CardTitle>
                                <CardDescription>
                                    Areas where your resume performs well
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {sampleATSAnalysis.strengths.map((strength, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-2"
                                        >
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{strength}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Next Steps</CardTitle>
                                <CardDescription>
                                    Recommended actions to improve your resume
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {sampleATSAnalysis.improvementAreas.slice(0, 3).map((area, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-2"
                                        >
                                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                            <span>{area}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setActiveTab("improvements")}
                                >
                                    View All Improvement Suggestions
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Keyword Analysis</CardTitle>
                            <CardDescription>
                                Match rate with common ATS keywords for your field
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">Keyword Match Rate</h3>
                                    <span className="text-sm font-medium">{keywordMatchPercentage}%</span>
                                </div>
                                <Progress value={keywordMatchPercentage} className="h-2" />

                                <div className="border rounded-md divide-y">
                                    <div className="grid grid-cols-12 p-3 text-sm font-medium bg-muted">
                                        <div className="col-span-4">Keyword</div>
                                        <div className="col-span-2 text-center">Present</div>
                                        <div className="col-span-2 text-center">Importance</div>
                                        <div className="col-span-4">Suggestions</div>
                                    </div>

                                    {keywordMatches.map((keyword, index) => (
                                        <div key={index} className="grid grid-cols-12 p-3 text-sm items-center">
                                            <div className="col-span-4 font-medium">{keyword.keyword}</div>
                                            <div className="col-span-2 text-center">
                                                {keyword.present ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                                                )}
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs ${keyword.importance === "high"
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                    : keyword.importance === "medium"
                                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                    }`}>
                                                    {keyword.importance}
                                                </span>
                                            </div>
                                            <div className="col-span-4 text-muted-foreground">
                                                {keyword.suggestions ? keyword.suggestions[0] :
                                                    keyword.present ? "Already included" : "Consider adding this keyword"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sections" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Section Scores</CardTitle>
                            <CardDescription>
                                Performance breakdown by resume section
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {sectionScores.map((section, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between">
                                            <div className="font-medium">{section.name}</div>
                                            <div className="text-sm">
                                                {section.score}/{section.max} points
                                            </div>
                                        </div>
                                        <Progress value={(section.score / section.max) * 100} className="h-2" />
                                        {section.feedback && section.feedback.length > 0 && (
                                            <div className="text-sm text-muted-foreground pt-1">
                                                <div className="flex items-start gap-1">
                                                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                    <span>{section.feedback[0]}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="improvements" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Improvement Suggestions</CardTitle>
                            <CardDescription>
                                Actionable steps to enhance your resume's ATS compatibility
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-3">Priority Improvements</h3>
                                    <div className="space-y-3">
                                        {sampleATSAnalysis.suggestions.map((suggestion, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-muted p-3 rounded-md"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        {index + 1}
                                                    </div>
                                                    <div>{suggestion}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium mb-3">Areas of Improvement</h3>
                                        <ul className="space-y-2">
                                            {sampleATSAnalysis.improvementAreas.map((area, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                                    <span>{area}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-3">Current Strengths</h3>
                                        <ul className="space-y-2">
                                            {sampleATSAnalysis.strengths.map((strength, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
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
    );
}