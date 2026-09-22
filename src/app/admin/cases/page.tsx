"use client";

import { useState, useEffect } from "react";
import { Scale, Plus, Trash2, Edit3, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CaseItem {
  id: string;
  title: string;
  court: string;
  decisionYear: number;
  citation: string;
  jurisdiction: string;
  facts: string;
  ruling: string;
  impact: string;
  status: string;
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [court, setCourt] = useState("");
  const [decisionYear, setDecisionYear] = useState(new Date().getFullYear());
  const [citation, setCitation] = useState("");
  const [jurisdiction, setJurisdiction] = useState("United States");
  const [ruling, setRuling] = useState("");
  const [impact, setImpact] = useState("");
  const [status, setStatus] = useState("Precedent");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/cases");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCases(data.data);
      }
    } catch (err) {
      console.error("Failed to load cases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/cases");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.data)) {
          setCases(data.data);
        }
      } catch (err) {
        console.error("Failed to load cases:", err);
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
    setCourt("");
    setDecisionYear(new Date().getFullYear());
    setCitation("");
    setJurisdiction("United States");
    setRuling("");
    setImpact("");
    setStatus("Precedent");
    setEditingCase(null);
    setIsAdding(false);
  };

  const handleEditClick = (c: CaseItem) => {
    setEditingCase(c);
    setTitle(c.title);
    setCourt(c.court);
    setDecisionYear(c.decisionYear);
    setCitation(c.citation);
    setJurisdiction(c.jurisdiction);
    setRuling(c.ruling);
    setImpact(c.impact);
    setStatus(c.status);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    const payload = {
      title,
      court,
      decisionYear,
      citation,
      jurisdiction,
      ruling,
      impact,
      status,
    };

    try {
      const url = editingCase ? `/api/cases/${editingCase.id}` : "/api/cases";
      const method = editingCase ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg({
          type: "success",
          text: editingCase
            ? "Case precedent updated successfully in MySQL!"
            : "New landmark case created successfully in MySQL!",
        });
        resetForm();
        fetchCases();
      } else {
        setMsg({ type: "error", text: data.error || "Failed to save case." });
      }
    } catch {
      setMsg({ type: "error", text: "Network communication error." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this landmark case from MySQL?")) return;
    try {
      const res = await fetch(`/api/cases/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCases((prev) => prev.filter((c) => c.id !== id));
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
            Landmark Cases & Precedents
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Manage judicial rulings, permanent volume citations, and statutory impact analyses in MySQL.
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
          <span>{isAdding ? "Close Form" : "Add Landmark Case"}</span>
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
              {editingCase ? "Edit Landmark Case Record" : "Add New Judicial Precedent"}
            </h2>
            <button type="button" onClick={resetForm} className="text-(--muted-foreground) hover:text-(--foreground)">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Case Title <span className="text-rose-400">*</span></label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Van Buren v. United States" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Official Citation <span className="text-rose-400">*</span></label>
              <Input value={citation} onChange={(e) => setCitation(e.target.value)} placeholder="e.g. 593 U.S. 374 (2021)" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Adjudicating Court <span className="text-rose-400">*</span></label>
              <Input value={court} onChange={(e) => setCourt(e.target.value)} placeholder="e.g. Supreme Court of the United States" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Year of Decision <span className="text-rose-400">*</span></label>
              <Input type="number" value={decisionYear} onChange={(e) => setDecisionYear(parseInt(e.target.value, 10))} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Jurisdiction <span className="text-rose-400">*</span></label>
              <Input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="e.g. United States" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Judicial Ruling & Holding <span className="text-rose-400">*</span></label>
            <Textarea rows={3} value={ruling} onChange={(e) => setRuling(e.target.value)} placeholder="Summary of the holding and statutory interpretation..." required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Cyber Law Significance & Impact</label>
            <Textarea rows={2} value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="Practical impact on cybersecurity practices and law enforcement..." />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving to MySQL..." : editingCase ? "Update Case" : "Save Case to MySQL"}
            </Button>
          </div>
        </form>
      )}

      {/* Cases Table */}
      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Case Title</th>
                <th className="py-3.5 px-4">Court & Year</th>
                <th className="py-3.5 px-4">Official Citation</th>
                <th className="py-3.5 px-4">Jurisdiction</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-(--muted-foreground)">Loading landmark cases from MySQL...</td>
                </tr>
              ) : cases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-(--muted-foreground)">No landmark cases found in MySQL.</td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr key={c.id} className="hover:bg-(--bg-surface)/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm text-(--foreground)">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{c.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-(--foreground)">
                      <span>{c.court}</span>
                      <span className="ml-1 text-(--muted-foreground)">({c.decisionYear})</span>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-sky-400">{c.citation}</td>
                    <td className="py-4 px-4 font-semibold text-(--foreground)">{c.jurisdiction}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(c)}
                          className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors"
                          title="Edit Case"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Case"
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
