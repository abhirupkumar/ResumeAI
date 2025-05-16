"use client";

import { ChartBar, FileCheck, FileSearch, LayoutTemplate, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    title: "ATS Optimization",
    description:
      "Our intelligent system analyzes your resume against ATS requirements, ensuring it passes automated screening systems.",
  },
  {
    icon: <FileSearch className="h-10 w-10 text-primary" />,
    title: "Keyword Analysis",
    description:
      "Compare your resume to job descriptions and get suggestions for adding critical keywords that hiring managers look for.",
  },
  {
    icon: <LayoutTemplate className="h-10 w-10 text-primary" />,
    title: "Professional Templates",
    description:
      "Choose from 5 professionally designed templates that are both visually appealing and ATS-friendly.",
  },
  {
    icon: <ChartBar className="h-10 w-10 text-primary" />,
    title: "Performance Analytics",
    description:
      "Detailed metrics and insights about your resume's strengths and areas for improvement.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Expert Recommendations",
    description:
      "Get personalized suggestions to improve your content, formatting, and overall effectiveness.",
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Resume Analysis Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides everything you need to create an optimized resume
            that stands out to both ATS systems and hiring managers.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}