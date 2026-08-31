"use client";
import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
};

const STATIC_REVIEWS: Testimonial[] = [
  {
    name: "Rajesh Sharma",
    role: "Operations Manager",
    company: "Apex Textiles, Newai",
    rating: 5,
    text: "One8 Electrical Solutions completely overhauled our sewage treatment plant panels. Er. Hanuman Yadav and his team designed a custom PLC solution that has run flawlessly for months. Their understanding of heavy industrial automation is state-of-the-art.",
  },
  {
    name: "Amit Choudhary",
    role: "Project Developer",
    company: "Choudhary Heights",
    rating: 5,
    text: "We contracted One8 for the complete domestic wiring and subpanel installations for our luxury residential apartment block. Excellent coordination, zero-compromise on cable grades, and perfect safety earthing pits. Highly recommended for commercial builders.",
  },
  {
    name: "Sunil Yadav",
    role: "Proprietor",
    company: "Greenfield Farms",
    rating: 5,
    text: "Hanuman Yadav and his team set up a 25kW solar panel net-metering grid at our facility. The system was designed, structured, and synced with the main line within record time. Our utility bills have plummeted. Honest pricing and certified service.",
  },
];

export default function Testimonials() {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(STATIC_REVIEWS);

  useEffect(() => {
    const fetchLiveTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("active", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const liveReviews: Testimonial[] = data.map((item: any) => ({
            name: item.name,
            role: item.role,
            company: item.company,
            rating: item.rating,
            text: item.text,
          }));
          setReviewsList(liveReviews);
        }
      } catch (e) {
        // Fall back to static
      }
    };
    fetchLiveTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-brand-dark/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trusted by Leaders & Homeowners
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            Read what our clients in Rajasthan say about our electrical engineering and installations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviewsList.map((rev, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-card hover:bg-white dark:hover:bg-brand-card-light/5 hover:border-electric-blue/40 hover:-translate-y-1.5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Icon Overlay */}
              <div className="absolute top-6 right-8 text-slate-200/80 dark:text-slate-800/40 pointer-events-none">
                <Quote className="h-10 w-10 fill-current" />
              </div>

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-electric-yellow text-electric-yellow" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-light italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-electric-blue/10 text-electric-blue flex items-center justify-center font-bold text-sm tracking-wide shrink-0">
                  {rev.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {rev.role}, <span className="font-semibold text-slate-650 dark:text-slate-350">{rev.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
