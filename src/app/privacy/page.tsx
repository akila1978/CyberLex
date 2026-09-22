import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — CyberLex",
  description: "CyberLex Privacy Policy detailing our minimal data collection, cookie usage, and commitment to user privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy By Design</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Last Updated: January 2026 • Compliant with GDPR, CCPA, and Global Privacy Principles
          </p>
        </div>

        <div className="space-y-8 text-(--foreground)">
          <section className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg)">
            <h2 className="text-xl font-bold font-heading mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Our Core Privacy Principle: Data Minimization</span>
            </h2>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              As a platform dedicated to teaching privacy rights and cyber law, we practice what we teach. CyberLex does
              not sell, rent, monetize, or broker personal data. We collect only what is strictly necessary to deliver
              knowledge and maintain platform security.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">1. Information We Collect</h3>
            <ul className="list-disc pl-5 text-sm text-(--muted-foreground) space-y-2">
              <li>
                <strong className="text-(--foreground)">Local Preferences:</strong> Dark/light mode theme
                selection, stored purely on your client device via localStorage.
              </li>
              <li>
                <strong className="text-(--foreground)">Contact Submissions:</strong> If you voluntarily submit a
                query, editorial correction, or message, we collect your name, email, and provided message content to
                respond.
              </li>
              <li>
                <strong className="text-(--foreground)">Aggregated Telemetry:</strong> Anonymized server logs
                (URL requested, response code, timestamp) used exclusively for operational diagnostics and DDoS mitigation.
              </li>
            </ul>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">2. No Third-Party Tracking Cookies</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              We do not employ cross-site tracking cookies, behavioural ad pixels, or third-party marketing beacons.
            </p>
          </section>

          <section className="border-b border-(--border-color) pb-6">
            <h3 className="text-lg font-bold font-heading mb-2">3. Your Rights Under International Data Protection Laws</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Whether you reside in the European Union (GDPR), California (CCPA/CPRA), the United Kingdom (UK GDPR),
              or Sri Lanka (PDPA No. 9 of 2022), you have the right to request access to, correction of, or deletion of
              any personal data you have directly submitted to us.
            </p>
          </section>

          <section className="pt-2">
            <h3 className="text-lg font-bold font-heading mb-2">4. Contacting Our Data Protection Lead</h3>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              For any privacy inquiries or to exercise your statutory data subject rights, please reach out via our{" "}
              <a href="/contact" className="text-(--primary) hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
