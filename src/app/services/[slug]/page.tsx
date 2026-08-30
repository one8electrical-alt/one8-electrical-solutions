import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { servicesList } from "@/data/services";
import { 
  ChevronRight, Home as HomeIcon, Factory, Wrench, Cpu, Zap, Wind, 
  Thermometer, Sun, Gauge, Shield, Droplet, FileSpreadsheet, 
  Flame, Layers, Network, Binary, Lightbulb, FileCheck, ArrowLeft, ArrowRight
} from "lucide-react";

// Icon mapping helper
const renderServiceIcon = (slug: string, className: string) => {
  switch (slug) {
    case "domestic-wiring": return <HomeIcon className={className} />;
    case "industrial-wiring": return <Factory className={className} />;
    case "motor-installation-repair": return <Wrench className={className} />;
    case "panel-board-design-fabrication": return <Cpu className={className} />;
    case "dg-set-installation-maintenance": return <Zap className={className} />;
    case "compressor-installation": return <Wind className={className} />;
    case "hvac-system-wiring": return <Thermometer className={className} />;
    case "solar-panel-installation": return <Sun className={className} />;
    case "power-factor-improvement": return <Gauge className={className} />;
    case "earthing-lightning-protection": return <Shield className={className} />;
    case "etp-stp-panel-installation": return <Droplet className={className} />;
    case "energy-audit-service": return <FileSpreadsheet className={className} />;
    case "fire-alarm-system-wiring": return <Flame className={className} />;
    case "cable-laying-termination": return <Layers className={className} />;
    case "transformer-installation-service": return <Network className={className} />;
    case "automation-setup-plc-scada": return <Binary className={className} />;
    case "street-lighting-solution": return <Lightbulb className={className} />;
    case "amc-annual-maintenance-contract": return <FileCheck className={className} />;
    default: return <Zap className={className} />;
  }
};

// SSG static param generation
export async function generateStaticParams() {
  return servicesList.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: "Service Not Found | One8 Electrical Solutions",
    };
  }

  return {
    title: `${service.metaTitle} | One8 Electrical Solutions`,
    description: service.metaDescription,
    alternates: {
      canonical: `https://one8electricalsolutions.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | One8 Electrical Solutions`.slice(0, 60),
      description: service.metaDescription,
      url: `https://one8electricalsolutions.com/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Group other services for internal links side navigation
  const otherServices = servicesList.filter((s) => s.slug !== slug).slice(0, 5);

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
            <Link href="/#services" className="hover:text-electric-blue transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
              {service.title}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-805 dark:border-brand-border shadow-lg py-12 px-6 sm:px-12 lg:py-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-yellow/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue text-xs font-semibold uppercase tracking-wider">
                {service.categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light">
                {service.metaDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Service Overview */}
              <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-electric-blue/10 text-electric-blue p-2.5 rounded-xl">
                    {renderServiceIcon(service.slug, "h-6 w-6")}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Service Overview
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {service.overview}
                </p>
              </section>

              {/* Key Features / Details */}
              <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white border-l-4 border-electric-blue pl-3">
                  Key Services & Technical Scope
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm">
                      <span className="bg-electric-blue/10 p-1 rounded-full text-electric-blue shrink-0 mt-0.5">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Applications & Benefits (2 Grid Columns) */}
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Applications */}
                <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Applications & Sectors
                  </h2>
                  <ul className="space-y-3 text-sm font-light text-slate-500 dark:text-slate-400">
                    {service.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-electric-yellow shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benefits */}
                <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Project Benefits
                  </h2>
                  <ul className="space-y-3 text-sm font-light text-slate-500 dark:text-slate-400">
                    {service.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Back to home / CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-650 dark:text-slate-300 hover:text-electric-blue transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Homepage</span>
                </Link>
                <Link href="/#contact" className="inline-flex items-center gap-2 bg-electric-blue text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-600 transition-all duration-200">
                  <span>Request a Service Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </div>

            {/* Sidebar Navigation (Right) */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Quick Inquiry */}
              <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">
                  Consultation
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Have specific requirements? Connect directly with Er. Hanuman Yadav for professional electrical solutions.
                </p>
                <div className="space-y-3 pt-2">
                  <a href="tel:+919828970722" className="flex items-center justify-center space-x-2 bg-electric-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-md">
                    <span>Call +91 9828970722</span>
                  </a>
                  <a href="https://wa.me/919828970722" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#20ba59] transition-colors shadow-md">
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Other Services list */}
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  Other Services
                </h3>
                <div className="space-y-2">
                  {otherServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      href={`/services/${srv.slug}`}
                      className="block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400 hover:text-electric-blue dark:hover:text-electric-yellow font-light transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
