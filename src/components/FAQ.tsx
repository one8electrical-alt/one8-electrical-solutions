"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  q: string;
  a: string;
  category: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "Electrical Installation",
      q: "Does One8 Electrical Solutions handle industrial substation works?",
      a: "Yes. We offer end-to-end electrical engineering services, including substation planning, HT/LT cable laying, transformer installation, APFC panels, and commissioning according to required electricity distribution guidelines.",
    },
    {
      category: "Industrial Maintenance",
      q: "What benefits does an AMC (Annual Maintenance Contract) provide to factories?",
      a: "An AMC with One8 ensures scheduled physical health checks of power circuits, thermal checks of panels to spot hotspots, contact cleaning, breaker tests, and technical support. This helps reduce unexpected production downtime.",
    },
    {
      category: "Solar Systems",
      q: "How does the net-metering solar process work in Rajasthan?",
      a: "Once we install the rooftop solar array, we coordinate the setup of a bidirectional net meter with local electricity distribution companies (such as JVVNL / AVVNL / JDVVNL). This meter logs energy drawn from the grid versus surplus solar energy sent back, adjusting credit in your monthly billing.",
    },
    {
      category: "Automation",
      q: "Can you automate our existing older relay-based control panels?",
      a: "Yes. We specialize in upgrading older relay systems to PLC boards and linking them with HMI screens or SCADA interfaces for process monitoring and sequencing.",
    },
    {
      category: "Safety Standards",
      q: "What safety protocols do your projects follow?",
      a: "All works are supervised directly by Er. Hanuman Yadav and conform to safety standards and the National Electrical Code. We conduct standard earth resistance, insulation, and safety checks before commissioning.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Common Inquiries Resolved
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            Find prompt answers regarding our electrical contracts, engineering parameters, and project cycles.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-brand-card overflow-hidden hover:border-electric-blue/30 transition-colors"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-8 flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-electric-blue dark:text-electric-yellow uppercase tracking-widest block">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light border-t border-slate-200/50 dark:border-slate-800/50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
