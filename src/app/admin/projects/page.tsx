"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  Loader2,
  MapPin,
  Tag,
  UploadCloud,
  Check,
  Link as LinkIcon,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: "industrial" | "panels" | "solar" | "automation" | "hvac" | "dg-transformer" | "maintenance";
  location: string;
  description: string;
  img_url: string;
};

const PROJECT_CATEGORIES = [
  { id: "industrial", label: "Industrial Installation" },
  { id: "panels", label: "Panel Fabrication" },
  { id: "solar", label: "Solar Installation" },
  { id: "automation", label: "Automation" },
  { id: "hvac", label: "HVAC Electrical" },
  { id: "dg-transformer", label: "DG & Transformer" },
  { id: "maintenance", label: "Electrical Maintenance" },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Project["category"]>("industrial");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadWarning, setUploadWarning] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch {
      setErrorMsg("Failed to retrieve projects database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setCategory("industrial");
    setLocation("");
    setDescription("");
    setImgUrl("");
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
      const filePath = `projects/${Date.now()}_${cleanFileName}.${fileExt}`;

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
        "Supabase Storage 'media' bucket not accessible. You can paste an image URL manually below."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setLocation(project.location);
    setDescription(project.description || "");
    setImgUrl(project.img_url);
    setUploadSuccess(false);
    setUploadWarning("");
    setIsFormOpen(true);
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !imgUrl) {
      alert("Please fill in all required fields and provide an image.");
      return;
    }

    try {
      const payload = {
        title,
        category,
        location,
        description,
        img_url: imgUrl,
      };

      if (editId) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchProjects();
    } catch {
      alert("Error saving project. Check Supabase connection.");
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const itemToDelete = projects.find((p) => p.id === id);
      const { error } = await supabase.from("projects").delete().eq("id", id);
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

      setProjects(projects.filter((p) => p.id !== id));
    } catch {
      alert("Error deleting project.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Manage Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
            List, update, or remove project showcases from the portfolio section.
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
          <span>Add Project</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Slide-over Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              {editId ? "Edit Project Parameters" : "Create New Project Showcase"}
            </h2>

            <form onSubmit={saveProject} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 100kW Rooftop Solar Installation"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Category Area
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                >
                  {PROJECT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Location / Region *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Newai, Rajasthan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional details about execution scope..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors resize-none"
                />
              </div>

              {/* Device File Uploader */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Upload Project Photo (Supabase Storage)
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
                        <Loader2 className="h-7 w-7 text-electric-blue animate-spin" />
                        <span className="text-xs text-slate-400 font-semibold">
                          Uploading to Supabase Storage...
                        </span>
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <div className="p-1.5 bg-green-500/10 text-green-500 rounded-full">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-green-500 font-bold">
                          Project image uploaded!
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-electric-blue/10 text-electric-blue rounded-full">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Select Project Image from Device
                          </span>
                          <span className="text-[10px] text-slate-400 block font-light">
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

              {/* Direct Image URL */}
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
                  placeholder="e.g. /images/project-solar.jpg or https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                />
              </div>

              {/* Live Preview */}
              {imgUrl && (
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img
                      src={imgUrl}
                      alt="Project Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Selected Photo Preview
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 truncate block font-mono">
                      {imgUrl}
                    </span>
                  </div>
                </div>
              )}

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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid Content List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
          <p className="text-sm text-slate-500">Loading projects database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-500 font-light">
          No projects showcased yet. Click "Add Project" to add one.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Image Preview */}
              <div className="h-44 relative bg-slate-900">
                <img
                  src={item.img_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex space-x-1">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2 bg-[#0F1626]/80 text-white rounded-lg hover:bg-[#0F1626] backdrop-blur-sm"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(item.id)}
                    className="p-2 bg-red-650/80 text-white rounded-lg hover:bg-red-700 backdrop-blur-sm"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-electric-blue uppercase tracking-wider bg-electric-blue/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-0.5">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                    {item.description || "No description provided."}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-3 truncate">
                  Image: {item.img_url}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
