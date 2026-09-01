"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Zap,
  LayoutDashboard,
  Cpu,
  FolderKanban,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let mounted = true;

    // 1. Initial Session Check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        if (session) {
          setIsAuthenticated(true);
          if (isLoginPage) {
            router.replace("/admin");
          }
        } else {
          setIsAuthenticated(false);
          if (!isLoginPage) {
            router.replace("/admin/login");
          }
        }
      } catch (err) {
        if (!mounted) return;
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      } finally {
        if (mounted) {
          setAuthChecking(false);
        }
      }
    };

    checkSession();

    // 2. Realtime Auth State Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (!mounted) return;
      if (session) {
        setIsAuthenticated(true);
        if (isLoginPage) {
          router.replace("/admin");
        }
      } else {
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      }
      setAuthChecking(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.replace("/admin/login");
  };

  // If on login page, render login page directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Auth checking loader for all protected admin views
  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070B19] text-white space-y-4">
        <div className="bg-electric-blue/15 p-4 rounded-2xl ring-1 ring-electric-blue/30 animate-pulse">
          <Zap className="h-8 w-8 text-electric-yellow fill-electric-yellow" />
        </div>
        <div className="flex items-center space-x-2 text-slate-400 text-sm font-light">
          <Loader2 className="h-4 w-4 animate-spin text-electric-blue" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, guard against flashing content
  if (!isAuthenticated) {
    return null;
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Services", href: "/admin/services", icon: <Cpu className="h-5 w-5" /> },
    { name: "Projects", href: "/admin/projects", icon: <FolderKanban className="h-5 w-5" /> },
    { name: "Enquiries", href: "/admin/enquiries", icon: <Mail className="h-5 w-5" /> },
    { name: "Testimonials", href: "/admin/testimonials", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Gallery", href: "/admin/gallery", icon: <ImageIcon className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-[#070B19] text-slate-800 dark:text-slate-200 transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F1626] text-white border-r border-white/5 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Head */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="bg-electric-blue p-1.5 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-electric-yellow fill-electric-yellow" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold tracking-wider">ONE8 CONTROL</span>
                <span className="text-[8px] font-bold text-electric-blue tracking-widest uppercase">Admin Desk</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    active
                      ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-[#0a0f1c]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Globe className="h-4 w-4 text-electric-blue" />
            <span>Go to Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-[#0F1626] text-white p-4 flex items-center justify-between border-b border-white/5">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="bg-electric-blue p-1.5 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-electric-yellow fill-electric-yellow" />
            </div>
            <span className="text-sm font-bold tracking-wider">ONE8 CONTROL</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-md text-slate-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
