import type { Metadata } from "next";
import { Bell, Calendar, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LegalInstrumentBadge } from "@/components/ui/badge";

import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Global Cyber Law Tracker & Updates — CyberLex",
  description:
    "Track recent statutory enactments, regulatory amendments, enforcement actions, and international cybercrime treaties worldwide.",
};

import { InstrumentType } from "@prisma/client";

interface UpdateItem {
  id: string;
  title: string;
  datePublished: Date;
  jurisdiction: string;
  instrumentType: InstrumentType;
  summary: string;
}

const fallbackUpdates: UpdateItem[] = [
  {
    id: "eu-ai-act-entry",
    title: "EU AI Act Enters Into Force (Regulation EU 2024/1689)",
    datePublished: new Date("2024-08-01"),
    jurisdiction: "European Union",
    instrumentType: InstrumentType.REGULATION,
    summary:
      "The comprehensive European regulation on artificial intelligence enters force, establishing phased compliance deadlines for prohibited AI practices, general-purpose AI models, and high-risk applications.",
  },
  {
    id: "un-cybercrime-treaty",
    title: "Draft United Nations Cybercrime Convention Finalized by Ad Hoc Committee",
    datePublished: new Date("2024-08-15"),
    jurisdiction: "United Nations / Global",
    instrumentType: InstrumentType.TREATY,
    summary:
      "UN member states finalized draft text for the international convention on countering cybercrime, setting up a formal vote at the UN General Assembly amidst debates on privacy and human rights safeguards.",
  },
  {
    id: "sl-online-safety-act",
    title: "Online Safety Act No. 9 of 2024 Enacted in Sri Lanka",
    datePublished: new Date("2024-02-01"),
    jurisdiction: "Sri Lanka",
    instrumentType: InstrumentType.LAW,
    summary:
      "Parliament enacted legislation establishing the Online Safety Commission to regulate false online statements and user safety, generating legal dialogue around constitutional speech protections.",
  },
  {
    id: "nis2-transposition",
    title: "EU Member States Transposition Deadline for NIS 2 Directive",
    datePublished: new Date("2024-10-17"),
    jurisdiction: "European Union",
    instrumentType: InstrumentType.DIRECTIVE,
    summary:
      "Directive (EU) 2022/2555 mandates enhanced risk management, mandatory 24-hour incident notification, and supply chain security controls across essential and important entities.",
  },
];

export default async function UpdatesPage() {
  let displayUpdates: UpdateItem[] = fallbackUpdates;
  try {
    const dbUpdates = await db.legalUpdate.findMany({
      orderBy: { datePublished: "desc" },
    });
    if (dbUpdates.length > 0) {
      displayUpdates = dbUpdates;
    }
  } catch (err) {
    console.warn("Falling back to static updates:", err);
  }
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "News & Legal Updates" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Bell className="w-3.5 h-3.5" />
            <span>Legislative & Regulatory Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Global Cyber Law Updates
          </h1>
          <p className="text-base text-(--muted-foreground) max-w-2xl leading-relaxed">
            Monitor real-time legislative enactments, regulatory directives, and international treaties shaping
            global digital policy and cybersecurity obligations.
          </p>
        </div>

        <div className="space-y-6">
          {displayUpdates.map((u) => (
            <article
              key={u.id}
              className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/50 transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <LegalInstrumentBadge instrument={u.instrumentType} size="sm" />
                <span className="text-xs text-(--muted-foreground)">•</span>
                <span className="inline-flex items-center text-xs text-(--muted-foreground)">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(u.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="text-xs text-(--muted-foreground)">•</span>
                <span className="text-xs font-medium text-(--primary)">{u.jurisdiction}</span>
              </div>

              <h2 className="text-xl font-bold text-(--foreground) font-heading mb-2">
                {u.title}
              </h2>

              <p className="text-sm text-(--muted-foreground) leading-relaxed mb-4">
                {u.summary}
              </p>

              <div className="flex items-center text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                <span>Verified Regulatory Record</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
