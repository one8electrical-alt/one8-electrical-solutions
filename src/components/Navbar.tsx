"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Zap, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Industries", href: "/#industries" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      setIsOpen(false);
      const targetId = href.substring(1); // remove the leading "/"
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 80; // height of fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-brand-border shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#home"
            onClick={(e) => handleLinkClick(e, "/#home")}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="bg-electric-blue p-2 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-md">
              <Zap className="h-6 w-6 text-electric-yellow fill-electric-yellow animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-wider text-slate-900 dark:text-white group-hover:text-electric-blue transition-colors">
                ONE8 ELECTRICAL
              </span>
              <span className="text-[10px] font-semibold text-electric-blue tracking-widest uppercase">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-electric-blue dark:hover:text-electric-yellow transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue dark:bg-electric-yellow transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-electric-yellow" />
                ) : (
                  <Moon className="h-5 w-5 text-electric-blue" />
                )}
              </button>
            )}

            {/* Quick Call */}
            <a
              href="tel:+919828970722"
              className="flex items-center space-x-1 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-electric-blue transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+91 9828970722</span>
            </a>

            {/* CTA Button */}
            <Link
              href="/#contact"
              onClick={(e) => handleLinkClick(e, "/#contact")}
              className="bg-electric-blue text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-lg shadow-electric-blue/30 hover:bg-blue-600 hover:shadow-electric-blue/45 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Theme Toggle Mobile */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-electric-yellow" />
                ) : (
                  <Moon className="h-5 w-5 text-electric-blue" />
                )}
              </button>
            )}

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-brand-dark/95 border-b border-brand-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-3 py-2 rounded-md text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-electric-blue dark:hover:text-electric-yellow"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3 px-3">
                <a
                  href="tel:+919828970722"
                  className="flex items-center space-x-2 text-base font-bold text-slate-800 dark:text-slate-200"
                >
                  <Phone className="h-5 w-5 text-electric-blue" />
                  <span>+91 9828970722</span>
                </a>
                <Link
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, "/#contact")}
                  className="bg-electric-blue text-white text-center py-3 rounded-lg font-bold tracking-wide shadow-md"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
