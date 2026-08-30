"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";

type GalleryItem = {
  id: string;
  img_url: string;
  alt_text: string;
  created_at: string;
};

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [altText, setAltText] = useState("");

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (err: any) {
      setErrorMsg("Failed to retrieve gallery database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setImgUrl("");
    setAltText("");
    setIsFormOpen(false);
  };

  const saveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgUrl || !altText) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const { error } = await supabase
        .from("gallery")
        .insert([{ img_url: imgUrl, alt_text: altText }]);

      if (error) throw error;

      resetForm();
      fetchGallery();
    } catch (err: any) {
      alert("Error saving gallery item. Check Supabase connection.");
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      setGallery(gallery.filter((g) => g.id !== id));
    } catch (err: any) {
      alert("Error deleting image.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Photo Gallery
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
            Manage image assets showcased across the website structure.
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
          <span>Upload Image</span>
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
              Link New Photo Asset
            </h2>

            <form onSubmit={saveGalleryItem} className="space-y-4">
              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="e.g. /images/project-industrial.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Alt Text */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Alternative (Alt) Text *
                </label>
                <input
                  type="text"
                  required
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. Industrial substation panel cabinet wiring"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid Thumbnail List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
          <p className="text-sm text-slate-500">Loading gallery database...</p>
        </div>
      ) : gallery.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-500 font-light">
          No photo assets stored yet. Click "Upload Image" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm"
            >
              <img
                src={item.img_url}
                alt={item.alt_text}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <a
                  href={item.img_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                  title="View Image"
                >
                  <Eye className="h-5 w-5" />
                </a>
                <button
                  onClick={() => deleteGalleryItem(item.id)}
                  className="p-2.5 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-650 hover:text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-slate-350 truncate">
                {item.alt_text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
