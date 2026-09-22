import type { Metadata } from "next";
import { FolderGit2, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Official Cyber Law Repositories & Resources — CyberLex",
  description:
    "Curated directory of primary legal databases, treaty depositories, CERT directives, and official legislative gazettes worldwide.",
};

const resourceCategories = [
  {
    title: "International Treaties & Conventions",
    description: "Official depositories of multilateral cyber conventions and human rights treaties.",
    links: [
      {
        name: "Council of Europe Budapest Convention Portal",
        url: "https://www.coe.int/en/web/cybercrime/the-budapest-convention",
        desc: "Full treaty text, signatory status, and explanatory reports for ETS No. 185.",
      },
      {
        name: "UNODC Cybercrime Repository",
        url: "https://sherloc.unodc.org/cld/en/v3/sherloc/cybercrime.html",
        desc: "United Nations database of national cybercrime laws, jurisprudence, and international cooperation instruments.",
      },
      {
        name: "ITU Global Cybersecurity Index (GCI)",
        url: "https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx",
        desc: "Assessment of national cybersecurity commitment across legal, technical, and organizational measures.",
      },
    ],
  },
  {
    title: "Primary Sri Lankan Legal Sources",
    description: "Direct links to gazettes and regulatory authorities governing digital law in Sri Lanka.",
    links: [
      {
        name: "Sri Lanka Computer Emergency Readiness Team (Sri Lanka CERT|CC)",
        url: "https://www.cert.gov.lk",
        desc: "National CERT providing incident coordination, vulnerability advisories, and cyber policy guidance.",
      },
      {
        name: "Data Protection Authority of Sri Lanka",
        url: "https://www.dpa.gov.lk",
        desc: "Statutory authority established under the Personal Data Protection Act No. 9 of 2022.",
      },
      {
        name: "Information and Communication Technology Agency (ICTA)",
        url: "https://www.icta.lk",
        desc: "Apex body for digital transformation and legislative drafting for e-laws.",
      },
    ],
  },
  {
    title: "Global Standards & Compliance Frameworks",
    description: "International cybersecurity and data governance standards.",
    links: [
      {
        name: "NIST Cybersecurity Framework (CSF 2.0)",
        url: "https://www.nist.gov/cyberframework",
        desc: "Guidelines for managing and reducing cybersecurity risk across organizations.",
      },
      {
        name: "ISO/IEC 27001 & 27701 Overview",
        url: "https://www.iso.org/isoiec-27001-information-security.html",
        desc: "Global information security management and privacy information management systems standards.",
      },
      {
        name: "ENISA (European Union Agency for Cybersecurity)",
        url: "https://www.enisa.europa.eu",
        desc: "Guidance on EU cybersecurity policy, NIS2 implementation, and threat landscapes.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Official Resources" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Primary Legal Portals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Official Cyber Law Resources & Depositories
          </h1>
          <p className="text-base text-(--muted-foreground) max-w-2xl leading-relaxed">
            Verify every statute and treaty at the source. CyberLex curates official government depositories,
            intergovernmental repositories, and accredited standards bodies.
          </p>
        </div>

        <div className="space-y-10">
          {resourceCategories.map((cat, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
              <h2 className="text-xl font-bold text-(--foreground) font-heading mb-1">{cat.title}</h2>
              <p className="text-xs text-(--muted-foreground) mb-6">{cat.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cat.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/60 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-(--primary)">External Repository</span>
                        <ExternalLink className="w-3.5 h-3.5 text-(--muted-foreground) group-hover:text-(--primary) transition-colors" />
                      </div>
                      <h3 className="text-sm font-bold text-(--foreground) font-heading mb-2 leading-snug">
                        {link.name}
                      </h3>
                      <p className="text-xs text-(--muted-foreground) leading-relaxed">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
