"use client";

import { useState, useEffect } from "react";
import { BellRing, Plus, Trash2, Edit3, X, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LegalUpdateItem {
  id: string;
  title: string;
  slug: string;
  datePublished: string;
  jurisdiction: string;
  instrumentType: string;
  summary: string;
  fullAnalysis?: string | null;
  sourceUrl?: string | null;
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<LegalUpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<LegalUpdateItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Global");
  const [instrumentType, setInstrumentType] = useState("LAW");
  const [datePublished, setDatePublished] = useState(new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState("");
  const [fullAnalysis, setFullAnalysis] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api/updates");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setUpdates(data.data);
      }
    } catch (err) {
      console.error("Failed to load updates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/updates");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.data)) {
          setUpdates(data.data);
        }
      } catch (err) {
        console.error("Failed to load updates:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const resetForm = () => {
    setTitle("");
    setJurisdiction("Global");
    setInstrumentType("LAW");
    setDatePublished(new Date().toISOString().slice(0, 10));
    setSummary("");
    setFullAnalysis("");
    setSourceUrl("");
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleEditClick = (u: LegalUpdateItem) => {
    setEditingItem(u);
    setTitle(u.title);
    setJurisdiction(u.jurisdiction);
    setInstrumentType(u.instrumentType);
    setDatePublished(new Date(u.datePublished).toISOString().slice(0, 10));
    setSummary(u.summary);
    setFullAnalysis(u.fullAnalysis || "");
    setSourceUrl(u.sourceUrl || "");
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    const payload = {
      title,
      jurisdiction,
      instrumentType,
      datePublished,
      summary,
      fullAnalysis,
      sourceUrl,
    };

    try {
      const url = editingItem ? `/api/updates/${editingItem.id}` : "/api/updates";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg({
          type: "success",
          text: editingItem
            ? "Regulatory notice updated successfully in MySQL!"
            : "New statutory alert posted successfully to MySQL!",
        });
        resetForm();
        fetchUpdates();
      } else {
        setMsg({ type: "error", text: data.error || "Failed to save update." });
      }
    } catch {
      setMsg({ type: "error", text: "Network error saving update." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this regulatory notice from MySQL?")) return;
    try {
      const res = await fetch(`/api/updates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUpdates((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Regulatory & Statutory Updates
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Global cyber law alerts, legislative enactments, and regulatory trackers in MySQL.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            if (isAdding) resetForm();
            else setIsAdding(true);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? "Close Form" : "New Notice / Alert"}</span>
        </Button>
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

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-(--border-color) pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
              {editingItem ? "Edit Statutory Notice" : "Draft New Regulatory Alert"}
            </h2>
            <button type="button" onClick={resetForm} className="text-(--muted-foreground) hover:text-(--foreground)">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Notice Title <span className="text-rose-400">*</span></label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. EU AI Act Enters Final Implementation Stage" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Jurisdiction <span className="text-rose-400">*</span></label>
              <Input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="e.g. European Union, United States, Sri Lanka" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Instrument Type <span className="text-rose-400">*</span></label>
              <select
                value={instrumentType}
                onChange={(e) => setInstrumentType(e.target.value)}
                className="w-full text-xs rounded-xl border border-(--border-color) bg-(--card-bg) px-3 py-2 text-(--foreground) focus:outline-none focus:ring-1 focus:ring-(--primary)"
              >
                <option value="LAW">Statute / Law</option>
                <option value="REGULATION">Regulation</option>
                <option value="DIRECTIVE">Directive</option>
                <option value="BILL">Bill / Proposed Law</option>
                <option value="GUIDANCE">Regulatory Guidance</option>
                <option value="FRAMEWORK">National Framework</option>
                <option value="CASE_LAW">Judicial Ruling</option>
                <option value="POLICY">Policy Document</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Enactment / Gazette Date <span className="text-rose-400">*</span></label>
              <Input type="date" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Official Gazette / Source URL</label>
              <Input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Executive Summary <span className="text-rose-400">*</span></label>
            <Textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Key legal implications and compliance mandates..." required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Full Statutory Analysis</label>
            <Textarea rows={4} value={fullAnalysis} onChange={(e) => setFullAnalysis(e.target.value)} placeholder="In-depth analysis of specific sections, penalties, and enforcement mechanisms..." />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving to MySQL..." : editingItem ? "Update Notice" : "Save Notice to MySQL"}
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Notice Title</th>
                <th className="py-3.5 px-4">Jurisdiction</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-(--muted-foreground)">Loading notices from MySQL...</td>
                </tr>
              ) : updates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-(--muted-foreground)">No regulatory updates found in MySQL.</td>
                </tr>
              ) : (
                updates.map((u) => (
                  <tr key={u.id} className="hover:bg-(--bg-surface)/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm text-(--foreground)">
                      <div className="flex items-center gap-2">
                        <BellRing className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{u.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-(--foreground)">{u.jurisdiction}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {u.instrumentType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      {new Date(u.datePublished).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {u.sourceUrl && (
                          <a
                            href={u.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                            title="Open Official Source"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleEditClick(u)}
                          className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors"
                          title="Edit Notice"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
