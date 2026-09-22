"use client";

import { useState, useEffect } from "react";
import { BookOpen, FileText, Edit3, X, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface CountryStatute {
  id: string;
  title: string;
  instrumentType: string;
}

interface CountryRecord {
  id: string;
  name: string;
  code: string;
  slug: string;
  region: string;
  flagEmoji: string;
  legalSystem: string;
  summary: string;
  dpaAuthority?: string | null;
  dpaUrl?: string | null;
  certAuthority?: string | null;
  certUrl?: string | null;
  cyberStrategyUrl?: string | null;
  statutes: CountryStatute[];
  _count: { articles: number };
}

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<CountryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCountry, setEditingCountry] = useState<CountryRecord | null>(null);

  // Edit fields
  const [legalSystem, setLegalSystem] = useState("");
  const [summary, setSummary] = useState("");
  const [dpaAuthority, setDpaAuthority] = useState("");
  const [dpaUrl, setDpaUrl] = useState("");
  const [certAuthority, setCertAuthority] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [cyberStrategyUrl, setCyberStrategyUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCountries = async () => {
    try {
      const res = await fetch("/api/countries");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCountries(data.data);
      }
    } catch (err) {
      console.error("Failed to load countries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/countries");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.data)) {
          setCountries(data.data);
        }
      } catch (err) {
        console.error("Failed to load countries:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleEditClick = (c: CountryRecord) => {
    setEditingCountry(c);
    setLegalSystem(c.legalSystem || "");
    setSummary(c.summary || "");
    setDpaAuthority(c.dpaAuthority || "");
    setDpaUrl(c.dpaUrl || "");
    setCertAuthority(c.certAuthority || "");
    setCertUrl(c.certUrl || "");
    setCyberStrategyUrl(c.cyberStrategyUrl || "");
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountry) return;
    setSaving(true);
    setMsg(null);

    const payload = {
      legalSystem,
      summary,
      dpaAuthority,
      dpaUrl,
      certAuthority,
      certUrl,
      cyberStrategyUrl,
    };

    try {
      const res = await fetch(`/api/countries/${editingCountry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg({
          type: "success",
          text: `Jurisdiction profile for ${editingCountry.name} updated in MySQL!`,
        });
        setEditingCountry(null);
        fetchCountries();
      } else {
        setMsg({ type: "error", text: data.error || "Failed to update country." });
      }
    } catch {
      setMsg({ type: "error", text: "Network error saving country profile." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Jurisdictions & Legal Systems
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Statutory profiles, primary legislation, DPA/CERT authorities, and cyber law frameworks in MySQL.
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            msg.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
          }`}
        >
          {msg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {editingCountry && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-(--border-color) pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground) flex items-center gap-2">
              <span className="text-lg">{editingCountry.flagEmoji}</span>
              <span>Edit Jurisdiction Profile: {editingCountry.name} ({editingCountry.code})</span>
            </h2>
            <button
              type="button"
              onClick={() => setEditingCountry(null)}
              className="text-(--muted-foreground) hover:text-(--foreground)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Legal System Framework</label>
              <Input
                value={legalSystem}
                onChange={(e) => setLegalSystem(e.target.value)}
                placeholder="e.g. Mixed Roman-Dutch & English Common Law"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">National Cybersecurity Strategy URL</label>
              <Input
                value={cyberStrategyUrl}
                onChange={(e) => setCyberStrategyUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Data Protection Authority (DPA)</label>
              <Input
                value={dpaAuthority}
                onChange={(e) => setDpaAuthority(e.target.value)}
                placeholder="e.g. Data Protection Authority of Sri Lanka"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">DPA Official Portal URL</label>
              <Input
                value={dpaUrl}
                onChange={(e) => setDpaUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">National CERT / Incident Response Body</label>
              <Input
                value={certAuthority}
                onChange={(e) => setCertAuthority(e.target.value)}
                placeholder="e.g. Sri Lanka CERT|CC"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">CERT Official Incident Desk URL</label>
              <Input
                value={certUrl}
                onChange={(e) => setCertUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Statutory Profile Summary</label>
            <Textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Comprehensive summary of the digital legal framework..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditingCountry(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={saving}>
              {saving ? "Saving to MySQL..." : "Save Jurisdiction"}
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Jurisdiction</th>
                <th className="py-3.5 px-4">Region</th>
                <th className="py-3.5 px-4">Legal System</th>
                <th className="py-3.5 px-4">Authorities</th>
                <th className="py-3.5 px-4">Statutes</th>
                <th className="py-3.5 px-4">Articles</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-(--muted-foreground)">Loading jurisdictions from MySQL...</td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-(--muted-foreground)">No jurisdictions found in MySQL.</td>
                </tr>
              ) : (
                countries.map((c) => (
                  <tr key={c.id} className="hover:bg-(--bg-surface)/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm text-(--foreground)">
                      <span className="mr-2 text-base">{c.flagEmoji}</span>
                      <span>{c.name}</span>
                      <span className="ml-1.5 text-[10px] text-(--muted-foreground) font-normal uppercase">
                        ({c.code})
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">{c.region}</td>
                    <td className="py-4 px-4 text-(--foreground) font-medium max-w-xs truncate">
                      {c.legalSystem || "Mixed Jurisdiction"}
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        {c.dpaAuthority && (
                          <span className="truncate max-w-[180px] text-emerald-400 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 shrink-0" />
                            <span className="truncate">{c.dpaAuthority}</span>
                          </span>
                        )}
                        {c.certAuthority && (
                          <span className="truncate max-w-[180px] text-sky-400">
                            {c.certAuthority}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{c.statutes?.length || 0} primary</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      <span className="inline-flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-sky-400" />
                        <span>{c._count?.articles || 0} articles</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(c)}
                          className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors"
                          title="Edit Regulatory Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/countries/${c.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-(--primary) hover:bg-(--primary)/10 transition-colors"
                          title="View Public Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
