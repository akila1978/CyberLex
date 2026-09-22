"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import { LexGuideMessage } from "@/lib/lexguide/types";

export function LexGuideWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<LexGuideMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am LexGuide, CyberLex's educational AI assistant. Ask me questions about cybercrime laws, GDPR, Sri Lanka's Computer Crimes Act, or digital evidence admissibility.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: LexGuideMessage = {
      role: "user",
      content: input,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/lexguide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.content,
          history: messages,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        const assistantMessage: LexGuideMessage = {
          role: "assistant",
          content: json.data.answer,
          citations: json.data.citations,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(json.error || "Failed to generate response");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error searching the legal knowledge base. Please try rephrasing your inquiry.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Ask LexGuide Legal Assistant"
      >
        <Bot className="w-5 h-5" />
        <span className="text-sm font-bold tracking-wide">Ask LexGuide</span>
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
      </button>

      {/* Slide-over / Modal Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-105 h-137.5 max-h-[80vh] z-50 flex flex-col rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-(--border-color) bg-linear-to-r from-blue-600/10 via-indigo-600/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-(--primary) text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-(--foreground) font-heading flex items-center gap-1.5">
                  <span>LexGuide</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-(--primary)/10 text-(--primary) border border-(--primary)/20 font-sans">
                    RAG Assistant
                  </span>
                </h3>
                <p className="text-[11px] text-(--muted-foreground)">Educational Legal AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--border-color)/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Legal Notice Ribbon */}
          <div className="px-3.5 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-[10px] text-amber-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Educational guidance only • Not official legal advice</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-(--primary) text-white rounded-br-none"
                      : "bg-(--bg-surface) border border-(--border-color) text-(--foreground) rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.content}

                  {/* Render citations if present */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-(--border-color)/60 text-[10px]">
                      <span className="font-bold text-(--primary) block mb-1">
                        Primary Statutory Citations:
                      </span>
                      <ul className="space-y-1">
                        {m.citations.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-center justify-between text-(--muted-foreground)">
                            <span>
                              {c.statute} {c.section ? `(${c.section})` : ""}
                            </span>
                            {c.url && (
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-(--primary) hover:underline ml-1"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-(--muted-foreground) p-2">
                <Bot className="w-4 h-4 animate-spin text-(--primary)" />
                <span>LexGuide is consulting the legal knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-(--border-color) bg-(--card-bg)">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cyber laws, CFAA, GDPR..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-(--border-color) bg-(--bg-surface) text-xs text-(--foreground) placeholder:text-(--muted-foreground)/60 focus:outline-none focus:ring-1 focus:ring-(--primary)"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-1.5 p-1.5 rounded-lg bg-(--primary) text-white hover:bg-(--primary)/90 disabled:opacity-40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
