import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Scale } from "lucide-react";
import { countries } from "@/config/site";

export const metadata: Metadata = {
  title: "Countries",
  description: "Explore cyber law frameworks across jurisdictions including Sri Lanka, EU, US, UK, India, Singapore, and Australia.",
};

const countryDetails: Record<string, {
  legalSystem: string;
  highlights: string[];
  lastUpdated: string;
}> = {
  LK: {
    legalSystem: "Mixed legal system (Roman-Dutch civil law, English common law, customary law)",
    highlights: ["Computer Crime Act No. 24 of 2007", "Personal Data Protection Act No. 9 of 2022", "Electronic Transactions Act No. 19 of 2006"],
    lastUpdated: "Under review",
  },
  EU: {
    legalSystem: "Supranational legal framework",
    highlights: ["GDPR", "NIS2 Directive", "EU AI Act", "Digital Services Act"],
    lastUpdated: "Under review",
  },
  US: {
    legalSystem: "Federal and state common law system",
    highlights: ["Computer Fraud and Abuse Act", "State privacy laws", "COPPA", "ECPA"],
    lastUpdated: "Under review",
  },
  GB: {
    legalSystem: "Common law",
    highlights: ["Computer Misuse Act 1990", "UK GDPR", "Data Protection Act 2018", "Online Safety Act 2023"],
    lastUpdated: "Under review",
  },
  IN: {
    legalSystem: "Common law",
    highlights: ["Information Technology Act 2000", "IT Rules 2021", "Digital Personal Data Protection Act 2023"],
    lastUpdated: "Under review",
  },
  SG: {
    legalSystem: "Common law",
    highlights: ["Computer Misuse Act", "PDPA", "Cybersecurity Act 2018"],
    lastUpdated: "Under review",
  },
  AU: {
    legalSystem: "Common law",
    highlights: ["Criminal Code Act 1995 (cybercrime)", "Privacy Act 1988", "Security of Critical Infrastructure Act"],
    lastUpdated: "Under review",
  },
};

export default function CountriesPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <nav className="text-sm text-(--text-dim) mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-(--text-primary) transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-(--text-primary)">Countries</span>
          </nav>
          <h1
            className="text-4xl font-extrabold text-(--text-primary) mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Country Law Explorer
          </h1>
          <p className="text-lg text-(--text-muted) leading-relaxed">
            Explore cyber law frameworks by jurisdiction. Each country profile covers cybercrime legislation, data protection, electronic transactions, digital evidence, and reporting authorities.
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countries.map((country) => {
            const details = countryDetails[country.code];
            const slug = country.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={country.code}
                href={`/countries/${slug}`}
                className="group bg-(--bg-surface) border border-(--border-color) rounded-xl p-6 lg:p-8 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>
                    {country.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2
                        className="text-xl font-bold text-(--text-primary) group-hover:text-accent-blue transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {country.name}
                      </h2>
                      <span className="text-xs text-(--text-dim) bg-(--bg-secondary) px-2 py-0.5 rounded-full">
                        {country.region}
                      </span>
                    </div>
                    {details && (
                      <>
                        <p className="text-sm text-(--text-muted) mb-3">
                          {details.legalSystem}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {details.highlights.map((h) => (
                            <span key={h} className="px-2 py-0.5 text-xs font-medium rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-color)">
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-(--text-dim)">
                            Status: {details.lastUpdated}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity">
                            View profile <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-(--border-color) pt-6 mt-12">
          <div className="flex items-start gap-3">
            <Scale className="w-4 h-4 text-(--text-dim) mt-0.5 shrink-0" />
            <p className="text-xs text-(--text-dim) leading-relaxed max-w-3xl">
              Country profiles provide educational overviews, not comprehensive legal analysis. Laws differ across jurisdictions and change over time. Always verify current legislation through official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
