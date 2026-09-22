import Link from "next/link";
import { headers } from "next/headers";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Shield,
  Globe2,
  BookOpen,
  Briefcase,
  BellRing,
  Bookmark,
  HelpCircle,
  FileCode,
} from "lucide-react";
import type { Metadata } from "next";
import { getCurrentAdminSession } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin Editorial Console",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  if (headersList.get("x-admin-login") === "1") {
    return <>{children}</>;
  }

  const session = await getCurrentAdminSession();

  return (
    <div className="min-h-screen bg-(--bg-canvas) flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-(--border-color) bg-(--card-bg) shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo & Badge */}
          <div className="p-6 border-b border-(--border-color) flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-(--primary)" />
              <span className="font-extrabold text-lg text-(--foreground) font-heading">
                CyberLex
              </span>
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-(--primary)/10 text-(--primary) border border-(--primary)/20">
              CMS
            </span>
          </div>

          {/* User Profile Summary */}
          {session && (
            <div className="px-5 py-3 border-b border-(--border-color) bg-(--bg-surface)/40 text-xs">
              <div className="font-bold text-(--foreground) truncate">{session.name || "Editorial Admin"}</div>
              <div className="text-[11px] text-(--muted-foreground) truncate">{session.email}</div>
              <div className="mt-1 inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {session.role}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-medium max-h-[calc(100vh-230px)] overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-(--muted-foreground)">
              Core Editorial
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-(--primary)" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/articles"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Articles & Guides</span>
            </Link>

            <Link
              href="/admin/corrections"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Corrections Queue</span>
            </Link>

            <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-(--muted-foreground)">
              Legal Knowledge Base
            </div>

            <Link
              href="/admin/countries"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span>Country Jurisdictions</span>
            </Link>

            <Link
              href="/admin/glossary"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Glossary & Explorer</span>
            </Link>

            <Link
              href="/admin/cases"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <Briefcase className="w-4 h-4 text-rose-400" />
              <span>Landmark Cases</span>
            </Link>

            <Link
              href="/admin/updates"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <BellRing className="w-4 h-4 text-purple-400" />
              <span>Regulatory Updates</span>
            </Link>

            <Link
              href="/admin/resources"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <Bookmark className="w-4 h-4 text-blue-400" />
              <span>Curated Resources</span>
            </Link>

            <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-(--muted-foreground)">
              Interactive Learning
            </div>

            <Link
              href="/admin/quiz"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Quiz Questions</span>
            </Link>

            <Link
              href="/admin/scenarios"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
            >
              <FileCode className="w-4 h-4 text-orange-400" />
              <span>Scenario Guides</span>
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-(--border-color) space-y-1 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--bg-surface) transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-(--border-color) bg-(--card-bg) px-6 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-(--muted-foreground)">
            CyberLex Editorial Management Console
          </h2>
          <div className="flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-(--muted-foreground)">Live MySQL Connection</span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
