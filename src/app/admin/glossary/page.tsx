"use client";

import { useState, useEffect } from "react";
import { Plus, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TermItem {
  id: string;
  term: string;
  category: string;
  definition: string;
  statutoryContext: string | null;
}

export default function AdminGlossaryPage() {
  const [terms, setTerms] = useState<TermItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [newTerm, setNewTerm] = useState("");
  const [newCategory, setNewCategory] = useState("Cybercrime");
  const [newDefinition, setNewDefinition] = useState("");
  const [newContext, setNewContext] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchTerms = async () => {
    try {
      const res = await fetch("/api/glossary");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTerms(data.data);
      }
    } catch (err) {
      console.error("Failed to load glossary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/glossary");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.data)) {
          setTerms(data.data);
        }
      } catch (err) {
        console.error("Failed to load glossary:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddTerm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    try {
      const res = await fetch("/api/glossary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          term: newTerm,
          category: newCategory,
          definition: newDefinition,
          statutoryContext: newContext,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg("Term added successfully to MySQL!");
        setNewTerm("");
        setNewDefinition("");
        setNewContext("");
        setIsAdding(false);
        fetchTerms();
      } else {
        setMsg(data.error || "Failed to create term.");
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Glossary & Cyber Law Explorer
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Statutory definitions, legal doctrines, and technical cyber law taxonomy in MySQL.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Cancel" : "Add Definition"}</span>
        </Button>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
          {msg}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddTerm} className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
            New Statutory Concept
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Legal Term / Concept</label>
              <Input
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder="e.g. Unauthorized Access"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground)"
              >
                <option value="Cybercrime">Cybercrime</option>
                <option value="Data Protection">Data Protection</option>
                <option value="Digital Evidence">Digital Evidence</option>
                <option value="Privacy">Privacy</option>
                <option value="International Law">International Law</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Authoritative Definition</label>
            <Textarea
              rows={3}
              value={newDefinition}
              onChange={(e) => setNewDefinition(e.target.value)}
              placeholder="Precise statutory or jurisprudence definition..."
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Statutory Reference / Pinpoint</label>
            <Input
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              placeholder="e.g. Budapest Convention Article 2; Sri Lanka CCA Sec. 3"
            />
          </div>
          <Button type="submit" disabled={submitting} variant="primary" size="sm" className="text-xs font-bold">
            {submitting ? "Saving to MySQL..." : "Save Definition"}
          </Button>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-(--muted-foreground)" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter concepts or statutory context..."
          className="pl-10 text-xs"
        />
      </div>

      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Concept</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Definition</th>
                <th className="py-3.5 px-4">Statutory Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-(--muted-foreground)">
                    Loading glossary terms from MySQL...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-(--muted-foreground)">
                    No concepts match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-(--bg-surface)/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm text-(--foreground) whitespace-nowrap">
                      {t.term}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--foreground) max-w-md">
                      <p className="line-clamp-2">{t.definition}</p>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground) whitespace-nowrap">
                      {t.statutoryContext ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-(--primary)">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.statutoryContext}</span>
                        </span>
                      ) : (
                        "—"
                      )}
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
