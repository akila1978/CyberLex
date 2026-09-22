import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Scale, CheckCircle2, Globe, FileCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "About CyberLex — Mission & Editorial Standards",
  description:
    "Learn about CyberLex's mission to make cyber law understandable worldwide, our verification methodologies, and editorial principles.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} className="mb-8" />

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-(--primary)/10 text-(--primary) border border-(--primary)/20 mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Open Legal Knowledge Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--foreground) tracking-tight font-heading mb-6">
            Demystifying the Laws of the Digital World
          </h1>
          <p className="text-lg sm:text-xl text-(--muted-foreground) leading-relaxed max-w-3xl">
            CyberLex is an authoritative, independent global knowledge platform created to bridge the widening gap
            between rapidly evolving digital technology and complex cyber laws across jurisdictions.
          </p>
        </div>

        {/* Mission Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-(--primary)/10 text-(--primary) flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-(--foreground) mb-2 font-heading">
              Plain-Language Clarity
            </h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              We translate dense statutes, judicial precedents, and international conventions into structured,
              practical insights that non-lawyers and engineers can actually act upon.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-(--foreground) mb-2 font-heading">
              Rigorous Source Verification
            </h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Every principle, section, and legal instrument references primary official gazettes, court filings,
              or treaty depositories. We never fabricate legal facts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-(--foreground) mb-2 font-heading">
              Global Multi-Jurisdiction
            </h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Cybercrime and cloud infrastructure cross borders effortlessly. We cover national legislations, regional
              directives (e.g. EU NIS2, GDPR), and international treaties.
            </p>
          </div>
        </div>

        {/* Editorial Standards */}
        <div className="border border-(--border-color) rounded-2xl p-8 bg-(--card-bg) mb-16">
          <h2 className="text-2xl font-bold text-(--foreground) mb-4 font-heading">
            Our Strict Editorial Policy
          </h2>
          <p className="text-(--muted-foreground) text-sm mb-6 leading-relaxed">
            Legal accuracy is paramount. Because legal misinterpretation can lead to liability or compromised rights,
            CyberLex enforces strict editorial standards:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-(--foreground)">Primary Source Requirement</h4>
                <p className="text-xs text-(--muted-foreground) mt-0.5">
                  All analysis must cite official gazettes, parliamentary acts, treaties, or verified judicial rulings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-(--foreground)">Transparent Status Demarcation</h4>
                <p className="text-xs text-(--muted-foreground) mt-0.5">
                  Pending amendments, unverified drafts, and repealed statutes are explicitly badged to prevent outdated reliance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-(--foreground)">No Legal Advice Substitute</h4>
                <p className="text-xs text-(--muted-foreground) mt-0.5">
                  Content is educational and research-oriented. Users are consistently directed to qualified legal counsel for factual disputes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 border-t border-(--border-color)">
          <p className="text-sm text-(--muted-foreground) mb-4">
            Have questions, feedback, or corrections to propose?
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-(--primary) text-white text-sm font-semibold hover:bg-(--primary)/90 transition-colors"
            >
              Contact Editorial Team
            </Link>
            <Link
              href="/disclaimer"
              className="px-5 py-2.5 rounded-lg border border-(--border-color) text-(--foreground) text-sm font-semibold hover:bg-(--card-bg) transition-colors"
            >
              Read Full Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
