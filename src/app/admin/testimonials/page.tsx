"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  Loader2,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  active: boolean;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [active, setActive] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err: any) {
      setErrorMsg("Failed to retrieve testimonials database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setName("");
    setRole("");
    setCompany("");
    setRating(5);
    setText("");
    setActive(true);
    setIsFormOpen(false);
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setEditId(testimonial.id);
    setName(testimonial.name);
    setRole(testimonial.role);
    setCompany(testimonial.company);
    setRating(testimonial.rating);
    setText(testimonial.text);
    setActive(testimonial.active);
    setIsFormOpen(true);
  };

  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !text) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        name,
        role,
        company,
        rating,
        text,
        active,
      };

      if (editId) {
        const { error } = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchTestimonials();
    } catch (err: any) {
      alert("Error saving testimonial. Check Supabase connection.");
    }
  };

  const toggleTestimonialActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ active: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...t, active: !currentStatus } : t
        )
      );
    } catch (err: any) {
      alert("Error updating status.");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err: any) {
      alert("Error deleting testimonial.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Customer Testimonials
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
            Manage five-star rated feedback and reviews visible on the homepage.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="bg-electric-blue text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-blue-600 flex items-center gap-1.5 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Review</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              {editId ? "Edit Customer Review" : "Create New Testimonial"}
            </h2>

            <form onSubmit={saveTestimonial} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Rating (Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Project Director"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Textiles"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Review Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Insert client review text verbatim..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors resize-none"
                />
              </div>

              {/* Active Switch */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="active-t"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded border-slate-350 dark:border-slate-850 text-electric-blue focus:ring-electric-blue"
                />
                <label htmlFor="active-t" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Review is active (visible to public)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-electric-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-600"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
          <p className="text-sm text-slate-500">Loading testimonials database...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-500 font-light">
          No reviews available. Click "Add Review" to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border bg-white dark:bg-brand-card flex flex-col justify-between transition-opacity ${
                item.active ? "border-slate-200 dark:border-slate-800" : "border-slate-200 opacity-60"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-electric-yellow text-electric-yellow" />
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => toggleTestimonialActive(item.id, item.active)}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        item.active ? "text-green-500" : "text-slate-400"
                      }`}
                      title={item.active ? "Deactivate" : "Activate"}
                    >
                      {item.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-1.5 text-slate-500 hover:text-slate-850 dark:hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTestimonial(item.id)}
                      className="p-1.5 text-red-450 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light italic mb-6">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-855 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-electric-blue/15 text-electric-blue flex items-center justify-center font-bold text-xs">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {item.role}, <span className="font-semibold text-slate-500">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
