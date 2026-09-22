import { ArrowRight } from "lucide-react";
import Link from "next/link";

const scenarioGuides = [
  {
    id: "scen-1",
    title: "Corporate Phishing & Compromised Credentials",
    domain: "Incident Response & Disclosure",
    difficulty: "INTERMEDIATE",
    steps: 5,
    summary: "Simulated spear-phishing attack against finance officer resulting in wire redirect and corporate credential harvesting.",
    statutes: "Computer Crimes Act Sec. 3-6; GDPR Art. 33",
  },
  {
    id: "scen-2",
    title: "Cross-Border Ransomware & Extortion Demand",
    domain: "Cyber Extortion & Sanctions",
    difficulty: "ADVANCED",
    steps: 6,
    summary: "Healthcare provider encrypted by multinational ransomware syndicate with threat to publish patient biometric records.",
    statutes: "OFAC Ransomware Guidance; Budapest Convention Art. 4; HIPAA Security Rule",
  },
  {
    id: "scen-3",
    title: "Ethical Researcher Vulnerability Disclosure",
    domain: "Defensive Security & Authorization",
    difficulty: "BEGINNER",
    steps: 4,
    summary: "Independent security researcher identifies SQL injection vulnerability in a public critical infrastructure portal.",
    statutes: "CFAA Authorization Standard; ISO/IEC 29147 Vulnerability Disclosure",
  },
];

export default function AdminScenariosPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Scenario Guides & Incident Response Simulations
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Interactive decision trees, compliance pathways, and statutory simulations for practical education.
          </p>
        </div>
        <Link
          href="/scenarios"
          target="_blank"
          className="text-xs text-(--primary) hover:underline font-semibold"
        >
          View Public Scenarios &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarioGuides.map((scen) => (
          <div
            key={scen.id}
            className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-(--primary)">
                  {scen.domain}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {scen.difficulty}
                </span>
              </div>
              <h3 className="text-base font-bold text-(--foreground) font-heading">
                {scen.title}
              </h3>
              <p className="text-xs text-(--muted-foreground) line-clamp-3">
                {scen.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-(--border-color) space-y-2 text-xs">
              <div className="text-[11px] font-mono text-(--muted-foreground)">
                Key Statutes: <span className="text-(--foreground)">{scen.statutes}</span>
              </div>
              <div className="text-[11px] text-(--muted-foreground)">
                Decision Steps: <span className="text-(--primary) font-bold">{scen.steps} Interactive Nodes</span>
              </div>
              <Link
                href="/scenarios"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-(--primary) hover:underline font-semibold pt-1"
              >
                <span>Launch Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
