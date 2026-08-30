"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  MailOpen,
  Trash2,
  Calendar,
  Phone,
  User,
  Building,
  Briefcase,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      setEnquiries(data || []);
    } catch (err: any) {
      setErrorMsg("Failed to retrieve enquiries. Please check SQL connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ is_read: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setEnquiries(
        enquiries.map((enq) =>
          enq.id === id ? { ...enq, is_read: !currentStatus } : enq
        )
      );
    } catch (err: any) {
      alert("Error updating enquiry status.");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
      setEnquiries(enquiries.filter((enq) => enq.id !== id));
    } catch (err: any) {
      alert("Error deleting enquiry.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Customer Enquiries
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
            View and manage message submissions from the public website contact form.
          </p>
        </div>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
          <p className="text-sm text-slate-500">Loading enquiries database...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-500 font-light">
          No enquiries found in the database.
        </div>
      ) : (
        /* Enquiries Stack List */
        <div className="space-y-6">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 rounded-2xl border bg-white dark:bg-brand-card transition-all ${
                enq.is_read
                  ? "border-slate-200 dark:border-slate-850 opacity-75"
                  : "border-electric-blue/40 shadow-sm shadow-electric-blue/5 ring-1 ring-electric-blue/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                
                {/* Information block */}
                <div className="space-y-4 flex-1">
                  
                  {/* Title Header */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <User className="h-4 w-4 text-slate-400" />
                      {enq.name}
                    </span>
                    {enq.company && (
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-350 flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {enq.company}
                      </span>
                    )}
                    <span className="text-xs font-bold px-2.5 py-1 bg-electric-blue/10 text-electric-blue rounded-lg flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {enq.service}
                    </span>
                  </div>

                  {/* Body message text */}
                  <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-light whitespace-pre-line">
                    {enq.message}
                  </p>

                  {/* Metadatas block */}
                  <div className="flex flex-wrap gap-4 text-xs font-light text-slate-400">
                    <a
                      href={`tel:${enq.phone}`}
                      className="hover:underline flex items-center gap-1 hover:text-electric-blue"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {enq.phone}
                    </a>
                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}`}
                        className="hover:underline flex items-center gap-1 hover:text-electric-blue"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {enq.email}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center md:flex-col gap-2 shrink-0 md:self-stretch justify-end">
                  <button
                    onClick={() => toggleReadStatus(enq.id, enq.is_read)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                      enq.is_read
                        ? "border-slate-200 dark:border-slate-750 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        : "border-electric-blue/20 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue hover:text-white"
                    }`}
                    title={enq.is_read ? "Mark as Unread" : "Mark as Read"}
                  >
                    {enq.is_read ? <MailOpen className="h-4.5 w-4.5" /> : <Mail className="h-4.5 w-4.5" />}
                  </button>

                  <button
                    onClick={() => deleteEnquiry(enq.id)}
                    className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
