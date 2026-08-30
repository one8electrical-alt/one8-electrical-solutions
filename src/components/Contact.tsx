"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Industrial Wiring",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Industrial Wiring",
        message: "",
      });
    }, 1500);
  };

  const servicesList = [
    "Domestic Wiring",
    "Industrial Wiring",
    "Motor Installation & Repair",
    "Panel Board Design & Fabrication",
    "DG Set Installation & Maintenance",
    "Compressor Installation",
    "HVAC System Wiring",
    "Solar Panel Installation",
    "Power Factor Improvement",
    "Earthing & Lightning Protection",
    "ETP & STP Panel Installation",
    "Energy Audit Service",
    "Fire Alarm System Wiring",
    "Cable Laying & Termination",
    "Transformer Installation & Service",
    "Automation Setup (PLC/SCADA)",
    "Street Lighting Solution",
    "AMC (Annual Maintenance Contract)",
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-brand-dark/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Contact & Quote
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Request an Estimate or Consult
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            Fill out the quote form below, call us directly, or trace our engineering headquarters on the interactive map.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  One8 Electrical Solutions
                </h3>
                <p className="text-sm text-electric-blue dark:text-electric-yellow font-semibold mt-1">
                  Led by Er. Hanuman Yadav (Electrical Engineer)
                </p>
              </div>

              {/* Direct Touchpoints */}
              <div className="space-y-4">
                {/* Er. Hanuman Yadav */}
                <div className="flex items-start space-x-4 text-slate-700 dark:text-slate-300">
                  <div className="bg-electric-blue/10 p-3 rounded-xl text-electric-blue shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">Technical Support</span>
                    <a
                      href="tel:+919828970722"
                      className="text-base font-bold hover:text-electric-blue dark:hover:text-electric-yellow transition-colors block"
                    >
                      +91 9828970722
                    </a>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-light block">Er. Hanuman Yadav (Electrical Engineer)</span>
                  </div>
                </div>

                {/* Kishan Yadav */}
                <div className="flex items-start space-x-4 text-slate-700 dark:text-slate-300">
                  <div className="bg-electric-blue/10 p-3 rounded-xl text-electric-blue shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">Operations Support</span>
                    <a
                      href="tel:+919610081063"
                      className="text-base font-bold hover:text-electric-blue dark:hover:text-electric-yellow transition-colors block"
                    >
                      +91 9610081063
                    </a>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-light block">Kishan Yadav (MCA)</span>
                  </div>
                </div>

                <a
                  href="mailto:one8electrical@gmail.com"
                  className="flex items-start space-x-4 group text-slate-700 dark:text-slate-300 hover:text-electric-blue dark:hover:text-electric-yellow transition-colors"
                >
                  <div className="bg-electric-blue/10 p-3 rounded-xl text-electric-blue group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">Email Inquiries</span>
                    <span className="text-base font-bold">one8electrical@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-start space-x-4 text-slate-700 dark:text-slate-300">
                  <div className="bg-electric-blue/10 p-3 rounded-xl text-electric-blue">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">Headquarters</span>
                    <span className="text-sm font-semibold leading-relaxed">
                      Raholi Road, Gunsi, Newai, Tonk, Rajasthan, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <a
                  href="tel:+919828970722"
                  className="flex items-center justify-center space-x-2 bg-electric-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919828970722?text=Hello%20One8%20Electrical!%20I%20want%20to%20consult%20regarding%20electrical%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#20ba59] transition-colors shadow-md"
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Panel */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card shadow-sm p-4 h-[280px] relative">
              <iframe
                title="One8 Electrical Solutions Headquarters Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14278.431268688463!2d75.8078361!3d26.3533801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396e0dbecfe932ef%3A0xe218d6e326b5fa7c!2sNewai%2C%20Rajasthan%20304021!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full rounded-xl border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Quote & Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Estimate Request Form
              </h3>
              <p className="text-sm text-slate-400 mb-8 font-light">
                Please specify your project scope, select a service, and we will get back to you with a detailed quote estimate.
              </p>

              {status === "success" ? (
                <div className="py-16 text-center space-y-4">
                  <div className="inline-flex bg-green-500/10 text-green-500 p-4 rounded-full">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Request Received Successfully!
                  </h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto font-light">
                    Thank you for contacting One8 Electrical Solutions. Er. Hanuman Yadav or our support representative will contact you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-electric-blue font-bold hover:underline"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Yadav"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 99999 99999"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. client@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Apex Industries"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Select Required Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Message / Project Details
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detail your requirements (e.g., area size, industrial machinery power, solar load capacity required etc.)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-500 font-bold">
                      Please enter your name and phone number so we can reach you.
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-electric-blue text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-electric-blue/30 hover:bg-blue-600 hover:shadow-electric-blue/45 transition-all duration-200 disabled:opacity-50"
                  >
                    {status === "sending" ? "Submitting Estimate..." : "Submit Quote Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
