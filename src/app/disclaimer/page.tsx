import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Legal Disclaimer — CyberLex",
  description:
    "Official legal disclaimer regarding educational purpose, non-formation of attorney-client relationship, and jurisdiction variations.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Disclaimer" }]} className="mb-8" />

        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Important Legal Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Legal Disclaimer
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Last Updated: January 2026 • Effective Worldwide
          </p>
        </div>

        {/* Primary Callout */}
        <div className="p-6 rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 mb-10">
          <div className="flex items-start space-x-4">
            <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-(--foreground) mb-2 font-heading">
                CyberLex Is Not a Law Firm and Does Not Provide Legal Advice
              </h2>
              <p className="text-sm text-(--muted-foreground) leading-relaxed">
                The content published across CyberLex—including articles, interactive scenarios, comparative tables,
                A–Z summaries, and automated responses from LexGuide—is provided solely for general educational,
                scholarly, and informational purposes.
              </p>
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-(--foreground)">
          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-xl font-bold font-heading mb-3">1. No Attorney-Client Relationship</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Your access to or use of CyberLex, or transmission of information to or from CyberLex via email or forms,
              does not create an attorney-client, solicitor-client, or fiduciary relationship between you and CyberLex,
              its authors, editors, or contributors.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-xl font-bold font-heading mb-3">2. Rapidly Changing Legal Landscape</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Cyber law, data protection regulations, and digital jurisprudence are constantly evolving. While we make
              every reasonable effort to verify primary sources and date-stamp revisions, laws differ dramatically by
              jurisdiction, and statutes or judicial interpretations may have changed since publication.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-xl font-bold font-heading mb-3">3. Necessity of Qualified Counsel</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              You must not act, or refrain from acting, on the basis of any content included on CyberLex without seeking
              appropriate legal or professional advice on the particular facts and circumstances at issue from an attorney
              licensed in your relevant jurisdiction.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-xl font-bold font-heading mb-3">4. Incident Response & Active Breaches</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Guides concerning ransomware, data breaches, or cyber extortion are educational frameworks. If your
              organization is experiencing an active cyber incident, immediately engage accredited incident responders,
              breach counsel, and report to your jurisdiction&apos;s national CERT or law enforcement authority.
            </p>
          </section>

          <section className="pt-2">
            <h3 className="text-xl font-bold font-heading mb-3">5. Editorial Corrections</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed mb-4">
              If you identify an inaccurate statutory citation, repealed provision, or outdated case law, please submit
              an official correction notice to our editorial team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-(--primary) hover:underline"
            >
              Submit a correction or feedback &rarr;
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
