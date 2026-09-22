"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to transmit message. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error occurred. Please verify your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact & Editorial Inquiries" }]} className="mb-8" />

        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-(--primary)/10 text-(--primary) border border-(--primary)/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Editorial & Community Communication</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Contact CyberLex
          </h1>
          <p className="text-base text-(--muted-foreground) max-w-2xl">
            Have questions about a legal analysis, want to suggest an official statute citation, or need to submit a factual correction?
            Our editorial research team reviews every submission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details & Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
              <h3 className="text-base font-bold text-(--foreground) mb-2 font-heading">
                Editorial Corrections
              </h3>
              <p className="text-xs text-(--muted-foreground) leading-relaxed">
                Found an outdated statutory reference, amended provision, or broken primary source link? Select &quot;Editorial Correction&quot; so our legal researchers can verify and patch the record immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
              <h3 className="text-base font-bold text-(--foreground) mb-2 font-heading">
                Academic & Educational Use
              </h3>
              <p className="text-xs text-(--muted-foreground) leading-relaxed">
                If you are a lecturer, researcher, or institution utilizing CyberLex for coursework or training, let us know how we can tailor our learning paths to assist your curriculum.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-(--foreground) mb-2 font-heading">
                  Message Dispatched
                </h3>
                <p className="text-sm text-(--muted-foreground) max-w-md mx-auto mb-6">
                  Thank you for reaching out. Your inquiry has been received by our editorial research desk. We will review and respond promptly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", category: "general", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="name"
                    required
                    placeholder="e.g. Dr. Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. j.smith@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Inquiry Category"
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    options={[
                      { value: "general", label: "General Inquiry" },
                      { value: "correction", label: "Editorial Correction" },
                      { value: "statute-suggestion", label: "Suggest Primary Law" },
                      { value: "academic", label: "Academic / Classroom Access" },
                      { value: "partnership", label: "Institutional Partnership" },
                    ]}
                  />
                  <Input
                    label="Subject"
                    id="subject"
                    required
                    placeholder="e.g. Statutory amendment to Section 4"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Detailed Message"
                  id="message"
                  required
                  rows={5}
                  placeholder="Detail your inquiry, proposed citation, or factual observation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="w-full sm:w-auto font-bold"
                >
                  {submitting ? "Transmitting..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
