import type { Metadata } from "next";
import { Gavel, Calendar, Landmark } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Landmark Cyber Law Case Studies — CyberLex",
  description:
    "Explore pivotal judicial precedents shaping cybercrime, digital evidence, algorithmic liability, and privacy worldwide.",
};

interface CaseItem {
  id: string;
  title: string;
  court: string;
  decisionYear: number;
  jurisdiction: string;
  topics: string[];
  impact: string;
  status: string;
}

const fallbackCases: CaseItem[] = [
  {
    id: "van-buren",
    title: "Van Buren v. United States, 141 S. Ct. 1638 (2021)",
    court: "Supreme Court of the United States",
    decisionYear: 2021,
    jurisdiction: "United States",
    topics: ["Ethical Hacking", "CFAA", "Unauthorized Access"],
    impact:
      "Clarified that an individual 'exceeds authorized access' under the CFAA only when accessing information they were not entitled to obtain, resolving fears for security researchers.",
    status: "Precedent",
  },
  {
    id: "schrems-ii",
    title: "Data Protection Commissioner v Facebook Ireland and Maximillian Schrems (Schrems II - C-311/18)",
    court: "Court of Justice of the European Union (CJEU)",
    decisionYear: 2020,
    jurisdiction: "European Union",
    topics: ["Cross-Border Data Transfer", "GDPR", "Privacy Shield"],
    impact:
      "Invalidated the EU-US Privacy Shield framework due to surveillance concerns under US law, mandating supplementary safeguards for Standard Contractual Clauses (SCCs).",
    status: "Precedent",
  },
  {
    id: "google-spain",
    title: "Google Spain SL, Google Inc. v AEPD, Mario Costeja González (C-131/12)",
    court: "Court of Justice of the European Union (CJEU)",
    decisionYear: 2014,
    jurisdiction: "European Union",
    topics: ["Right to be Forgotten", "Privacy", "Search Engines"],
    impact:
      "Established the operational jurisprudence for the 'Right to be Forgotten' (data de-listing) under EU data protection principles.",
    status: "Precedent",
  },
  {
    id: "carpenter",
    title: "Carpenter v. United States, 138 S. Ct. 2206 (2018)",
    court: "Supreme Court of the United States",
    decisionYear: 2018,
    jurisdiction: "United States",
    topics: ["Digital Evidence", "Fourth Amendment", "Cell-Site Location"],
    impact:
      "Held that acquisition of historic cell-site location records (CSLI) is a Fourth Amendment search generally requiring a warrant based on probable cause.",
    status: "Precedent",
  },
];

export default async function CasesPage() {
  let displayCases: CaseItem[] = fallbackCases;
  try {
    const dbCases = await db.caseStudy.findMany({
      orderBy: { decisionYear: "desc" },
    });
    if (dbCases.length > 0) {
      displayCases = dbCases.map((c) => ({
        id: c.id,
        title: c.title,
        court: c.court,
        decisionYear: c.decisionYear,
        jurisdiction: c.jurisdiction,
        topics: [c.status || "Precedent"],
        impact: c.impact,
        status: c.status,
      }));
    }
  } catch (err) {
    console.warn("Falling back to static cases:", err);
  }
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Case Studies" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4">
            <Gavel className="w-3.5 h-3.5" />
            <span>Judicial Precedents & Rulings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Landmark Cyber Law Case Studies
          </h1>
          <p className="text-base text-(--muted-foreground) max-w-2xl leading-relaxed">
            Statutes set statutory rules, but courtroom rulings determine how digital evidence, encryption, unauthorized access,
            and data privacy are applied in practice.
          </p>
        </div>

        <div className="space-y-6">
          {displayCases.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/50 transition-all group"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-(--primary)/10 text-(--primary)">
                  <Landmark className="w-3 h-3 mr-1" />
                  {c.court}
                </span>
                <span className="text-xs text-(--muted-foreground)">•</span>
                <span className="inline-flex items-center text-xs text-(--muted-foreground)">
                  <Calendar className="w-3 h-3 mr-1" />
                  {c.decisionYear}
                </span>
                <span className="text-xs text-(--muted-foreground)">•</span>
                <span className="text-xs font-medium text-(--muted-foreground)">{c.jurisdiction}</span>
              </div>

              <h2 className="text-xl font-bold text-(--foreground) font-heading mb-2 group-hover:text-(--primary) transition-colors">
                {c.title}
              </h2>

              <p className="text-sm text-(--muted-foreground) leading-relaxed mb-4">
                {c.impact}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-(--border-color)">
                <div className="flex flex-wrap gap-1.5">
                  {c.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-(--card-bg) border border-(--border-color) text-(--muted-foreground)"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-(--primary) inline-flex items-center">
                  Verified Judicial Record
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
