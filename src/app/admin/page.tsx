import React from "react";
import { createClient } from "@/lib/supabaseServer";
import {
  Cpu,
  FolderKanban,
  Mail,
  MessageSquare,
  Zap,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Disable server cache for live dashboard stats

export default async function AdminDashboard() {
  let servicesCount = 0;
  let projectsCount = 0;
  let enquiriesCount = 0;
  let testimonialsCount = 0;
  let connectionWarning = false;

  try {
    const supabase = await createClient();

    const [sRes, pRes, eRes, tRes] = await Promise.all([
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
    ]);

    servicesCount = sRes.count || 0;
    projectsCount = pRes.count || 0;
    enquiriesCount = eRes.count || 0;
    testimonialsCount = tRes.count || 0;

    if (sRes.error || pRes.error || eRes.error || tRes.error) {
      connectionWarning = true;
    }
  } catch (error) {
    connectionWarning = true;
  }

  const statCards = [
    {
      name: "Total Services",
      count: servicesCount,
      link: "/admin/services",
      icon: <Cpu className="h-6 w-6 text-electric-blue" />,
      desc: "Electrical solutions listed on public page",
    },
    {
      name: "Total Projects",
      count: projectsCount,
      link: "/admin/projects",
      icon: <FolderKanban className="h-6 w-6 text-blue-500" />,
      desc: "Completed & showcased project cards",
    },
    {
      name: "Total Enquiries",
      count: enquiriesCount,
      link: "/admin/enquiries",
      icon: <Mail className="h-6 w-6 text-yellow-500" />,
      desc: "Submissions received from contact forms",
    },
    {
      name: "Total Testimonials",
      count: testimonialsCount,
      link: "/admin/testimonials",
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      desc: "Reviews & five-star customer feedback",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="h-8 w-8 text-electric-blue fill-electric-blue" />
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">
          Welcome to the One8 Electrical Solutions central administration desk.
        </p>
      </div>

      {/* Supabase Connection Alert */}
      {connectionWarning && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Database Setup Notice:</span>
            <p className="text-xs mt-1 font-light leading-relaxed">
              Unable to load statistics from Supabase database. Please check that you have configured your local `.env.local` environment keys and that the appropriate SQL tables are created in your Supabase panel.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="p-6 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  {card.icon}
                </div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {card.count}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {card.name}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-light">
                {card.desc}
              </p>
            </div>
            <Link
              href={card.link}
              className="text-xs font-bold text-electric-blue dark:text-electric-yellow hover:underline mt-6 block"
            >
              Manage Module &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* System Quick Information Panel */}
      <div className="p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Quick Start Instructions
        </h3>
        <ul className="space-y-3 text-sm font-light text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>Use the **Services** module to add, edit, or toggle visibility of the 18+ services dynamically.</li>
          <li>The **Projects** module allows showcasing finished solar and industrial installs using location targets.</li>
          <li>View, filter, or delete feedback entries under the **Enquiries** dashboard.</li>
          <li>Manage dynamic SEO tags (Website title, meta descriptors) under **Settings** to update SEO parameters.</li>
        </ul>
      </div>
    </div>
  );
}
