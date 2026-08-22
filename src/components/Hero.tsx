"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="One8 Electrical Infrastructure & Engineering"
          fill
          priority
          className="object-cover object-center scale-105 animate-subtle-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-transparent dark:from-brand-dark/95 dark:via-brand-dark/85 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric-yellow/30 bg-electric-yellow/10 text-electric-yellow font-semibold text-xs tracking-wider uppercase backdrop-blur-sm"
            >
              <Zap className="h-3.5 w-3.5 fill-electric-yellow animate-pulse" />
              <span>Electrical Engineering Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Powering Industries with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-electric-yellow">
                Reliable Electrical Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-light"
            >
              Professional electrical engineering, installation, automation and maintenance solutions for industrial and commercial requirements. Led by Er. Hanuman Yadav.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="group flex items-center gap-2 bg-electric-blue text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-electric-blue/40 hover:bg-blue-600 hover:shadow-electric-blue/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#services"
                onClick={(e) => handleScroll(e, "#services")}
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-sm transition-all duration-200"
              >
                <span>Explore Our Services</span>
              </a>

              <a
                href="https://wa.me/919828970722?text=Hello%20One8%20Electrical%20Solutions!%20I%20would%20like%20to%20get%20a%20free%20quote%20on%20electrical%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#25D366]/30 bg-[#25D366]/10 text-white hover:bg-[#25D366]/20 px-6 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-200"
              >
                {/* SVG for WhatsApp */}
                <svg className="h-5 w-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.389 9.805-9.788.002-2.615-1.012-5.074-2.859-6.924C16.37 2.042 13.91 1.026 11.3 1.026 5.902 1.026 1.5 5.417 1.498 10.816c-.001 1.542.41 3.05 1.192 4.385l-1.018 3.714 3.827-.998c1.294.707 2.766 1.077 4.148 1.08z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Glassmorphic Side Stats Banner */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-panel rounded-2xl p-8 border border-white/10 glow-blue text-white space-y-6 relative overflow-hidden"
            >
              {/* Highlight background circle */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-blue/15 rounded-full filter blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold tracking-wide border-b border-white/10 pb-4">
                Project Execution
              </h3>

              <ul className="space-y-4">
                {[
                  "Industrial Design & Commissioning",
                  "Compliance with electrical safety standards",
                  "Dedicated support and maintenance",
                  "Solar PV installations",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm">
                    <span className="bg-electric-blue/25 p-1 rounded-full text-electric-blue shrink-0 mt-0.5">
                      <Zap className="h-3.5 w-3.5 fill-electric-blue" />
                    </span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Serving Rajasthan</span>
                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Wave Overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform translate-y-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] fill-current text-background transition-colors duration-300"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,142.64,41.4,204,50.42,261.38,55.57A315.6,315.6,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
