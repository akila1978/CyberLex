"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LegalInstrumentBadge, StatusBadge } from "@/components/ui/badge";

// Initial knowledge index for public search (combines topics, statutes, and key concepts)
const searchableIndex = [
  {
    id: "1",
    title: "Computer Crimes Act No. 24 of 2007 (Sri Lanka)",
    type: "STATUTE",
    category: "Cybercrime",
    country: "Sri Lanka",
    countryCode: "LK",
    instrument: "LAW" as const,
    status: "CURRENT" as const,
    url: "/countries/sri-lanka",
    snippet:
      "Primary cybercrime legislation in Sri Lanka criminalizing unauthorized access, computer-related extortion, and unauthorized modification of data.",
  },
  {
    id: "2",
    title: "Personal Data Protection Act No. 9 of 2022 (Sri Lanka)",
    type: "STATUTE",
    category: "Data Protection",
    country: "Sri Lanka",
    countryCode: "LK",
    instrument: "LAW" as const,
    status: "CURRENT" as const,
    url: "/countries/sri-lanka",
    snippet:
      "Comprehensive data privacy framework establishing data subject rights, obligations of controllers/processors, and the Data Protection Authority (DPA).",
  },
  {
    id: "3",
    title: "Budapest Convention on Cybercrime",
    type: "TREATY",
    category: "International Cooperation",
    country: "International",
    instrument: "TREATY" as const,
    status: "CURRENT" as const,
    url: "/topics/cybercrime",
    snippet:
      "First international treaty seeking to address Internet and computer crime by harmonizing national laws and improving investigative techniques.",
  },
  {
    id: "4",
    title: "General Data Protection Regulation (GDPR - EU 2016/679)",
    type: "REGULATION",
    category: "Privacy & Data Protection",
    country: "European Union",
    instrument: "REGULATION" as const,
    status: "CURRENT" as const,
    url: "/topics/privacy",
    snippet:
      "The benchmark regulation on information privacy in the European Union and European Economic Area with global extraterritorial reach.",
  },
  {
    id: "5",
    title: "EU Artificial Intelligence Act (EU 2024/1689)",
    type: "REGULATION",
    category: "AI & Law",
    country: "European Union",
    instrument: "REGULATION" as const,
    status: "CURRENT" as const,
    url: "/topics/ai-law",
    snippet:
      "First comprehensive regulatory framework on artificial intelligence globally, classifying AI systems according to risk tiers.",
  },
  {
    id: "6",
    title: "CFAA — Computer Fraud and Abuse Act (18 U.S.C. § 1030)",
    type: "STATUTE",
    category: "Cybercrime",
    country: "United States",
    instrument: "LAW" as const,
    status: "CURRENT" as const,
    url: "/topics/cybercrime",
    snippet:
      "US federal statute penalizing unauthorized computer access, data theft, and system disruption, as clarified by Van Buren v. United States.",
  },
  {
    id: "7",
    title: "Ethical Hacking: CFAA Authorization Boundaries Post-Van Buren",
    type: "ANALYSIS",
    category: "Ethical Hacking",
    country: "United States",
    instrument: "CASE_LAW" as const,
    status: "CURRENT" as const,
    url: "/topics/ethical-hacking",
    snippet:
      "Legal boundaries distinguishing legitimate security vulnerability research from unauthorized access under US and international legal precedents.",
  },
  {
    id: "8",
    title: "Digital Evidence Admissibility & Chain of Custody (ISO/IEC 27037)",
    type: "STANDARD",
    category: "Digital Evidence",
    country: "International",
    instrument: "STANDARD" as const,
    status: "CURRENT" as const,
    url: "/topics/digital-evidence",
    snippet:
      "Guidelines for identification, collection, acquisition, and preservation of digital evidence to satisfy court evidentiary requirements.",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredResults = useMemo(() => {
    return searchableIndex.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.snippet.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.country.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Global Legal Search" }]} className="mb-8" />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Search Legal Knowledge Base
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Explore cyber statutes, treaties, regulations, and judicial analyses indexed across jurisdictions.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--muted-foreground)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by law, country (e.g., Sri Lanka, EU, US), topic (e.g. GDPR, ransomware, evidence)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-(--border-color) bg-(--card-bg) text-(--foreground) placeholder:text-(--muted-foreground)/60 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-(--primary)"
            autoFocus
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-semibold text-(--muted-foreground) mr-1">Filter Topic:</span>
          {["ALL", "Cybercrime", "Data Protection", "Privacy", "Digital Evidence", "AI & Law", "Ethical Hacking"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-(--primary) text-white"
                    : "border border-(--border-color) bg-(--card-bg) text-(--muted-foreground) hover:text-(--foreground)"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-(--border-color)">
          <p className="text-xs font-semibold text-(--muted-foreground)">
            Showing <span className="text-(--foreground)">{filteredResults.length}</span> verified legal records
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-16 p-8 border border-dashed border-(--border-color) rounded-2xl bg-(--card-bg)">
              <Search className="w-10 h-10 text-(--muted-foreground) mx-auto mb-3" />
              <h3 className="text-base font-bold text-(--foreground) mb-1">No matches found</h3>
              <p className="text-xs text-(--muted-foreground) max-w-sm mx-auto">
                No indexed legal instruments match your query. Try searching for broader terms like &quot;privacy&quot;, &quot;evidence&quot;, &quot;Sri Lanka&quot;, or &quot;treaty&quot;.
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="block p-5 rounded-xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/50 transition-all group"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <LegalInstrumentBadge instrument={item.instrument} size="sm" />
                  <StatusBadge status={item.status} size="sm" />
                  <span className="text-xs text-(--muted-foreground)">•</span>
                  <span className="text-xs font-medium text-(--muted-foreground)">{item.country}</span>
                  <span className="text-xs text-(--muted-foreground)">•</span>
                  <span className="text-xs font-medium text-(--primary)">{item.category}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-(--foreground) group-hover:text-(--primary) transition-colors mb-1.5 flex items-center justify-between font-heading">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-(--primary) shrink-0 ml-2" />
                </h3>
                <p className="text-sm text-(--muted-foreground) leading-relaxed">
                  {item.snippet}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
