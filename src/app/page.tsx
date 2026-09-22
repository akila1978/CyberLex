import Link from "next/link";
import {
  Search,
  Shield,
  Lock,
  FileSearch,
  Terminal,
  Brain,
  Scale,
  Globe,
  BookOpen,
  GraduationCap,
  Building2,
  Code2,
  Microscope,
  User,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { siteConfig, countries } from "@/config/site";

/* ============================================================
   CyberLex Home Page
   ============================================================ */

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
      <section className="relative overflow-hidden min-h-160 lg:min-h-180 flex items-center justify-center bg-dark-900">
        {/* Background Video & Overlays Container */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Static fallback for users with reduced motion */}
          <div className="hidden motion-reduce:block absolute inset-0 bg-dark-900 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/30 via-dark-900 to-dark-900" />

          {/* Autoplay Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center pointer-events-none motion-reduce:hidden"
          >
            <source src="/videos/cyberlex-hero.mp4" type="video/mp4" />
          </video>

          {/* Dark Navy Multi-Layer Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-linear-to-r from-[#06101e]/95 via-[#07111f]/85 to-[#07111f]/65" />
          <div className="absolute inset-0 bg-linear-to-b from-dark-900/90 via-dark-900/70 to-dark-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07111F_95%)] opacity-80" />

          {/* Ambient subtle glow orbs */}
          <div className="absolute top-16 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-36 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl opacity-50" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#27B7FF 1px, transparent 1px), linear-gradient(90deg, #27B7FF 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content Container (Layered above video via z-20) */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-20 lg:pb-28 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 mb-8">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">
                Cyber Law • Digital Rights • Online Safety
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-slate-50">Understand the Laws of the </span>
              <span className="bg-linear-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Digital World
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
              {siteConfig.description}
            </p>

            {/* Search Bar Form */}
            <form action="/search" method="GET" className="max-w-2xl mx-auto mb-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-sky-400/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl overflow-hidden shadow-2xl focus-within:ring-4 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
                  <Search className="w-5 h-5 text-slate-500 ml-4 shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search a law, cybercrime, topic or country..."
                    className="w-full px-4 py-4 bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none text-base font-normal"
                    aria-label="Search CyberLex"
                  />
                  <button
                    type="submit"
                    className="bg-accent-blue hover:bg-accent-blue/90 text-slate-950 font-bold px-6 py-2.5 rounded-lg mr-2 transition-colors text-sm shrink-0 shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              <span className="text-xs text-slate-400 font-medium">Popular:</span>
              {["Phishing", "Data Privacy", "Ethical Hacking", "Digital Evidence", "AI Regulation", "GDPR"].map(
                (tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/80 text-slate-200 border border-slate-700/70 hover:border-sky-400 hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/topics"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-slate-950 font-bold rounded-xl transition-all text-base shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/30"
              >
                Explore Cyber Law
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/countries"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-100 font-semibold rounded-xl hover:border-slate-500 transition-all text-base"
              >
                <Globe className="w-4 h-4" />
                Browse by Country
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-y border-(--border-color) bg-(--bg-secondary)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: CheckCircle, text: "Source-backed content" },
              { icon: MapPin, text: "Jurisdiction-aware information" },
              { icon: Clock, text: "Regular legal updates" },
              { icon: BookOpen, text: "Educational — not legal advice" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2.5"
              >
                <item.icon className="w-4 h-4 text-accent-blue shrink-0" />
                <span className="text-sm text-(--text-muted)">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR TOPICS ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-(--text-primary) mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Explore Cyber Law Topics
            </h2>
            <p className="text-(--text-muted) max-w-xl mx-auto">
              Navigate the complex landscape of digital regulation through clear, structured educational content.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: "Cybercrime",
                description: "Unauthorized access, hacking, malware, phishing, identity theft, and cyber fraud laws.",
                href: "/topics/cybercrime",
                color: "from-blue-500/10 to-blue-600/5",
                iconColor: "text-blue-400",
              },
              {
                icon: Lock,
                title: "Privacy & Data Protection",
                description: "Personal data rights, GDPR, consent, breach notification, and international transfers.",
                href: "/topics/data-protection",
                color: "from-emerald-500/10 to-emerald-600/5",
                iconColor: "text-emerald-400",
              },
              {
                icon: FileSearch,
                title: "Digital Evidence",
                description: "Electronic records, chain of custody, forensic imaging, metadata, and admissibility.",
                href: "/topics/digital-evidence",
                color: "from-amber-500/10 to-amber-600/5",
                iconColor: "text-amber-400",
              },
              {
                icon: Terminal,
                title: "Ethical Hacking & Law",
                description: "Authorization, penetration testing, responsible disclosure, and bug bounty frameworks.",
                href: "/topics/ethical-hacking",
                color: "from-violet-500/10 to-violet-600/5",
                iconColor: "text-violet-400",
              },
              {
                icon: Brain,
                title: "AI & Law",
                description: "AI regulation, deepfakes, automated decision-making, algorithmic accountability.",
                href: "/topics/ai-law",
                color: "from-pink-500/10 to-pink-600/5",
                iconColor: "text-pink-400",
              },
              {
                icon: Scale,
                title: "Digital Rights",
                description: "Privacy, freedom of expression, surveillance, encryption, and access rights.",
                href: "/topics/digital-rights",
                color: "from-cyan-500/10 to-cyan-600/5",
                iconColor: "text-cyan-400",
              },
            ].map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group relative bg-(--bg-surface) border border-(--border-color) rounded-xl p-6 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${topic.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-(--bg-secondary) flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <topic.icon className={`w-5 h-5 ${topic.iconColor}`} />
                  </div>
                  <h3
                    className="font-semibold text-(--text-primary) mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-sm text-(--text-muted) leading-relaxed">
                    {topic.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              View all 17 topics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BROWSE BY COUNTRY ===== */}
      <section className="py-16 lg:py-24 bg-(--bg-secondary)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-(--text-primary) mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Browse by Country
            </h2>
            <p className="text-(--text-muted) max-w-xl mx-auto">
              Explore cyber law frameworks across jurisdictions. Each country profile covers cybercrime, data protection, electronic transactions, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <Link
                key={country.code}
                href={`/countries/${country.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-(--bg-surface) border border-(--border-color) rounded-xl p-5 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                <span className="text-3xl mb-3 block" role="img" aria-label={`${country.name} flag`}>
                  {country.flag}
                </span>
                <h3 className="font-semibold text-sm text-(--text-primary) mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {country.name}
                </h3>
                <span className="text-xs text-(--text-dim)">{country.region}</span>
              </Link>
            ))}
            {/* More countries coming */}
            <div className="bg-(--bg-surface) border border-dashed border-(--border-color) rounded-xl p-5 flex flex-col items-center justify-center text-center opacity-60">
              <Globe className="w-6 h-6 text-(--text-dim) mb-2" />
              <span className="text-xs text-(--text-dim)">More countries coming</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUDIENCE PATHS ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-(--text-primary) mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find What Matters to You
            </h2>
            <p className="text-(--text-muted)">
              I&apos;m a...
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: GraduationCap,
                role: "Student",
                description: "Learn the fundamentals of cyber law, digital rights, and online regulation.",
                href: "/learn",
              },
              {
                icon: User,
                role: "Internet User",
                description: "Understand your rights online and what to do if something goes wrong.",
                href: "/scenarios",
              },
              {
                icon: ShieldCheck,
                role: "Cybersecurity Professional",
                description: "Ethical hacking law, incident reporting, data breach regulation, compliance.",
                href: "/topics/cybersecurity-compliance",
              },
              {
                icon: Building2,
                role: "Business Owner",
                description: "Data protection obligations, cybersecurity compliance, electronic transactions.",
                href: "/topics/data-protection",
              },
              {
                icon: Code2,
                role: "Developer",
                description: "Software licensing, responsible disclosure, privacy by design, API law.",
                href: "/topics/intellectual-property",
              },
              {
                icon: Microscope,
                role: "Researcher",
                description: "Source-backed legal analysis, international comparisons, case studies.",
                href: "/resources",
              },
            ].map((path) => (
              <Link
                key={path.role}
                href={path.href}
                className="group bg-(--bg-surface) border border-(--border-color) rounded-xl p-6 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300"
              >
                <path.icon className="w-8 h-8 text-accent-blue mb-4 group-hover:scale-110 transition-transform" />
                <h3
                  className="font-semibold text-(--text-primary) mb-1.5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {path.role}
                </h3>
                <p className="text-sm text-(--text-muted) leading-relaxed">
                  {path.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED GUIDES ===== */}
      <section className="py-16 lg:py-24 bg-(--bg-secondary)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2
                className="text-3xl font-bold text-(--text-primary) mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Featured Guides
              </h2>
              <p className="text-(--text-muted)">
                Start with the fundamentals of cyber law.
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "What Is Cyber Law?",
                description: "A foundational guide to the legal frameworks governing digital activity, cybercrime, and online rights.",
                category: "Foundations",
                readTime: "8 min read",
                href: "/learn/what-is-cyber-law",
              },
              {
                title: "Cybercrime Explained",
                description: "Understanding unauthorized access, hacking, malware, phishing, and other computer offences from a legal perspective.",
                category: "Cybercrime",
                readTime: "12 min read",
                href: "/learn/cybercrime-explained",
              },
              {
                title: "Privacy vs Data Protection",
                description: "These terms are often confused. Learn the legal distinctions and why both matter in the digital age.",
                category: "Privacy",
                readTime: "10 min read",
                href: "/learn/privacy-vs-data-protection",
              },
              {
                title: "What Is Digital Evidence?",
                description: "How electronic records, metadata, and digital forensics interact with legal proceedings.",
                category: "Digital Evidence",
                readTime: "9 min read",
                href: "/learn/what-is-digital-evidence",
              },
              {
                title: "Ethical Hacking and Authorization",
                description: "Technical ability does not create legal authority. Understanding the legal boundaries of security testing.",
                category: "Ethical Hacking",
                readTime: "11 min read",
                href: "/learn/ethical-hacking-authorization",
              },
              {
                title: "Understanding GDPR",
                description: "The EU General Data Protection Regulation explained — scope, principles, rights, and compliance requirements.",
                category: "Data Protection",
                readTime: "15 min read",
                href: "/learn/what-is-gdpr",
              },
            ].map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-(--bg-surface) border border-(--border-color) rounded-xl overflow-hidden hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Colored top accent */}
                <div className="h-1 bg-linear-to-r from-accent-blue to-accent-purple" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent-blue/10 text-accent-blue">
                      {guide.category}
                    </span>
                    <span className="text-xs text-(--text-dim)">{guide.readTime}</span>
                  </div>
                  <h3
                    className="font-semibold text-(--text-primary) mb-2 group-hover:text-accent-blue transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {guide.title}
                  </h3>
                  <p className="text-sm text-(--text-muted) leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CYBER LAW EXPLORER PREVIEW ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold text-(--text-primary) mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cyber Law Explorer
            </h2>
            <p className="text-(--text-muted) max-w-xl mx-auto">
              Browse key concepts, laws, regulations, digital rights, and cybercrime topics alphabetically.
            </p>
          </div>

          {/* Alphabet strip */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <Link
                key={letter}
                href={`/a-z#${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold bg-(--bg-surface) border border-(--border-color) text-(--text-secondary) hover:bg-accent-blue/10 hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
              >
                {letter}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/a-z"
              className="inline-flex items-center gap-2 px-6 py-3 bg-(--bg-surface) border border-(--border-color) text-(--text-primary) font-semibold rounded-xl hover:border-(--border-color-hover) transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Open Cyber Law Explorer
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 lg:py-24 bg-(--bg-secondary)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-linear-to-br from-dark-700 to-dark-800 rounded-2xl p-8 lg:p-16 overflow-hidden border border-(--border-color)">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-purple/5 rounded-full blur-3xl" />
            </div>
            <div className="relative text-center max-w-2xl mx-auto">
              <h2
                className="text-3xl lg:text-4xl font-bold text-(--text-primary) mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Understand Something That Happened Online?
              </h2>
              <p className="text-(--text-muted) mb-8 text-lg">
                Use our scenario guides to learn what steps to take, how to preserve evidence, and where to report incidents in your jurisdiction.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/scenarios"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-dark-900 font-semibold rounded-xl transition-all text-base"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Find Guidance
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-(--bg-surface) border border-(--border-color) text-(--text-primary) font-semibold rounded-xl hover:border-(--border-color-hover) transition-all text-base"
                >
                  <GraduationCap className="w-5 h-5" />
                  Take a Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISCLAIMER ===== */}
      <section className="py-8 border-t border-(--border-color)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Scale className="w-4 h-4 text-(--text-dim) mt-0.5 shrink-0" />
            <p className="text-xs text-(--text-dim) leading-relaxed max-w-4xl">
              {siteConfig.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
