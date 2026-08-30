"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import * as LucideIcons from "lucide-react";

const getSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const getIcon = (name: string) => {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className="h-6 w-6" />;
  }
  return <LucideIcons.Zap className="h-6 w-6" />;
};

type Service = {
  title: string;
  category: "all" | "power" | "green" | "control";
  desc: string;
  icon: React.ReactNode;
};

const STATIC_SERVICES: Service[] = [
  {
    title: "Domestic Wiring",
    category: "power",
    desc: "Standard internal wiring installations and distributions for residential blocks, villas, and apartments.",
    icon: <LucideIcons.Home className="h-6 w-6" />,
  },
  {
    title: "Industrial Wiring",
    category: "power",
    desc: "Heavy-duty conduit layout, cable trunking, and power routing designed for industrial machinery and processing units.",
    icon: <LucideIcons.Factory className="h-6 w-6" />,
  },
  {
    title: "Motor Installation & Repair",
    category: "power",
    desc: "Setup, alignment, and servicing for single and three-phase industrial motors and pumps.",
    icon: <LucideIcons.Wrench className="h-6 w-6" />,
  },
  {
    title: "Panel Board Design & Fabrication",
    category: "control",
    desc: "Custom control panels, switchgear boards, and distribution boards designed for systematic power allocation.",
    icon: <LucideIcons.Cpu className="h-6 w-6" />,
  },
  {
    title: "DG Set Installation & Maintenance",
    category: "power",
    desc: "Complete diesel generator installation, synchronization setup, and periodic routine maintenance services.",
    icon: <LucideIcons.Zap className="h-6 w-6" />,
  },
  {
    title: "Compressor Installation",
    category: "power",
    desc: "Electrical power synchronization, cabling, and starter panel configuration for industrial air compressor units.",
    icon: <LucideIcons.Wind className="h-6 w-6" />,
  },
  {
    title: "HVAC System Wiring",
    category: "power",
    desc: "Control loops, power wiring, and switchgear setup for centralized chiller plants and ventilation units.",
    icon: <LucideIcons.Thermometer className="h-6 w-6" />,
  },
  {
    title: "Solar Panel Installation",
    category: "green",
    desc: "Rooftop solar design, solar PV array structure layout, and grid connection setup.",
    icon: <LucideIcons.Sun className="h-6 w-6" />,
  },
  {
    title: "Power Factor Improvement",
    category: "green",
    desc: "Fabrication of Automatic Power Factor Correction (APFC) panels to reduce reactive power losses.",
    icon: <LucideIcons.Gauge className="h-6 w-6" />,
  },
  {
    title: "Earthing & Lightning Protection",
    category: "green",
    desc: "Design and installation of chemical earthing grids and lightning protection grids for safety.",
    icon: <LucideIcons.Shield className="h-6 w-6" />,
  },
  {
    title: "ETP & STP Panel Installation",
    category: "control",
    desc: "Weatherproof panel assemblies and pump starters for Effluent and Sewage Treatment Plants.",
    icon: <LucideIcons.Droplet className="h-6 w-6" />,
  },
  {
    title: "Energy Audit Service",
    category: "green",
    desc: "Routine assessments of power distribution efficiency, load balancing, and energy saving recommendations.",
    icon: <LucideIcons.FileSpreadsheet className="h-6 w-6" />,
  },
  {
    title: "Fire Alarm System Wiring",
    category: "green",
    desc: "Sensor wiring, control loop design, alarm panels, and safety integration for commercial networks.",
    icon: <LucideIcons.Flame className="h-6 w-6" />,
  },
  {
    title: "Cable Laying & Termination",
    category: "power",
    desc: "Underground armored cabling, cable tray routing, and termination of HT/LT power cables.",
    icon: <LucideIcons.Layers className="h-6 w-6" />,
  },
  {
    title: "Transformer Installation & Service",
    category: "power",
    desc: "Substation commissioning assistance, transformer placement, oil filtration, and regular testing services.",
    icon: <LucideIcons.Network className="h-6 w-6" />,
  },
  {
    title: "Automation Setup (PLC/SCADA)",
    category: "control",
    desc: "Programmable Logic Controller setups and SCADA dashboard interfaces for industrial process monitoring.",
    icon: <LucideIcons.Binary className="h-6 w-6" />,
  },
  {
    title: "Street Lighting Solution",
    category: "power",
    desc: "Design and installation of smart lighting grids and automated timers for yards, roads, and compounds.",
    icon: <LucideIcons.Lightbulb className="h-6 w-6" />,
  },
  {
    title: "AMC (Annual Maintenance Contract)",
    category: "control",
    desc: "Scheduled periodic checks, contactor cleaning, load tests, and priority support for industrial systems.",
    icon: <LucideIcons.FileCheck className="h-6 w-6" />,
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<"all" | "power" | "green" | "control">("all");
  const [servicesList, setServicesList] = useState<Service[]>(STATIC_SERVICES);

  useEffect(() => {
    const fetchLiveServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("active", true)
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const liveServices: Service[] = data.map((item) => ({
            title: item.title,
            category: item.category as any,
            desc: item.desc,
            icon: getIcon(item.icon_name),
          }));
          setServicesList(liveServices);
        }
      } catch (e) {
        // Fall back to static config
      }
    };
    fetchLiveServices();
  }, []);

  const filteredServices = servicesList.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  const categories = [
    { id: "all", label: "All Services" },
    { id: "power", label: "Power & Substations" },
    { id: "green", label: "Green Energy & Audits" },
    { id: "control", label: "Automation & Panels" },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            High-Performance Engineering Solutions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            Explore our comprehensive range of electrical design, installation, smart automation, and maintenance services.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as "all" | "power" | "green" | "control")}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border focus:outline-none ${
                activeCategory === cat.id
                  ? "bg-electric-blue border-electric-blue text-white shadow-lg shadow-electric-blue/20"
                  : "bg-slate-50 dark:bg-brand-card hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={service.title}
                className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-card hover:bg-white dark:hover:bg-brand-card-light/5 hover:border-electric-blue/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 rounded-bl-full pointer-events-none group-hover:bg-electric-blue/10 transition-colors" />

                <div>
                  {/* Icon */}
                  <div className="bg-electric-blue/10 text-electric-blue p-3.5 rounded-xl w-fit mb-6 transition-transform group-hover:scale-110">
                    {service.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-electric-blue dark:group-hover:text-electric-yellow transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Explore button/link decoration */}
                <Link
                  href={`/services/${getSlug(service.title)}`}
                  className="flex items-center text-xs font-bold text-electric-blue dark:text-electric-yellow uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto focus:outline-none"
                >
                  <span>Learn More</span>
                  <svg
                    className="ml-1.5 h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
