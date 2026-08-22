"use client";
import React from "react";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
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
    <footer className="bg-slate-900 text-slate-350 dark:bg-brand-dark dark:text-slate-400 border-t border-slate-800 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Description Column */}
          <div className="space-y-6">
            <a href="#" className="flex items-center space-x-2 w-fit">
              <div className="bg-electric-blue p-2 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-electric-yellow fill-electric-yellow" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-bold tracking-wider text-white">
                  ONE8 ELECTRICAL
                </span>
                <span className="text-[9px] font-semibold text-electric-blue tracking-widest uppercase">
                  Solutions
                </span>
              </div>
            </a>
            <p className="text-sm font-light text-slate-400 leading-relaxed">
              Professional electrical engineering, smart industrial automation panels, solar setups, electrical audits, and safety contracting services.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                {
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                    </svg>
                  ),
                  href: "#",
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  href: "#",
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  href: "#",
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                  href: "#",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="bg-slate-800 hover:bg-electric-blue text-slate-300 hover:text-white p-2.5 rounded-lg transition-colors duration-250 shadow-inner"
                  aria-label="Social Link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wider uppercase border-l-2 border-electric-blue pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm font-light">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Projects", href: "#projects" },
                { name: "Industries", href: "#industries" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="hover:text-electric-blue hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Services Column */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wider uppercase border-l-2 border-electric-blue pl-3">
              Key Services
            </h3>
            <ul className="space-y-3 text-sm font-light">
              {[
                "Industrial Wiring",
                "Panel Board Design & Fabrication",
                "Solar Panel Installation",
                "ETP & STP Panel Installation",
                "Energy Audit Service",
                "Automation Setup (PLC/SCADA)",
              ].map((srv) => (
                <li key={srv}>
                  <a href="#services" className="hover:text-electric-blue hover:translate-x-1 transition-all inline-block">
                    {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wider uppercase border-l-2 border-electric-blue pl-3">
              Contact Details
            </h3>
            <div className="space-y-4 text-sm font-light text-slate-400">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-electric-blue shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Raholi Road, Gunsi, Newai, Tonk, Rajasthan, 304021
                </span>
              </div>

              <a href="tel:+919828970722" className="flex items-center space-x-3 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-electric-blue shrink-0" />
                <span>+91 9828970722</span>
              </a>

              <a href="mailto:one8electrical@gmail.com" className="flex items-center space-x-3 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-electric-blue shrink-0" />
                <span>one8electrical@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Rights */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light space-y-4 sm:space-y-0">
          <p>© 2026 One8 Electrical Solutions. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
