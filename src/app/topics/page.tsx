import Link from "next/link";
import type { Metadata } from "next";
import {
  Shield,
  Lock,
  Database,
  FileSearch,
  MessageCircle,
  Terminal,
  CreditCard,
  Brain,
  Copyright,
  CheckCircle,
  Scale,
  ShieldCheck,
  Wallet,
  Users,
  Building,
  Cloud,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Topics",
  description: "Explore all cyber law topics including cybercrime, privacy, data protection, digital evidence, AI regulation, and more.",
};

const topics = [
  {
    icon: Shield,
    title: "Cybercrime",
    slug: "cybercrime",
    description: "Unauthorized access, hacking, malware, ransomware, phishing, identity theft, fraud, and other computer offences. Understand definitions, penalties, victim guidance, and reporting.",
    articleCount: 12,
    color: "from-blue-500/15 to-blue-600/5",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Privacy",
    slug: "privacy",
    description: "Right to privacy, surveillance, anonymity, government access to data, encryption, and privacy-related legal frameworks across jurisdictions.",
    articleCount: 8,
    color: "from-emerald-500/15 to-emerald-600/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: Database,
    title: "Data Protection",
    slug: "data-protection",
    description: "Personal data, consent, lawful basis, breach notification, data subject rights, international transfers, GDPR, and data protection authorities.",
    articleCount: 15,
    color: "from-green-500/15 to-green-600/5",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
  },
  {
    icon: FileSearch,
    title: "Digital Evidence",
    slug: "digital-evidence",
    description: "Electronic records, metadata, chain of custody, forensic imaging, hashing, admissibility, and evidence preservation across legal systems.",
    articleCount: 7,
    color: "from-amber-500/15 to-amber-600/5",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    slug: "social-media",
    description: "Online harassment, cyberbullying, impersonation, fake accounts, doxxing, defamation, platform moderation, and evidence preservation.",
    articleCount: 9,
    color: "from-rose-500/15 to-rose-600/5",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: Terminal,
    title: "Ethical Hacking",
    slug: "ethical-hacking",
    description: "Authorization, penetration testing, responsible disclosure, bug bounty programs, Rules of Engagement, and the legal boundaries of security testing.",
    articleCount: 6,
    color: "from-violet-500/15 to-violet-600/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: CreditCard,
    title: "Electronic Transactions",
    slug: "electronic-transactions",
    description: "Electronic contracts, digital signatures, e-commerce, clickwrap agreements, certification authorities, and electronic records.",
    articleCount: 5,
    color: "from-sky-500/15 to-sky-600/5",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
  },
  {
    icon: Brain,
    title: "AI & Law",
    slug: "ai-law",
    description: "AI regulation, deepfakes, generative AI, automated decision-making, facial recognition, AI liability, algorithmic accountability, and synthetic media.",
    articleCount: 10,
    color: "from-pink-500/15 to-pink-600/5",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
  },
  {
    icon: Copyright,
    title: "Intellectual Property",
    slug: "intellectual-property",
    description: "Copyright, software licensing, trademarks, digital piracy, source code ownership, open-source licenses, trade secrets, and AI-generated works.",
    articleCount: 8,
    color: "from-orange-500/15 to-orange-600/5",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: CheckCircle,
    title: "Cybersecurity Compliance",
    slug: "cybersecurity-compliance",
    description: "Governance, risk management, incident reporting, critical infrastructure, supply-chain risk, NIST, ISO 27001, and regulatory frameworks.",
    articleCount: 7,
    color: "from-teal-500/15 to-teal-600/5",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10",
  },
  {
    icon: Scale,
    title: "Digital Rights",
    slug: "digital-rights",
    description: "Freedom of expression, data rights, surveillance, anonymity, encryption, online access, content moderation, and digital identity.",
    articleCount: 6,
    color: "from-cyan-500/15 to-cyan-600/5",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Online Safety",
    slug: "online-safety",
    description: "Online harassment, cyberstalking, threats, non-consensual sharing, reporting mechanisms, and platform safety obligations.",
    articleCount: 5,
    color: "from-indigo-500/15 to-indigo-600/5",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
  },
  {
    icon: Wallet,
    title: "FinTech & Cybercrime",
    slug: "fintech-cybercrime",
    description: "Financial cybercrime, payment fraud, cryptocurrency, virtual assets, money laundering, and digital financial regulation.",
    articleCount: 4,
    color: "from-yellow-500/15 to-yellow-600/5",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
  },
  {
    icon: Users,
    title: "Children Online",
    slug: "children-online",
    description: "Children's data protection, age verification, COPPA, online grooming, cyberbullying of minors, and parental consent.",
    articleCount: 4,
    color: "from-fuchsia-500/15 to-fuchsia-600/5",
    iconColor: "text-fuchsia-400",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    icon: Building,
    title: "Workplace Technology",
    slug: "workplace-technology",
    description: "Workplace monitoring, employee privacy, BYOD policies, remote work surveillance, and technology-related employment law.",
    articleCount: 3,
    color: "from-slate-500/15 to-slate-600/5",
    iconColor: "text-slate-400",
    iconBg: "bg-slate-500/10",
  },
  {
    icon: Cloud,
    title: "Cloud & Data",
    slug: "cloud-data",
    description: "Cloud security responsibilities, data sovereignty, cross-border data storage, shared responsibility models, and cloud compliance.",
    articleCount: 4,
    color: "from-blue-400/15 to-blue-500/5",
    iconColor: "text-blue-300",
    iconBg: "bg-blue-400/10",
  },
  {
    icon: Globe,
    title: "International Cooperation",
    slug: "international-cooperation",
    description: "Budapest Convention, mutual legal assistance, cross-border investigations, jurisdiction, extradition, and UN cybercrime instruments.",
    articleCount: 5,
    color: "from-emerald-400/15 to-emerald-500/5",
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
  },
];

export default function TopicsPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <nav className="text-sm text-(--text-dim) mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-(--text-primary) transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-(--text-primary)">Topics</span>
          </nav>
          <h1
            className="text-4xl font-extrabold text-(--text-primary) mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cyber Law Topics
          </h1>
          <p className="text-lg text-(--text-muted) leading-relaxed">
            Explore the complete landscape of digital regulation. Each topic area contains educational articles, legal frameworks, practical guidance, and jurisdiction-specific information.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group relative bg-(--bg-surface) border border-(--border-color) rounded-xl p-6 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl ${topic.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <topic.icon className={`w-5 h-5 ${topic.iconColor}`} />
                </div>
                <h2
                  className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-accent-blue transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {topic.title}
                </h2>
                <p className="text-sm text-(--text-muted) leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-(--text-dim)">
                    {topic.articleCount} articles
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
