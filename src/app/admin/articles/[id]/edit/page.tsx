"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ShieldCheck, Save, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CitationItem {
  id?: string;
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

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [topicId, setTopicId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [difficulty, setDifficulty] = useState("INTERMEDIATE");
  const [sourceQuality, setSourceQuality] = useState("PRIMARY");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [citations, setCitations] = useState<CitationItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [artRes, tRes, cRes] = await Promise.all([
          fetch(`/api/articles/${articleId}`),
          fetch("/api/topics"),
          fetch("/api/countries"),
        ]);

        const artData = await artRes.json();
        const tData = await tRes.json();
        const cData = await cRes.json();

        if (tData.success && Array.isArray(tData.data)) setTopics(tData.data);
        if (cData.success && Array.isArray(cData.data)) setCountries(cData.data);

        if (artData.success && artData.data) {
          const a = artData.data;
          setTitle(a.title || "");
          setSlug(a.slug || "");
          setSubtitle(a.subtitle || "");
          setTopicId(a.topicId || "");
          setCountryId(a.countryId || "");
          setStatus(a.status || "DRAFT");
          setDifficulty(a.difficulty || "INTERMEDIATE");
          setSourceQuality(a.sourceQuality || "PRIMARY");
          setSummary(a.summary || "");
          setContent(a.content || "");
          if (Array.isArray(a.citations)) {
            setCitations(
              a.citations.map((c: { title?: string; sourceUrl?: string; citationText?: string }) => ({
                title: c.title || "",
                sourceUrl: c.sourceUrl || "",
                citationText: c.citationText || "",
              }))
            );
          }
        } else {
          setErrorMessage(artData.error || "Article not found in MySQL.");
        }
      } catch (err) {
        console.error("Failed to load article details:", err);
        setErrorMessage("Failed to load article from database.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [articleId]);

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
    const validCitations = citations.filter((c) => c.title.trim().length > 0);

    if (submitStatus === "PUBLISHED" && validCitations.length === 0) {
      setErrorMessage("At least one verified statutory citation is required to publish an article.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
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
        setErrorMessage(data.error || "Failed to update article in database.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(`Article successfully updated in MySQL as ${submitStatus}!`);
      setTimeout(() => {
        router.push("/admin/articles");
        router.refresh();
      }, 900);
    } catch (err) {
      console.error("Update error:", err);
      setErrorMessage("Network error occurred while updating article.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <span className="w-6 h-6 border-2 border-(--primary) border-t-transparent rounded-full animate-spin inline-block mb-3" />
        <p className="text-xs text-(--muted-foreground)">Loading article record from MySQL...</p>
      </div>
    );
  }

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
        <Link
          href={`/articles/${slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-(--primary) hover:underline font-semibold"
        >
          <span>View Public Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
          Edit Legal Article
        </h1>
        <p className="text-xs text-(--muted-foreground)">
          Modifying record #{articleId}. All updates persist directly to MySQL.
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--foreground)">URL Slug (Permanent)</label>
              <Input value={slug} disabled className="opacity-70 bg-(--bg-surface)/60 cursor-not-allowed" />
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
              placeholder="Provide a clear, objective synopsis..."
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
                  <button
                    type="button"
                    onClick={() => removeCitation(index)}
                    className="text-rose-400 hover:text-rose-300 transition-colors p-1"
                    title="Remove Citation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
                    placeholder="Statutory text..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-(--border-color) bg-(--card-bg)">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-(--muted-foreground)">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--foreground) font-semibold"
            >
              <option value="DRAFT">Draft</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
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
              <span>Save as Draft</span>
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
                  <span>Updating MySQL...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Article</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
