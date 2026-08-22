"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  category: "industrial" | "panels" | "solar" | "automation" | "hvac" | "dg-transformer" | "maintenance";
  location: string;
  img: string;
};

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "industrial", label: "Industrial Installation" },
    { id: "panels", label: "Panel Fabrication" },
    { id: "solar", label: "Solar Installation" },
    { id: "automation", label: "Automation" },
    { id: "hvac", label: "HVAC Electrical" },
    { id: "dg-transformer", label: "DG & Transformer" },
    { id: "maintenance", label: "Electrical Maintenance" },
  ];

  const projectsList: Project[] = [
    {
      title: "Industrial Plant Power Installation",
      category: "industrial",
      location: "Newai, Rajasthan",
      img: "/images/project-industrial.jpg",
    },
    {
      title: "Distribution & APFC Panel Fabrication",
      category: "panels",
      location: "Tonk, Rajasthan",
      img: "/images/project-panel.jpg",
    },
    {
      title: "100kW Rooftop Solar Installation",
      category: "solar",
      location: "Newai, Rajasthan",
      img: "/images/project-solar.jpg",
    },
    {
      title: "ETP Automation Panel Setup",
      category: "automation",
      location: "Textile Plant, Rajasthan",
      img: "/images/project-automation.jpg",
    },
    {
      title: "Commercial HVAC Control Wiring",
      category: "hvac",
      location: "Jaipur Highway Complex",
      img: "/images/project-commercial.jpg",
    },
    {
      title: "DG Set Setup & Substation Work",
      category: "dg-transformer",
      location: "Gunsi, Rajasthan",
      img: "/images/project-panel.jpg",
    },
    {
      title: "Industrial Electrical Maintenance Check",
      category: "maintenance",
      location: "Tonk Industrial Area",
      img: "/images/project-industrial.jpg",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Our Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Showcasing Engineering Excellence
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            Explore a curated selection of our successfully commissioned residential, commercial, industrial, and solar projects.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 border focus:outline-none ${
                filter === cat.id
                  ? "bg-electric-blue border-electric-blue text-white shadow-lg"
                  : "bg-slate-50 dark:bg-brand-card hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={proj.title}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-brand-dark border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                {/* Project Image */}
                <Image
                  src={proj.img}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Project Info Panel */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold text-electric-yellow uppercase tracking-widest mb-1.5">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-bold tracking-wide mb-1 group-hover:text-electric-yellow transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center text-xs text-slate-300 font-light">
                    {/* Tiny Map Marker pin icon */}
                    <svg
                      className="h-3.5 w-3.5 mr-1 text-electric-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{proj.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
