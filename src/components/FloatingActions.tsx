"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp, MessageCircle, Phone, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 items-center">
      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="p-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quote / Enquiry CTA */}
      <button
        onClick={handleScrollToContact}
        className="p-3 bg-electric-blue hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer"
        aria-label="Request Quote"
      >
        <FileText className="h-5 w-5" />
      </button>

      {/* Direct Call Action */}
      <a
        href="tel:+919828970722"
        className="p-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label="Call Support"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/919828970722?text=Hello%20One8%20Electrical%20Solutions!%20I%20would%20like%20to%20get%20in%20touch."
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center animate-bounce hover:animate-none"
        style={{ animationDuration: "3s" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-current text-white" />
      </a>
    </div>
  );
}
