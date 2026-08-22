"use client";
import React from "react";
import { ShieldCheck, Award, Clock, HeartHandshake, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-electric-blue" />,
      title: "Safety Standards First",
      desc: "Prioritizing safety protocols in all installations. All operations conform to standard electricity rules and safety regulations.",
    },
    {
      icon: <Award className="h-6 w-6 text-electric-blue" />,
      title: "Engineering Expertise",
      desc: "Our engineering operations are led directly by Er. Hanuman Yadav, providing professional planning and oversight.",
    },
    {
      icon: <Clock className="h-6 w-6 text-electric-blue" />,
      title: "Timely Project Execution",
      desc: "Methodical execution frameworks ensuring electrical setups and installations are completed according to schedule.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-electric-blue" />,
      title: "Customer Satisfaction",
      desc: "Dedicated service models and responsive assistance designed to ensure reliable system operation.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-brand-dark/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-electric-blue" />
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Engineering Safe, Smart, & Reliable Power Infrastructure
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              One8 Electrical Solutions is an electrical engineering service provider delivering end-to-end design, installation, solar setup, and automation services. Founded on principles of quality workmanship and safety, we support commercial spaces, residential complexes, and industries across Rajasthan.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Under the direct leadership of <strong>Er. Hanuman Yadav</strong>, we bring engineering experience to solve complex power grid, solar energy, and PLC/SCADA industrial automation challenges.
            </p>

            {/* Core Mission Mini Card */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-electric-blue/10 text-electric-blue shrink-0">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Our Mission
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  To deliver reliable engineering services that improve energy efficiency, enhance system safety, and support transition to solar grids and automated solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="lg:col-span-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 w-fit mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
