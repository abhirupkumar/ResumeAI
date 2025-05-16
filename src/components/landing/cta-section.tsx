"use client";

import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-primary/90 to-purple-600/90 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Upload your resume now and get a free ATS compatibility score.
              See how your resume stands against automated screening systems.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="font-semibold w-full sm:w-auto">
                  <FileUp className="mr-2 h-5 w-5" />
                  Upload Resume
                </Button>
              </Link>

              <Link href="/dashboard/templates">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 font-semibold border-white/20 w-full sm:w-auto">
                  Browse Templates
                </Button>
              </Link>
            </div>

            <p className="text-sm text-white/60 mt-6">
              No credit card required. Get started in minutes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}