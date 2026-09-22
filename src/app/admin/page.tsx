import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-(--foreground) font-heading">
            Editorial Desk Overview
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Monitor article publication workflows, source verification queues, and reader correction requests.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider">
              Published Guides
            </span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-(--foreground) font-heading">18</div>
          <p className="text-[11px] text-(--muted-foreground) mt-1">Across 17 global topics</p>
        </div>

        <div className="p-5 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider">
              Verification Queue
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-(--foreground) font-heading">4</div>
          <p className="text-[11px] text-(--muted-foreground) mt-1">Drafts awaiting gazette check</p>
        </div>

        <div className="p-5 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider">
              Verified Citations
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-(--foreground) font-heading">42</div>
          <p className="text-[11px] text-(--muted-foreground) mt-1">100% primary official sources</p>
        </div>

        <div className="p-5 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider">
              Corrections Inbox
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-(--foreground) font-heading">2</div>
          <p className="text-[11px] text-(--muted-foreground) mt-1">Reader statutory reports</p>
        </div>
      </div>

      {/* Editorial Policy Reminder Callout */}
      <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-(--muted-foreground) leading-relaxed">
        <strong className="text-amber-400 block mb-1 font-heading text-sm">
          Strict Compliance Notice: No Legal Fabrication
        </strong>
        All legal content authored through this CMS must cite official parliamentary acts, government gazettes,
        or court filings. Drafts with unconfirmed statutory sections must remain marked as{" "}
        <span className="font-semibold text-amber-300">Draft — Awaiting Source Verification</span> until certified.
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="p-6 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-(--foreground) font-heading">Recent Articles</h3>
            <Link href="/admin/articles" className="text-xs font-semibold text-(--primary) hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-(--bg-surface) border border-(--border-color) flex items-center justify-between">
              <div>
                <p className="font-semibold text-(--foreground)">Sri Lanka Computer Crimes Act Guide</p>
                <span className="text-[11px] text-(--muted-foreground)">Topic: Cybercrime • 3 Citations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                Published
              </span>
            </div>
            <div className="p-3 rounded-lg bg-(--bg-surface) border border-(--border-color) flex items-center justify-between">
              <div>
                <p className="font-semibold text-(--foreground)">GDPR 72-Hour Breach Reporting Protocol</p>
                <span className="text-[11px] text-(--muted-foreground)">Topic: Data Protection • 2 Citations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400">
                Under Review
              </span>
            </div>
          </div>
        </div>

        {/* Pending Corrections */}
        <div className="p-6 rounded-xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-(--foreground) font-heading">
              Pending Corrections & Audits
            </h3>
            <Link href="/admin/corrections" className="text-xs font-semibold text-(--primary) hover:underline">
              Review Queue &rarr;
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-(--bg-surface) border border-(--border-color)">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-(--foreground)">Sri Lanka PDPA Section 15 Notice</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400">
                  Pending
                </span>
              </div>
              <p className="text-[11px] text-(--muted-foreground)">
                Submitter proposes gazette certification date clarification for Part V commencement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
