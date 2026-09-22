import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Cookie, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy — CyberLex",
  description: "Information regarding CyberLex's zero-tracking cookie approach.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Cookie className="w-3.5 h-3.5" />
            <span>Privacy Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Last Updated: January 2026 • Strict Data Minimization
          </p>
        </div>

        <div className="space-y-6 text-(--foreground)">
          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg)">
            <h2 className="text-lg font-bold font-heading mb-2 flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
              <span>We Do Not Use Tracking Cookies</span>
            </h2>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              CyberLex does not use third-party analytics cookies, advertising tracking pixels, or cross-domain fingerprinting.
              We only use browser <code className="px-1.5 py-0.5 rounded bg-(--bg-surface) text-xs text-(--foreground)">localStorage</code> to remember your theme preference (Dark or Light mode).
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg)">
            <h3 className="text-base font-bold font-heading mb-2">Essential Functionality</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              When administrators log in to the administrative CMS, an encrypted HTTP-only session cookie is set to secure the session. No personal profile data or tracking identifiers are shared with outside vendors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
