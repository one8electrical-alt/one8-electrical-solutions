"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Zap, Lock, Mail, AlertTriangle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          window.location.href = "/admin";
        }
      } catch {
        // Fail silent
      }
    };
    checkUser();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid login credentials. Please check your email and password.");
        setLoading(false);
        return;
      }

      if (data?.session || data?.user) {
        window.location.href = "/admin";
      } else {
        setErrorMsg("Failed to establish session. Please verify your Supabase credentials.");
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B19] px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-yellow/5 rounded-full filter blur-3xl" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#0F1626]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
          
          {/* Logo Section */}
          <div className="text-center">
            <div className="inline-flex bg-electric-blue p-3 rounded-2xl shadow-lg shadow-electric-blue/30 mb-4 animate-pulse">
              <Zap className="h-8 w-8 text-electric-yellow fill-electric-yellow" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider">
              ONE8 ELECTRICAL
            </h1>
            <p className="text-xs text-electric-blue font-bold tracking-widest uppercase mt-1">
              Admin Portal Login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@one8electrical.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#070B19] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-[#070B19] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue text-sm transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-electric-blue text-white py-3.5 rounded-xl font-bold tracking-wide shadow-lg shadow-electric-blue/30 hover:bg-blue-600 transition-all disabled:opacity-50 text-sm"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-[11px] text-slate-500">
            Protected Admin Desk &bull; One8 Electrical Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
