"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Settings, Save, AlertCircle, Loader2, Check } from "lucide-react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    owner_name: "Er. Hanuman Yadav",
    company_address: "Raholi Road, Gunsi, Newai, Tonk, Rajasthan",
    company_phone: "+91 9828970722",
    company_email: "one8electrical@gmail.com",
    company_whatsapp: "9828970722",
    about_us: "",
    seo_title: "One8 Electrical Solutions | Professional Power, Solar & Automation Engineering",
    seo_description: "One8 Electrical Solutions provides safety-first electrical engineering, rooftop solar grids, PLC/SCADA industrial automation, custom control panels, and electrical wiring contracts across Rajasthan.",
    og_image: "/images/hero-bg.jpg",
    favicon: "/favicon.ico",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("settings").select("*");
      if (error) throw error;

      if (data && data.length > 0) {
        const settingsMap: any = {};
        data.forEach((row) => {
          settingsMap[row.key] = row.value;
        });

        setFormData((prev) => ({
          ...prev,
          ...settingsMap,
        }));
      }
    } catch (err: any) {
      setErrorMsg("Failed to load settings from Supabase database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const upsertRows = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
      }));

      const { error } = await supabase.from("settings").upsert(upsertRows, {
        onConflict: "key",
      });

      if (error) throw error;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert("Error saving settings data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-8 w-8 text-electric-blue" />
          General & SEO Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
          Manage contact info, owner specifications, and SEO metadata variables.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
          <p className="text-sm text-slate-500">Loading settings database...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Company Information Grid */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Company Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Owner */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Owner / Engineer Name
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Company Location Address
                </label>
                <input
                  type="text"
                  name="company_address"
                  value={formData.company_address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Contact Phone
                </label>
                <input
                  type="text"
                  name="company_phone"
                  value={formData.company_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  name="company_whatsapp"
                  value={formData.company_whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>
            </div>

            {/* About text */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                About Us Company Intro (Home Section)
              </label>
              <textarea
                name="about_us"
                rows={4}
                value={formData.about_us}
                onChange={handleChange}
                placeholder="Write dynamic introduction text for the about page..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors resize-none"
              />
            </div>
          </div>

          {/* SEO Metadata Config Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              SEO & Social Metadata Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Website SEO Title
                </label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Favicon path */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Favicon Path / Link
                </label>
                <input
                  type="text"
                  name="favicon"
                  value={formData.favicon}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Meta Description
              </label>
              <textarea
                name="seo_description"
                rows={3}
                value={formData.seo_description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors resize-none"
              />
            </div>

            {/* OG Image path */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                OpenGraph Preview Image URL
              </label>
              <input
                type="text"
                name="og_image"
                value={formData.og_image}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center space-x-4">
            {saveSuccess && (
              <span className="text-sm font-bold text-green-500 flex items-center gap-1.5 animate-fade-in">
                <Check className="h-4 w-4" />
                <span>Configuration Saved Successfully!</span>
              </span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="bg-electric-blue text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-electric-blue/20 hover:bg-blue-600 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
