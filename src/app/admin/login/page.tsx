"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please verify your credentials.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      // Brief timeout to display verified state before transition
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 600);
    } catch (err) {
      console.error("Login request error:", err);
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-canvas) flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-(--primary)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-(--muted-foreground) hover:text-(--foreground) transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to CyberLex Public Site</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-(--primary)/10 border border-(--primary)/20 mb-4 shadow-inner">
            <Shield className="w-8 h-8 text-(--primary)" />
          </div>
          <h1 className="text-2xl font-extrabold text-(--foreground) tracking-tight font-heading">
            Editorial Management Console
          </h1>
          <p className="mt-2 text-xs text-(--muted-foreground) max-w-xs mx-auto">
            Authorized access only for verified legal researchers, editors, and platform administrators.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-(--card-bg) py-8 px-6 sm:px-8 border border-(--border-color) rounded-2xl shadow-xl backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div className="font-semibold">Credentials verified. Accessing Editorial Console...</div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-(--foreground) mb-2"
              >
                Editorial Account Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-(--muted-foreground)">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@cyberlex.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) placeholder:text-(--muted-foreground)/60 focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-(--foreground) mb-2"
              >
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-(--muted-foreground)">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) placeholder:text-(--muted-foreground)/60 focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl border border-transparent shadow-sm text-sm font-bold text-white bg-(--primary) hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--primary) transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Access Console</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Warning Footer */}
        <p className="mt-6 text-center text-[11px] text-(--muted-foreground)">
          Protected by CyberLex Security Layer. Unauthorized access attempts are monitored and recorded.
        </p>
      </div>
    </div>
  );
}
