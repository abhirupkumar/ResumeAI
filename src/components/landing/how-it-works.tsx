"use client";

import { motion } from "framer-motion";
import { 
  Upload, 
  Search, 
  FileText, 
  Download,
  ArrowRight 
} from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload Your Resume",
    description: "Drag and drop your existing resume in PDF or DOCX format.",
    color: "bg-blue-500",
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "AI Analysis",
    description: "Our AI analyzes your resume for ATS compatibility and content effectiveness.",
    color: "bg-teal-500",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Choose a Template",
    description: "Select from our professional templates to showcase your experience.",
    color: "bg-purple-500",
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: "Download & Apply",
    description: "Download your optimized resume and start applying with confidence.",
    color: "bg-amber-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your resume and improve your chances of landing interviews
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row items-start mb-12 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mr-6 flex-shrink-0 mb-4 md:mb-0">
                <div className={`${step.color} text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute h-full w-0.5 bg-gray-200 left-7 top-14 -z-10"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mb-8">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}