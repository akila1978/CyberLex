import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowRight, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn",
  description: "Learn cyber law fundamentals through structured guides and educational modules.",
};

const modules = [
  { number: "01", title: "What Is Cyber Law?", description: "Introduction to the legal frameworks governing digital activity.", readTime: "8 min", href: "/learn/what-is-cyber-law" },
  { number: "02", title: "Cybercrime Explained", description: "Understanding computer offences, hacking, and digital fraud.", readTime: "12 min", href: "/learn/cybercrime-explained" },
  { number: "03", title: "Privacy", description: "The right to privacy in the digital age and its legal protections.", readTime: "10 min", href: "/learn/privacy" },
  { number: "04", title: "Data Protection", description: "Personal data rights, GDPR, and data protection principles.", readTime: "15 min", href: "/learn/data-protection" },
  { number: "05", title: "Digital Evidence", description: "Electronic records, forensics, chain of custody, and admissibility.", readTime: "9 min", href: "/learn/digital-evidence" },
  { number: "06", title: "Electronic Transactions", description: "Legal validity of e-signatures, e-contracts, and digital records.", readTime: "7 min", href: "/learn/electronic-transactions" },
  { number: "07", title: "Intellectual Property", description: "Copyright, software licensing, and IP in the digital world.", readTime: "10 min", href: "/learn/intellectual-property" },
  { number: "08", title: "Ethical Hacking & Authorization", description: "Legal boundaries of security testing and responsible disclosure.", readTime: "11 min", href: "/learn/ethical-hacking-authorization" },
  { number: "09", title: "Social Media & the Law", description: "Harassment, impersonation, defamation, and platform regulation.", readTime: "8 min", href: "/learn/social-media-law" },
  { number: "10", title: "International Cybercrime", description: "Treaties, mutual legal assistance, and cross-border cooperation.", readTime: "9 min", href: "/learn/international-cybercrime" },
  { number: "11", title: "Cybersecurity Compliance", description: "Governance, risk management, and regulatory frameworks.", readTime: "12 min", href: "/learn/cybersecurity-compliance" },
  { number: "12", title: "AI & Emerging Technology", description: "AI regulation, deepfakes, and the future of cyber law.", readTime: "10 min", href: "/learn/ai-emerging-technology" },
];

export default function LearnPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-(--text-dim) mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-(--text-primary) transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-(--text-primary)">Learn</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-accent-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-(--text-primary)" style={{ fontFamily: "var(--font-heading)" }}>
                Cyber Law Foundations
              </h1>
              <p className="text-sm text-(--text-muted)">12 modules • Beginner to intermediate</p>
            </div>
          </div>

          <p className="text-(--text-muted) leading-relaxed">
            A structured learning path covering the essential areas of cyber law. Each module provides clear explanations, real-world examples, key terms, and links to deeper reading. Start from the beginning or jump to any module.
          </p>
        </div>

        {/* Module List */}
        <div className="space-y-3">
          {modules.map((mod) => (
            <Link
              key={mod.number}
              href={mod.href}
              className="group flex items-center gap-5 bg-(--bg-surface) border border-(--border-color) rounded-xl p-5 hover:border-(--border-color-hover) transition-all duration-200"
            >
              <span
                className="text-2xl font-extrabold text-(--text-dim) group-hover:text-accent-blue transition-colors w-10 text-center shrink-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {mod.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-(--text-primary) mb-0.5 group-hover:text-accent-blue transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {mod.title}
                </h3>
                <p className="text-sm text-(--text-muted)">{mod.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:flex items-center gap-1 text-xs text-(--text-dim)">
                  <Clock className="w-3 h-3" />
                  {mod.readTime}
                </span>
                <ArrowRight className="w-4 h-4 text-(--text-dim) group-hover:text-accent-blue transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
