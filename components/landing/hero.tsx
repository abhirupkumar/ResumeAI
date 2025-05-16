"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileUploader } from "../upload/file-uploader";

export function Hero() {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Your Resume <span className="text-primary">ATS-Ready</span> in Minutes
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our AI-powered platform analyzes your resume, optimizes it for ATS systems, 
            and helps you land more interviews with beautiful professional templates.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" onClick={() => setShowUploader(!showUploader)}>
              {showUploader ? "Hide Uploader" : "Upload Resume"}
            </Button>
            
            <Link href="/templates">
              <Button size="lg" variant="outline">
                Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <AnimatePresence>
            {showUploader && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FileUploader />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center">
              <CheckCircle2 className="text-primary mr-2 h-5 w-5" />
              <span>ATS Optimization</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="text-primary mr-2 h-5 w-5" />
              <span>Keyword Analysis</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="text-primary mr-2 h-5 w-5" />
              <span>5 Professional Templates</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="text-primary mr-2 h-5 w-5" />
              <span>Instant Download</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}