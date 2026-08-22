"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Factory,
  Layers,
  Utensils,
  Building2,
  Network,
  Settings,
  Warehouse,
  Sun,
} from "lucide-react";

type Industry = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function Industries() {
  const industriesList: Industry[] = [
    {
      title: "Manufacturing",
      desc: "Power distribution cabling and sub-panel installations tailored for general assembly and production machinery.",
      icon: <Factory className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Textile",
      desc: "Cabling and custom panel boards designed for heavy spinning, weaving, and processing setups.",
      icon: <Layers className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Food Processing",
      desc: "Electrical setups and distribution controls configured for processing machinery and conveyor lines.",
      icon: <Utensils className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Commercial Buildings",
      desc: "Sub-station integration, internal lighting wiring, and emergency panel configurations for complexes.",
      icon: <Building2 className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Infrastructure",
      desc: "Commissioning support for transformers, high-tension lines, and substation components.",
      icon: <Network className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Industrial Plants",
      desc: "Custom control panels and automation configurations for monitoring complex industrial cycles.",
      icon: <Settings className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Warehouses",
      desc: "System distribution wiring, high-bay lighting installations, and security alarm system cabling.",
      icon: <Warehouse className="h-6 w-6 text-electric-blue" />,
    },
    {
      title: "Solar & Renewable Energy",
      desc: "Rooftop solar panel grid connection, net-metering interface setup, and cabling integration.",
      icon: <Sun className="h-6 w-6 text-electric-blue" />,
    },
  ];

  return (
    <section id="industries" className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Sectors We Support
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            We provide electrical installations, panel design, and engineering services across diverse sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {industriesList.map((ind, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-card hover:bg-white dark:hover:bg-brand-card-light/5 hover:border-electric-blue/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="bg-electric-blue/10 p-3 rounded-xl w-fit mb-6">
                  {ind.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {ind.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
