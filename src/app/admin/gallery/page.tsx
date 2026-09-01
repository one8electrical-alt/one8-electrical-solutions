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
  UploadCloud,
  Check,
  Link as LinkIcon,
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
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadWarning, setUploadWarning] = useState("");

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch {
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
    setUploading(false);
    setUploadSuccess(false);
    setUploadWarning("");
    setIsFormOpen(false);
  };

  // Supabase Storage File Uploader
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, etc.).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    try {
      setUploading(true);
      setUploadWarning("");
      setUploadSuccess(false);

      const fileExt = file.name.split(".").pop();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, "_");
      const filePath = `gallery/${Date.now()}_${cleanFileName}.${fileExt}`;

      // Upload to Supabase Storage 'media' bucket
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setImgUrl(publicUrl);
      setUploadSuccess(true);
    } catch (err: any) {
      console.warn("Storage upload failed, falling back to manual URL:", err);
      setUploadWarning(
        "Supabase Storage 'media' bucket not accessible or not created. You can enter an image URL manually below."
      );
    } finally {
      setUploading(false);
    }
  };

  const saveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgUrl || !altText) {
      alert("Please provide an image and alternative description text.");
      return;
    }

    try {
      const { error } = await supabase
        .from("gallery")
        .insert([{ img_url: imgUrl, alt_text: altText }]);

      if (error) throw error;

      resetForm();
      fetchGallery();
    } catch {
      alert("Error saving gallery item. Check Supabase connection.");
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const itemToDelete = gallery.find((g) => g.id === id);
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;

      // Clean up file from Supabase Storage if hosted in the 'media' bucket
      if (itemToDelete?.img_url && itemToDelete.img_url.includes("/storage/v1/object/public/media/")) {
        try {
          const path = itemToDelete.img_url.split("/storage/v1/object/public/media/")[1];
          if (path) {
            await supabase.storage.from("media").remove([path]);
          }
        } catch {
          // Fail silently on storage cleanup
        }
      }

      setGallery(gallery.filter((g) => g.id !== id));
    } catch {
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
          <span>Add Photo</span>
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
          <div className="bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              Add Photo to Gallery
            </h2>

            <form onSubmit={saveGalleryItem} className="space-y-5">
              {/* Option 1: File Uploader to Supabase Storage */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Upload From Device (Supabase Storage)
                </label>
                <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-electric-blue dark:hover:border-electric-blue rounded-2xl p-4 text-center transition-colors bg-slate-50/50 dark:bg-slate-900/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {uploading ? (
                      <>
                        <Loader2 className="h-8 w-8 text-electric-blue animate-spin" />
                        <span className="text-xs text-slate-400 font-semibold">
                          Uploading to Supabase Storage...
                        </span>
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                          <Check className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-green-500 font-bold">
                          Image uploaded successfully!
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-electric-blue/10 text-electric-blue rounded-full">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Click to select photo
                          </span>
                          <span className="text-[11px] text-slate-400 block font-light">
                            JPG, PNG, WEBP (Max 5MB)
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {uploadWarning && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{uploadWarning}</span>
                </div>
              )}

              {/* Option 2: Direct Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>Image URL / Path *</span>
                </label>
                <input
                  type="text"
                  required
                  value={imgUrl}
                  onChange={(e) => {
                    setImgUrl(e.target.value);
                    setUploadSuccess(false);
                  }}
                  placeholder="e.g. /images/project-industrial.jpg or https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Live Preview */}
              {imgUrl && (
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img
                      src={imgUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                      Selected Asset Preview
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 truncate block font-mono">
                      {imgUrl}
                    </span>
                  </div>
                </div>
              )}

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
          No photo assets stored yet. Click "Add Photo" to upload one.
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
