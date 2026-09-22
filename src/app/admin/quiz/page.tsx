"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Plus, Trash2, Edit3, X, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface TopicOption {
  id: string;
  name: string;
  slug: string;
}

interface QuizItem {
  id: string;
  question: string;
  topicId: string;
  topic: { id: string; name: string; slug: string };
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  options: string[];
  correctIndex: number;
  explanation: string;
  statutoryContext?: string | null;
}

export default function AdminQuizPage() {
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<QuizItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [questionText, setQuestionText] = useState("");
  const [topicId, setTopicId] = useState("");
  const [difficulty, setDifficulty] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [statutoryContext, setStatutoryContext] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/quiz");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setQuestions(data.data);
      }
    } catch (err) {
      console.error("Failed to load quiz questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const [qRes, tRes] = await Promise.all([fetch("/api/quiz"), fetch("/api/topics")]);
        const qData = await qRes.json();
        const tData = await tRes.json();
        if (!ignore) {
          if (qData.success && Array.isArray(qData.data)) setQuestions(qData.data);
          if (tData.success && Array.isArray(tData.data)) {
            setTopics(tData.data);
            if (tData.data.length > 0) {
              setTopicId((prev) => prev || tData.data[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load initial data:", err);
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
    setQuestionText("");
    if (topics.length > 0) setTopicId(topics[0].id);
    setDifficulty("BEGINNER");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setCorrectIndex(0);
    setExplanation("");
    setStatutoryContext("");
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleEditClick = (q: QuizItem) => {
    setEditingItem(q);
    setQuestionText(q.question);
    setTopicId(q.topicId);
    setDifficulty(q.difficulty);
    const opts = Array.isArray(q.options) ? q.options : [];
    setOpt0(opts[0] || "");
    setOpt1(opts[1] || "");
    setOpt2(opts[2] || "");
    setOpt3(opts[3] || "");
    setCorrectIndex(q.correctIndex);
    setExplanation(q.explanation);
    setStatutoryContext(q.statutoryContext || "");
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    const options = [opt0, opt1, opt2, opt3].map((s) => s.trim()).filter(Boolean);
    if (options.length < 2) {
      setMsg({ type: "error", text: "Please provide at least 2 distinct multiple choice options." });
      setSubmitting(false);
      return;
    }

    if (correctIndex >= options.length) {
      setMsg({ type: "error", text: "The selected correct answer option is empty." });
      setSubmitting(false);
      return;
    }

    const payload = {
      question: questionText,
      topicId,
      difficulty,
      options,
      correctIndex,
      explanation,
      statutoryContext: statutoryContext || null,
    };

    try {
      const url = editingItem ? `/api/quiz/${editingItem.id}` : "/api/quiz";
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
            ? "Quiz question updated successfully in MySQL!"
            : "New statutory quiz question created successfully in MySQL!",
        });
        resetForm();
        fetchQuestions();
      } else {
        setMsg({ type: "error", text: data.error || "Failed to save quiz question." });
      }
    } catch {
      setMsg({ type: "error", text: "Network error saving quiz question." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this quiz question from MySQL?")) return;
    try {
      const res = await fetch(`/api/quiz/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
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
            Interactive Quiz Repository
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Knowledge assessment items, statutory explanations, and learning tier questions in MySQL.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/quiz"
            target="_blank"
            className="text-xs text-(--primary) hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Public Quiz</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              if (isAdding) resetForm();
              else setIsAdding(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isAdding ? "Close Form" : "Add Question"}</span>
          </Button>
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

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-(--border-color) pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-(--foreground)">
              {editingItem ? "Edit Quiz Question" : "Compose New Quiz Question"}
            </h2>
            <button type="button" onClick={resetForm} className="text-(--muted-foreground) hover:text-(--foreground)">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-(--foreground)">Topic Category <span className="text-rose-400">*</span></label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full text-xs rounded-xl border border-(--border-color) bg-(--card-bg) px-3 py-2 text-(--foreground) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                required
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--foreground)">Difficulty Tier <span className="text-rose-400">*</span></label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED")}
                className="w-full text-xs rounded-xl border border-(--border-color) bg-(--card-bg) px-3 py-2 text-(--foreground) focus:outline-none focus:ring-1 focus:ring-(--primary)"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Question Prompt <span className="text-rose-400">*</span></label>
            <Textarea rows={2} value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="e.g. Under Section 4 of Sri Lanka's Computer Crimes Act No. 24 of 2007, what specific mental state is required...?" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-(--foreground) block">
              Multiple Choice Options & Correct Selection <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctIndex === 0}
                  onChange={() => setCorrectIndex(0)}
                  className="w-4 h-4 text-(--primary) accent-(--primary)"
                />
                <Input value={opt0} onChange={(e) => setOpt0(e.target.value)} placeholder="Option A (required)" required />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctIndex === 1}
                  onChange={() => setCorrectIndex(1)}
                  className="w-4 h-4 text-(--primary) accent-(--primary)"
                />
                <Input value={opt1} onChange={(e) => setOpt1(e.target.value)} placeholder="Option B (required)" required />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctIndex === 2}
                  onChange={() => setCorrectIndex(2)}
                  className="w-4 h-4 text-(--primary) accent-(--primary)"
                />
                <Input value={opt2} onChange={(e) => setOpt2(e.target.value)} placeholder="Option C" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctIndex === 3}
                  onChange={() => setCorrectIndex(3)}
                  className="w-4 h-4 text-(--primary) accent-(--primary)"
                />
                <Input value={opt3} onChange={(e) => setOpt3(e.target.value)} placeholder="Option D" />
              </div>
            </div>
            <p className="text-[11px] text-(--muted-foreground)">Radio selection indicates the legally verified correct answer option.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Statutory Explanation & Legal Rationale <span className="text-rose-400">*</span></label>
            <Textarea rows={3} value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Detailed explanation citing the applicable statutory provision or judicial precedent..." required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--foreground)">Statutory Citation / Section Reference</label>
            <Input value={statutoryContext} onChange={(e) => setStatutoryContext(e.target.value)} placeholder="e.g. Computer Crimes Act No. 24 of 2007, Section 4" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving to MySQL..." : editingItem ? "Update Question" : "Save Question to MySQL"}
            </Button>
          </div>
        </form>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center text-xs text-(--muted-foreground)">
            Loading quiz questions from MySQL...
          </div>
        ) : questions.length === 0 ? (
          <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center text-xs text-(--muted-foreground)">
            No quiz questions in MySQL yet. Click &quot;Add Question&quot; above to create one.
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-3 shadow-sm hover:border-(--primary)/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-(--primary) uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Question #{idx + 1} &bull; {q.topic?.name || "General"}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {q.difficulty}
                  </span>
                  <button
                    onClick={() => handleEditClick(q)}
                    className="p-1 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors"
                    title="Edit Question"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-(--foreground)">{q.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(Array.isArray(q.options) ? q.options : []).map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl border ${
                      oIdx === q.correctIndex
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold"
                        : "border-(--border-color) bg-(--bg-surface) text-(--muted-foreground)"
                    }`}
                  >
                    <span className="font-mono text-[10px] mr-1.5 opacity-70">
                      {String.fromCharCode(65 + oIdx)}.
                    </span>
                    <span>{opt}</span>
                    {oIdx === q.correctIndex && (
                      <span className="ml-2 text-[10px] uppercase font-bold text-emerald-400">&bull; Correct</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-(--bg-surface) border border-(--border-color) text-xs">
                <span className="font-semibold text-(--muted-foreground) block mb-1">
                  Statutory Explanation:
                </span>
                <p className="text-(--foreground)">{q.explanation}</p>
                {q.statutoryContext && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reference: {q.statutoryContext}</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
