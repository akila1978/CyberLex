"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  category: string;
  situation: string;
  dilemma: string;
  recommendedSteps: string[];
  legalRisks: string[];
  primaryStatutes: string;
}

const scenarios: Scenario[] = [
  {
    id: "ransomware-incident",
    title: "Scenario: Enterprise Ransomware Attack & Extortion Demand",
    category: "Incident Response & Cybercrime",
    situation:
      "A healthcare company's servers are encrypted overnight by a ransomware syndicate. The attackers demand 15 Bitcoin and threaten to publish 50,000 patient records on a dark web leak site if payment is not received within 48 hours.",
    dilemma:
      "Should the organization pay the ransom to avoid patient record leaks, or focus strictly on forensic containment and mandatory statutory breach notifications?",
    recommendedSteps: [
      "Isolate affected network segments immediately to halt lateral movement.",
      "Engage accredited external incident response forensics and legal breach counsel.",
      "Check OFAC / national sanctions lists: paying sanctioned ransomware gangs triggers strict civil and criminal liability.",
      "Notify regulatory supervisory authorities within 72 hours (e.g. GDPR Art. 33 / DPA).",
      "File a formal criminal report with national cyber police / CERT.",
    ],
    legalRisks: [
      "Potential criminal violation of international anti-money laundering and sanctions laws (e.g. US OFAC advisories).",
      "Statutory penalties for failure to timely notify affected data subjects and regulators.",
      "Class action or civil lawsuits from impacted data subjects for negligence under data protection laws.",
    ],
    primaryStatutes: "GDPR Articles 33-34; US OFAC Ransomware Advisory; Sri Lanka Computer Crimes Act Section 6",
  },
  {
    id: "vulnerability-disclosure",
    title: "Scenario: Unsolicited Security Vulnerability Discovery",
    category: "Ethical Hacking & Vulnerability Research",
    situation:
      "An independent security researcher discovers an unauthenticated IDOR (Insecure Direct Object Reference) flaw on a major fintech portal that allows viewing other users' financial statements by incrementing an account ID parameter in the URL.",
    dilemma:
      "How can the researcher notify the company and disclose the issue without being prosecuted for unauthorized access under anti-hacking statutes like the CFAA or Computer Crimes Act?",
    recommendedSteps: [
      "Stop testing immediately once proof of concept is confirmed; do NOT exfiltrate bulk customer records.",
      "Verify whether the company has an official security.txt, Coordinated Vulnerability Disclosure (CVD) policy, or bug bounty program.",
      "Document the finding objectively with minimal reproducible steps.",
      "Send encrypted communication to the designated security team or national CERT.",
      "Never demand compensation or set ultimatums, which can convert research into statutory extortion.",
    ],
    legalRisks: [
      "Exceeding authorized access under CFAA (18 U.S.C. § 1030) or Sri Lanka Computer Crimes Act No. 24 of 2007 Section 3.",
      "Extortion charges if bug disclosure is conditioned upon monetary payments.",
      "Civil claims for business interruption or unauthorized database querying.",
    ],
    primaryStatutes: "CFAA (18 U.S.C. § 1030); Van Buren v. United States; ISO/IEC 29147 (Vulnerability Disclosure)",
  },
];

export default function ScenariosPage() {
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Practical Scenarios" }]} className="mb-8" />

        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Practical Legal Incident Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Incident Scenarios & Legal Walkthroughs
          </h1>
          <p className="text-sm text-(--muted-foreground) max-w-2xl leading-relaxed">
            Step-by-step analyses of high-stakes situations—evaluating legal risks, statutory compliance duties,
            and recommended incident workflows before decisions are made.
          </p>
        </div>

        {/* Scenario Selection Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenarioId(s.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeScenarioId === s.id
                  ? "bg-(--primary) text-white shadow-md shadow-(--primary)/20"
                  : "border border-(--border-color) bg-(--card-bg) text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              {s.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Detailed Scenario Box */}
        <div className="p-6 sm:p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm space-y-6">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-(--primary)/10 text-(--primary) mb-3 inline-block">
              {activeScenario.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-(--foreground) font-heading">
              {activeScenario.title}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-color) text-sm text-(--muted-foreground) leading-relaxed">
            <strong className="text-(--foreground) block mb-1">The Situation:</strong>
            {activeScenario.situation}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-(--muted-foreground) leading-relaxed">
            <strong className="text-amber-500 block mb-1">The Core Legal Dilemma:</strong>
            {activeScenario.dilemma}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Recommended Steps */}
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-sm font-bold text-emerald-400 font-heading mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1.5" />
                <span>Recommended Action Framework</span>
              </h3>
              <ul className="space-y-2 text-xs text-(--muted-foreground)">
                {activeScenario.recommendedSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="font-bold text-emerald-400 mr-2">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Risks */}
            <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
              <h3 className="text-sm font-bold text-rose-400 font-heading mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1.5" />
                <span>Major Legal Pitfalls & Liabilities</span>
              </h3>
              <ul className="space-y-2 text-xs text-(--muted-foreground)">
                {activeScenario.legalRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-rose-400 mr-2">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-(--border-color) flex items-center justify-between text-xs text-(--muted-foreground)">
            <span>
              Primary Relevant Authorities: <strong className="text-(--foreground)">{activeScenario.primaryStatutes}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
