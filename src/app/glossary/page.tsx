"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookOpen, Search, Scale } from "lucide-react";

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  statutoryContext: string;
}

const terms: GlossaryTerm[] = [
  {
    term: "Adequacy Decision",
    category: "Data Protection",
    definition:
      "A formal finding by a data protection authority (such as the European Commission under GDPR Art. 45) that a third country provides an essentially equivalent level of personal data protection.",
    statutoryContext: "GDPR Article 45; Sri Lanka PDPA Section 26",
  },
  {
    term: "Chain of Custody",
    category: "Digital Evidence",
    definition:
      "A meticulous, unbroken chronological paper trail recording the receipt, custody, transfer, analysis, and disposition of digital materials to prove evidence integrity in court.",
    statutoryContext: "ISO/IEC 27037; Electronic Transactions Act No. 19 of 2006",
  },
  {
    term: "Computer Fraud and Abuse Act (CFAA)",
    category: "Cybercrime",
    definition:
      "The primary United States federal anti-hacking statute (18 U.S.C. § 1030) criminalizing intentional unauthorized access or exceeding authorized access to protected computers.",
    statutoryContext: "18 U.S.C. § 1030; Van Buren v. United States (2021)",
  },
  {
    term: "Coordinated Vulnerability Disclosure (CVD)",
    category: "Ethical Hacking",
    definition:
      "A formal process wherein security researchers disclose system vulnerabilities directly to the vendor, giving them reasonable time to patch before making technical details public.",
    statutoryContext: "ISO/IEC 29147; CERT vulnerability policies",
  },
  {
    term: "Data Controller",
    category: "Data Protection",
    definition:
      "A natural or legal person, public authority, or agency which, alone or jointly with others, determines the purposes and means of processing personal data.",
    statutoryContext: "GDPR Article 4(7); Sri Lanka PDPA Section 44",
  },
  {
    term: "Extraterritorial Jurisdiction",
    category: "Jurisdiction & Treaties",
    definition:
      "The legal competence of a state to apply its national laws beyond its physical territorial borders (e.g. GDPR targeting foreign sites processing EU residents' data).",
    statutoryContext: "GDPR Article 3(2); Budapest Convention Article 22",
  },
  {
    term: "MLAT (Mutual Legal Assistance Treaty)",
    category: "International Cooperation",
    definition:
      "An agreement between two or more countries for gathering and exchanging information in an effort to enforce public or criminal laws, including cross-border digital evidence requests.",
    statutoryContext: "Budapest Convention Chapter III; UNODC frameworks",
  },
  {
    term: "Right to be Forgotten",
    category: "Privacy",
    definition:
      "The statutory right of an individual to request that search engines or data controllers de-index or erase outdated, inaccurate, or excessive personal information.",
    statutoryContext: "GDPR Article 17; Google Spain (CJEU 2014)",
  },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = useMemo(() => {
    return terms.filter((t) => {
      const matchesSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase()) ||
        t.statutoryContext.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory === "ALL" || t.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Glossary of Legal Terms" }]} className="mb-8" />

        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cyber Law Nomenclature</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Cyber Law Glossary
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Concise, authoritative definitions of key concepts in cyber jurisprudence, data privacy, and international digital regulation.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search legal terms or definitions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--card-bg) text-sm text-(--foreground) placeholder:text-(--muted-foreground)/60 focus:outline-none focus:ring-2 focus:ring-(--primary)"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {["ALL", "Data Protection", "Cybercrime", "Digital Evidence", "Ethical Hacking"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === c
                    ? "bg-(--primary) text-white"
                    : "border border-(--border-color) bg-(--card-bg) text-(--muted-foreground) hover:text-(--foreground)"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.term}
              className="p-5 rounded-xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-(--primary)/10 text-(--primary)">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-(--foreground) font-heading mb-2">
                  {item.term}
                </h3>
                <p className="text-xs text-(--muted-foreground) leading-relaxed mb-4">
                  {item.definition}
                </p>
              </div>
              <div className="pt-3 border-t border-(--border-color)/60 text-[11px] text-(--muted-foreground) flex items-center">
                <Scale className="w-3.5 h-3.5 mr-1 text-(--primary)" />
                <span>Context: <span className="text-(--foreground) font-medium">{item.statutoryContext}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
