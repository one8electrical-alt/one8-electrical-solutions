"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Cpu,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  category: "power" | "green" | "control";
  desc: string;
  icon_name: string;
  active: boolean;
};

const CATEGORIES = [
  { id: "power", label: "Power & Substations" },
  { id: "green", label: "Green Energy & Audits" },
  { id: "control", label: "Automation & Panels" },
];

const AVAILABLE_ICONS = [
  "Home",
  "Factory",
  "Wrench",
  "Cpu",
  "Zap",
  "Wind",
  "Thermometer",
  "Sun",
  "Gauge",
  "Shield",
  "Droplet",
  "FileCheck",
  "Flame",
  "Binary",
  "Layers",
  "Network",
  "Lightbulb",
  "FileSpreadsheet",
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"power" | "green" | "control">("power");
  const [desc, setDesc] = useState("");
  const [iconName, setIconName] = useState("Zap");
  const [active, setActive] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err: any) {
      setErrorMsg("Failed to retrieve services database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setCategory("power");
    setDesc("");
    setIconName("Zap");
    setActive(true);
    setIsFormOpen(false);
  };

  const handleEditClick = (service: Service) => {
    setEditId(service.id);
    setTitle(service.title);
    setCategory(service.category);
    setDesc(service.desc);
    setIconName(service.icon_name || "Zap");
    setActive(service.active);
    setIsFormOpen(true);
  };

  const saveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        title,
        category,
        desc,
        icon_name: iconName,
        active,
      };

      if (editId) {
        const { error } = await supabase
          .from("services")
          .update(payload)
          .eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchServices();
    } catch (err: any) {
      alert("Error saving service card. Check Supabase connection.");
    }
  };

  const toggleServiceActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ active: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      setServices(
        services.map((s) => (s.id === id ? { ...s, active: !currentStatus } : s))
      );
    } catch (err: any) {
      alert("Error updating service status.");
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      setServices(services.filter((s) => s.id !== id));
    } catch (err: any) {
      alert("Error deleting service.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Manage Services
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
            Add, update, or remove service cards displayed on the main page.
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
          <span>Add Service</span>
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
          <div className="bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              {editId ? "Edit Service Parameters" : "Create New Service Card"}
            </h2>

            <form onSubmit={saveService} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Domestic Wiring"
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
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Summarize the service parameters..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors resize-none"
                />
              </div>

              {/* Icon dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Choose Lucide Icon
                </label>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-electric-blue text-sm transition-colors"
                >
                  {AVAILABLE_ICONS.map((ico) => (
                    <option key={ico} value={ico}>
                      {ico}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Switch */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded border-slate-350 dark:border-slate-800 text-electric-blue focus:ring-electric-blue"
                />
                <label htmlFor="active" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Service card is active (visible to public)
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
                  Save Service
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
          <p className="text-sm text-slate-500">Loading services database...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-500 font-light">
          No services created yet. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border bg-white dark:bg-brand-card flex flex-col justify-between transition-opacity ${
                item.active ? "border-slate-200 dark:border-slate-800" : "border-slate-200 opacity-60"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-electric-blue uppercase tracking-wider bg-electric-blue/10 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => toggleServiceActive(item.id, item.active)}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        item.active ? "text-green-500" : "text-slate-400"
                      }`}
                      title={item.active ? "Deactivate" : "Activate"}
                    >
                      {item.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteService(item.id)}
                      className="p-1.5 text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="text-[10px] text-slate-400 font-semibold border-t border-slate-100 dark:border-slate-850 pt-3 flex items-center justify-between">
                <span>Icon: {item.icon_name}</span>
                <span className={`inline-block w-2 h-2 rounded-full ${item.active ? "bg-green-500" : "bg-red-400"}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
