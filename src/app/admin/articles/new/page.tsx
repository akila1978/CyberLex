"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ShieldCheck, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CitationItem {
  title: string;
  sourceUrl: string;
  citationText: string;
}

interface TopicOption {
  id: string;
  name: string;
  slug: string;
}

interface CountryOption {
  id: string;
  name: string;
  code: string;
  flagEmoji: string;
}

export default function NewArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [topicId, setTopicId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [difficulty, setDifficulty] = useState("INTERMEDIATE");
  const sourceQuality = "PRIMARY";
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [citations, setCitations] = useState<CitationItem[]>([
    {
      title: "",
      sourceUrl: "",
      citationText: "",
    },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const [tRes, cRes] = await Promise.all([
          fetch("/api/topics"),
          fetch("/api/countries"),
        ]);
        const tData = await tRes.json();
        const cData = await cRes.json();

        if (tData.success && Array.isArray(tData.data)) {
          setTopics(tData.data);
          if (tData.data.length > 0) setTopicId(tData.data[0].id);
        }
        if (cData.success && Array.isArray(cData.data)) {
          setCountries(cData.data);
          if (cData.data.length > 0) setCountryId(cData.data[0].id);
        }
      } catch (err) {
        console.error("Failed to load topic/country options:", err);
      } finally {
        setLoadingOptions(false);
      }
    }
    loadData();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const addCitation = () => {
    setCitations([
      ...citations,
      {
        title: "",
        sourceUrl: "",
        citationText: "",
      },
    ]);
  };

  const removeCitation = (index: number) => {
    setCitations(citations.filter((_, i) => i !== index));
  };

  const updateCitation = (index: number, field: keyof CitationItem, value: string) => {
    const updated = [...citations];
    updated[index][field] = value;
    setCitations(updated);
  };

  const handleSubmit = async (e: React.FormEvent, targetStatus?: string) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const submitStatus = targetStatus || status;

    // Filter valid citations with at least a title
    const validCitations = citations.filter((c) => c.title.trim().length > 0);

    if (submitStatus === "PUBLISHED" && validCitations.length === 0) {
      setErrorMessage("At least one verified statutory citation is required to publish an article.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          subtitle,
          summary,
          content,
          topicId,
          countryId: countryId || null,
          difficulty,
          status: submitStatus,
          sourceQuality,
          citations: validCitations,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to save article to database.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(`Article successfully saved to MySQL as ${submitStatus}!`);
      setTimeout(() => {
        router.push("/admin/articles");
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error occurred while saving article.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="inline-flex items-center text-xs font-semibold text-(--muted-foreground) hover:text-(--foreground) transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Articles</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
          Author Legal Article
        </h1>
        <p className="text-xs text-(--muted-foreground)">
          Draft educational legal analyses. Direct persistence to MySQL with mandatory source citations.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <div className="font-semibold">{successMessage}</div>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        {/* Core Metadata Card */}
        <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
            Article Metadata
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--foreground)">
              Article Title <span className="text-rose-400">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Understanding Sri Lanka's Computer Crimes Act No. 24 of 2007"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">URL Slug</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="sri-lanka-computer-crimes-act-guide"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">Subtitle (Optional)</label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A Technical & Statutory Analysis"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">
                Topic / Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--primary)"
                disabled={loadingOptions}
                required
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">Jurisdiction</label>
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--primary)"
                disabled={loadingOptions}
              >
                <option value="">Global / Cross-Border</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flagEmoji} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">Audience Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--primary)"
              >
                <option value="BEGINNER">Beginner (Citizens, Students)</option>
                <option value="INTERMEDIATE">Intermediate (Practitioners)</option>
                <option value="ADVANCED">Advanced (Legal Counsel, Judges)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Editorial Content Card */}
        <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
            Article Content
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--foreground)">
              Executive Summary <span className="text-rose-400">*</span>
            </label>
            <Textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Provide a clear, objective synopsis of the legal principle or statutory framework..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--foreground)">
              Full Markdown Content <span className="text-rose-400">*</span>
            </label>
            <Textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="## 1. Statutory Context&#10;&#10;Explain the law, provisions, sanctions, and case applications..."
              className="font-mono text-xs"
              required
            />
          </div>
        </div>

        {/* Citations Card */}
        <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
                Verified Primary Citations
              </h2>
              <p className="text-[11px] text-(--muted-foreground)">
                Official gazettes, treaty articles, court judgments, or regulatory standards.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCitation}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Citation</span>
            </Button>
          </div>

          <div className="space-y-3">
            {citations.map((citation, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-(--border-color) bg-(--bg-surface) space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-(--primary) flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Citation #{index + 1}</span>
                  </span>
                  {citations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCitation(index)}
                      className="text-rose-400 hover:text-rose-300 transition-colors p-1"
                      title="Remove Citation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-(--muted-foreground)">
                      Source Title / Statute
                    </label>
                    <Input
                      value={citation.title}
                      onChange={(e) => updateCitation(index, "title", e.target.value)}
                      placeholder="e.g. Computer Crimes Act No. 24 of 2007, Section 3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-(--muted-foreground)">
                      Official Source URL
                    </label>
                    <Input
                      value={citation.sourceUrl}
                      onChange={(e) => updateCitation(index, "sourceUrl", e.target.value)}
                      placeholder="https://documents.gov.lk/..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-(--muted-foreground)">
                    Exact Statutory Text or Pinpoint Citation
                  </label>
                  <Input
                    value={citation.citationText}
                    onChange={(e) => updateCitation(index, "citationText", e.target.value)}
                    placeholder="e.g. Any person who intentionally causes a computer to perform any function without authority..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-(--muted-foreground)">Target Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) font-semibold"
            >
              <option value="DRAFT">Draft</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, "DRAFT")}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 text-xs font-bold"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving to MySQL...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{status === "PUBLISHED" ? "Publish Article" : "Save Article"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
