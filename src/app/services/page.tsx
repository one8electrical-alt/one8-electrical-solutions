import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { servicesList } from "@/data/services";
import { 
  ChevronRight, Home as HomeIcon, Factory, Wrench, Cpu, Zap, Wind, 
  Thermometer, Sun, Gauge, Shield, Droplet, FileSpreadsheet, 
  Flame, Layers, Network, Binary, Lightbulb, FileCheck, ArrowRight
} from "lucide-react";

// Icon mapping helper
const getServiceIcon = (slug: string) => {
  switch (slug) {
    case "domestic-wiring": return HomeIcon;
    case "industrial-wiring": return Factory;
    case "motor-installation-repair": return Wrench;
    case "panel-board-design-fabrication": return Cpu;
    case "dg-set-installation-maintenance": return Zap;
    case "compressor-installation": return Wind;
    case "hvac-system-wiring": return Thermometer;
    case "solar-panel-installation": return Sun;
    case "power-factor-improvement": return Gauge;
    case "earthing-lightning-protection": return Shield;
    case "etp-stp-panel-installation": return Droplet;
    case "energy-audit-service": return FileSpreadsheet;
    case "fire-alarm-system-wiring": return Flame;
    case "cable-laying-termination": return Layers;
    case "transformer-installation-service": return Network;
    case "automation-setup-plc-scada": return Binary;
    case "street-lighting-solution": return Lightbulb;
    case "amc-annual-maintenance-contract": return FileCheck;
    default: return Zap;
  }
};

export const metadata: Metadata = {
  title: "Electrical Engineering & Industrial Services | One8 Electrical Solutions",
  description: "Browse the full range of safety-first electrical services, panel design, SCADA automation, solar power installations, and maintenance contracts by One8 Electrical Solutions across Rajasthan.",
  alternates: {
    canonical: "https://one8electricalsolutions.com/services",
  },
  openGraph: {
    title: "Electrical Services Catalogue | One8 Electrical Solutions",
    description: "Full directory of industrial, commercial, and green energy electrical services by Er. Hanuman Yadav.",
    url: "https://one8electricalsolutions.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-slate-50 dark:bg-brand-dark transition-colors duration-300 pt-24 pb-16">
        
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-electric-blue transition-colors flex items-center gap-1">
              <HomeIcon className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
              Services
            </span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-electric-blue" />
              Service Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Our Professional Electrical Services
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-light">
              Explore our full portfolio of industrial automation, solar systems, substation wiring, and electrical contracting solutions led by Er. Hanuman Yadav.
            </p>
          </div>
        </div>

        {/* Services Catalog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => {
              const IconComponent = getServiceIcon(service.slug);
              return (
                <div
                  key={service.slug}
                  className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card hover:bg-slate-50/50 dark:hover:bg-brand-card-light/5 hover:border-electric-blue/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
                >
                  {/* Hover Glow Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 rounded-bl-full pointer-events-none group-hover:bg-electric-blue/10 transition-colors" />

                  <div>
                    {/* Icon */}
                    <div className="bg-electric-blue/10 text-electric-blue p-3.5 rounded-xl w-fit mb-6 transition-transform group-hover:scale-110">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Service Category */}
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
                      {service.categoryName}
                    </span>

                    {/* Title & Description */}
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-electric-blue dark:group-hover:text-electric-yellow transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
                      {service.overview}
                    </p>
                  </div>

                  {/* Explore button/link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center text-xs font-bold text-electric-blue dark:text-electric-yellow uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto focus:outline-none"
                  >
                    <span>Explore Details</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
