"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "After using ResumeAI, I got callbacks from 3 out of 5 companies I applied to. The ATS optimization made all the difference!",
    author: "Sarah Johnson",
    title: "Software Engineer",
    imageSrc: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    quote: "I was struggling to get interviews despite having great experience. This platform helped me restructure my resume and highlight the right keywords.",
    author: "Michael Chen",
    title: "Marketing Manager",
    imageSrc: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    quote: "The templates are not only beautiful but actually improved my ATS score. I landed my dream job after using ResumeAI!",
    author: "Jessica Williams",
    title: "Product Designer",
    imageSrc: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resume and landed more interviews
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-12 -translate-y-1/2 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-[400px] md:h-[300px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-background rounded-xl p-8 shadow-sm border h-full flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentIndex].imageSrc}
                        alt={testimonials[currentIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <Quote className="h-8 w-8 text-primary/40 mb-2" />
                    <p className="text-lg mb-4 italic">
                      &quot;{testimonials[currentIndex].quote}&quot;
                    </p>
                    <div>
                      <p className="font-semibold">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`h-2 w-2 rounded-full p-0 ${currentIndex === index
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                  }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}