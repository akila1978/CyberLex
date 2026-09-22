import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — CyberLex",
  description: "Terms and conditions governing the access and educational use of CyberLex.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms of Use" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>User Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-8 text-(--foreground)">
          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">1. Acceptance of Terms</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              By accessing, browsing, or using CyberLex, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Use, our Privacy Policy, and our Legal Disclaimer.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">2. Permitted Educational & Research Use</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              CyberLex materials are published under an open educational paradigm. You may reference, cite, and utilize
              our analysis for research, classroom instruction, corporate awareness training, and academic study, provided
              proper attribution is given to CyberLex and the underlying official sources.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">3. Prohibited Misuse & Responsible Research</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              CyberLex content concerning vulnerability disclosure, authorized penetration testing, and ethical hacking
              is provided strictly to educate security professionals and legal teams on compliance boundaries. You must
              not use any material found on this platform to engage in unauthorized system access, cyberattacks, extortion,
              or malicious activities.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">4. Intellectual Property & Primary Law</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Statutory texts, legislative acts, judicial decisions, and government gazettes are public legal records.
              Our proprietary analyses, structural frameworks, comparative matrices, and pedagogical explanations remain
              the intellectual property of CyberLex.
            </p>
          </section>

          <section className="pt-2">
            <h3 className="text-lg font-bold font-heading mb-2">5. Limitation of Liability</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              CyberLex, its operators, contributors, and authors shall not be liable for any direct, indirect, incidental,
              consequential, or punitive damages resulting from your access to or reliance upon any content found on the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
