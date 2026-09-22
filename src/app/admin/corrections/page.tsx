"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";

interface CorrectionItem {
  id: string;
  submitterName: string;
  submitterEmail: string;
  issueType: string;
  description: string;
  suggestedCorrection: string | null;
  status: "PENDING" | "INVESTIGATING" | "APPLIED" | "REJECTED";
  createdAt: string;
  article?: {
    title: string;
    slug: string;
  } | null;
}

export default function AdminCorrectionsPage() {
  const [corrections, setCorrections] = useState<CorrectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCorrections = async () => {
    try {
      const res = await fetch("/api/corrections");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCorrections(data.data);
      }
    } catch (err) {
      console.error("Error loading corrections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/corrections");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.data)) {
          setCorrections(data.data);
        }
      } catch (err) {
        console.error("Error loading corrections:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const updateStatus = async (id: string, newStatus: CorrectionItem["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/corrections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCorrections((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Editorial Corrections Desk
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Audit corrections submitted by legal scholars, verified practitioners, and researchers in MySQL.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchCorrections}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-(--muted-foreground)">
            Loading corrections queue from MySQL...
          </div>
        ) : corrections.length === 0 ? (
          <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center text-xs text-(--muted-foreground)">
            No pending correction requests in MySQL. The editorial queue is clear!
          </div>
        ) : (
          corrections.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-(--border-color) pb-4">
                <div>
                  <span className="text-xs font-bold text-(--primary) uppercase tracking-wider">
                    {item.issueType}
                  </span>
                  <h3 className="text-sm font-bold text-(--foreground) mt-0.5">
                    {item.article?.title ? `Article: ${item.article.title}` : "General Legal Platform Feedback"}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "APPLIED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : item.status === "REJECTED"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : item.status === "INVESTIGATING"
                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[11px] text-(--muted-foreground)">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-(--muted-foreground)">Reported Issue: </span>
                  <span className="text-(--foreground)">{item.description}</span>
                </div>
                {item.suggestedCorrection && (
                  <div className="p-3 rounded-xl bg-(--bg-surface) border border-(--border-color)">
                    <span className="font-bold text-sky-400 block mb-1">Suggested Amendment:</span>
                    <span className="text-(--foreground) font-mono text-[11px]">
                      {item.suggestedCorrection}
                    </span>
                  </div>
                )}
                <div className="text-[11px] text-(--muted-foreground) pt-1">
                  Submitted by: <strong className="text-(--foreground)">{item.submitterName}</strong> (
                  <a href={`mailto:${item.submitterEmail}`} className="underline hover:text-(--primary)">
                    {item.submitterEmail}
                  </a>
                  )
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-(--border-color)">
                {item.status !== "INVESTIGATING" && item.status !== "APPLIED" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updatingId === item.id}
                    onClick={() => updateStatus(item.id, "INVESTIGATING")}
                    className="text-xs inline-flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Investigate</span>
                  </Button>
                )}
                {item.status !== "APPLIED" && (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={updatingId === item.id}
                    onClick={() => updateStatus(item.id, "APPLIED")}
                    className="text-xs inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Approve & Apply</span>
                  </Button>
                )}
                {item.status !== "REJECTED" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={updatingId === item.id}
                    onClick={() => updateStatus(item.id, "REJECTED")}
                    className="text-xs text-rose-400 hover:bg-rose-500/10 inline-flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
