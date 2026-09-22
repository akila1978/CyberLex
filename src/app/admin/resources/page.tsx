import { Bookmark, ExternalLink } from "lucide-react";

const primaryResources = [
  {
    title: "ITU Global Cybersecurity Index",
    organization: "International Telecommunication Union",
    type: "Benchmark & Index",
    url: "https://www.itu.int/gci",
    focus: "National legal, technical, and organizational cybersecurity postures.",
  },
  {
    title: "UNODC Cybercrime Repository",
    organization: "United Nations Office on Drugs and Crime",
    type: "Statutory Database",
    url: "https://www.unodc.org/cybercrime",
    focus: "Global repository of cybercrime laws, case law, and international instruments.",
  },
  {
    title: "Council of Europe Budapest Convention (ETS No. 185)",
    organization: "Council of Europe",
    type: "International Treaty",
    url: "https://www.coe.int/en/web/cybercrime/the-budapest-convention",
    focus: "Harmonization of national cybercrime legislation and international evidence sharing.",
  },
  {
    title: "NIST Cybersecurity Framework 2.0",
    organization: "National Institute of Standards and Technology",
    type: "Compliance Standard",
    url: "https://www.nist.gov/cyberframework",
    focus: "Govern, Identify, Protect, Detect, Respond, and Recover core functions.",
  },
];

export default function AdminResourcesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Curated Legal Resources & Institutional Repositories
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Verified external authorities, compliance standards, and international cyber law tools.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Resource Title</th>
                <th className="py-3.5 px-4">Issuing Organization</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Editorial Scope</th>
                <th className="py-3.5 px-4 text-right">Official Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {primaryResources.map((res, i) => (
                <tr key={i} className="hover:bg-(--bg-surface)/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-sm text-(--foreground)">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{res.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-(--foreground)">{res.organization}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {res.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-(--muted-foreground) max-w-xs">{res.focus}</td>
                  <td className="py-4 px-4 text-right">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-(--primary) hover:underline font-semibold"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
