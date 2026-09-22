import Link from "next/link";
import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cyber Law Explorer",
  description: "Browse key concepts, laws, regulations, digital rights, cybercrime topics and legal frameworks from around the world.",
};

const azData: Record<string, Array<{ term: string; slug: string; brief: string }>> = {
  A: [
    { term: "AI Regulation", slug: "ai-regulation", brief: "Legal frameworks governing artificial intelligence systems." },
    { term: "Access Control", slug: "access-control", brief: "Legal requirements around controlling access to computer systems." },
    { term: "Authentication Law", slug: "authentication-law", brief: "Legal frameworks for verifying identity in digital systems." },
  ],
  B: [
    { term: "Budapest Convention", slug: "budapest-convention", brief: "The Council of Europe Convention on Cybercrime — the first international treaty on cybercrime." },
    { term: "Biometric Data", slug: "biometric-data", brief: "Legal protections for fingerprints, facial recognition, and other biometric identifiers." },
    { term: "Breach Notification", slug: "breach-notification", brief: "Legal obligations to report data breaches to authorities and affected individuals." },
  ],
  C: [
    { term: "Cybercrime", slug: "cybercrime", brief: "Criminal offences involving computers, networks, and digital systems." },
    { term: "Copyright", slug: "copyright", brief: "Legal protection of original creative works in the digital environment." },
    { term: "Computer Misuse", slug: "computer-misuse", brief: "Unauthorized access, interference, and misuse of computer systems." },
    { term: "Consent", slug: "consent", brief: "Legal requirements for obtaining permission to process personal data." },
    { term: "Cybersecurity Regulation", slug: "cybersecurity-regulation", brief: "Laws requiring organizations to implement security measures." },
  ],
  D: [
    { term: "Data Protection", slug: "data-protection", brief: "Legal frameworks governing the processing of personal data." },
    { term: "Digital Evidence", slug: "digital-evidence", brief: "Electronic information used in legal proceedings." },
    { term: "Digital Identity", slug: "digital-identity", brief: "Legal recognition and protection of digital identity." },
    { term: "Digital Signature", slug: "digital-signature", brief: "Cryptographic signatures with legal validity." },
    { term: "Data Breach", slug: "data-breach", brief: "Unauthorized access to or disclosure of personal data." },
  ],
  E: [
    { term: "Electronic Evidence", slug: "electronic-evidence", brief: "Digital records and data used in legal proceedings." },
    { term: "Electronic Transactions", slug: "electronic-transactions", brief: "Legal framework for contracts and commerce conducted electronically." },
    { term: "Encryption", slug: "encryption", brief: "Legal issues around data encryption, decryption orders, and key disclosure." },
    { term: "Ethical Hacking", slug: "ethical-hacking", brief: "Authorized security testing within legal boundaries." },
  ],
  F: [
    { term: "Financial Cybercrime", slug: "financial-cybercrime", brief: "Fraud, payment-card crime, and financial crimes using technology." },
    { term: "Fraud", slug: "fraud", brief: "Deception for personal gain using digital means." },
    { term: "Forensics", slug: "forensics", brief: "Digital forensic investigation procedures and legal standards." },
  ],
  G: [
    { term: "GDPR", slug: "gdpr", brief: "The EU General Data Protection Regulation." },
    { term: "Governance", slug: "governance", brief: "Organizational cybersecurity governance and legal obligations." },
  ],
  H: [
    { term: "Hacking", slug: "hacking", brief: "Unauthorized access to computer systems — legal definitions and consequences." },
    { term: "Harassment", slug: "harassment", brief: "Online harassment, cyberbullying, and legal remedies." },
  ],
  I: [
    { term: "Identity Theft", slug: "identity-theft", brief: "Illegal use of another person's identity information." },
    { term: "Intellectual Property", slug: "intellectual-property", brief: "Copyright, trademarks, patents, and trade secrets in cyberspace." },
    { term: "Incident Reporting", slug: "incident-reporting", brief: "Legal obligations for reporting cybersecurity incidents." },
    { term: "International Cooperation", slug: "international-cooperation", brief: "Cross-border cybercrime investigation and mutual legal assistance." },
  ],
  J: [
    { term: "Jurisdiction", slug: "jurisdiction", brief: "Which country's laws apply to cross-border cyber offences." },
  ],
  K: [
    { term: "KYC (Digital)", slug: "kyc-digital", brief: "Know Your Customer requirements in digital financial services." },
  ],
  L: [
    { term: "Lawful Access", slug: "lawful-access", brief: "Legal frameworks for government access to digital communications." },
    { term: "Liability", slug: "liability", brief: "Legal responsibility for cybersecurity failures and data breaches." },
  ],
  M: [
    { term: "Malware", slug: "malware", brief: "Legal classification and penalties for malicious software." },
    { term: "Metadata", slug: "metadata", brief: "Legal significance of data about data in digital investigations." },
  ],
  N: [
    { term: "Network Security Law", slug: "network-security-law", brief: "Legal requirements for protecting network infrastructure." },
    { term: "NIS2", slug: "nis2", brief: "EU directive on security of network and information systems." },
  ],
  O: [
    { term: "Online Safety", slug: "online-safety", brief: "Laws protecting users from harm in digital environments." },
    { term: "Online Harassment", slug: "online-harassment", brief: "Legal remedies for harassment conducted through digital channels." },
  ],
  P: [
    { term: "Privacy", slug: "privacy", brief: "Right to privacy in the digital age." },
    { term: "Phishing", slug: "phishing", brief: "Deceptive communications designed to steal information — legal classification." },
    { term: "Personal Data", slug: "personal-data", brief: "Legal definition and protection of information relating to individuals." },
  ],
  R: [
    { term: "Ransomware", slug: "ransomware", brief: "Legal aspects of ransomware attacks, payments, and reporting." },
    { term: "Right to Privacy", slug: "right-to-privacy", brief: "Constitutional and human rights protections for privacy." },
    { term: "Responsible Disclosure", slug: "responsible-disclosure", brief: "Legal frameworks for reporting security vulnerabilities." },
  ],
  S: [
    { term: "Social Media Law", slug: "social-media-law", brief: "Regulation of social media platforms and user behaviour." },
    { term: "Surveillance", slug: "surveillance", brief: "Legal frameworks for digital surveillance and interception." },
    { term: "Software Licensing", slug: "software-licensing", brief: "Legal issues around software use, distribution, and open source." },
  ],
  T: [
    { term: "Cybercrime Treaties", slug: "cybercrime-treaties", brief: "International agreements on combating cybercrime." },
    { term: "Tracking Technologies", slug: "tracking-technologies", brief: "Legal regulation of cookies, device fingerprinting, and online tracking." },
  ],
  U: [
    { term: "Unauthorized Access", slug: "unauthorized-access", brief: "Accessing computer systems without permission — a core cybercrime offence." },
  ],
  V: [
    { term: "Virtual Assets", slug: "virtual-assets", brief: "Legal classification and regulation of cryptocurrency and digital assets." },
    { term: "Vulnerability Disclosure", slug: "vulnerability-disclosure", brief: "Legal frameworks for reporting security flaws." },
  ],
  W: [
    { term: "Workplace Monitoring", slug: "workplace-monitoring", brief: "Legal boundaries of employee surveillance and digital monitoring." },
  ],
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AZPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <nav className="text-sm text-(--text-dim) mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-(--text-primary) transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-(--text-primary)">Cyber Law Explorer</span>
          </nav>
          <h1
            className="text-4xl font-extrabold text-(--text-primary) mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Explore Cyber Law
          </h1>
          <p className="text-lg text-(--text-muted) leading-relaxed">
            Browse key concepts, laws, regulations, digital rights, cybercrime topics and legal frameworks from around the world.
          </p>
        </div>

        {/* Browse A–Z Feature Section */}
        <div className="mb-6">
          <h2
            className="text-2xl font-bold text-(--text-primary)"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Browse A–Z
          </h2>
          <p className="text-sm text-(--text-muted) mt-1">
            Select a letter to jump directly to legal terms, concepts, and frameworks.
          </p>
        </div>

        {/* Alphabet Navigation */}
        <nav className="sticky top-16 lg:top-18 z-30 bg-(--bg-primary) py-4 border-b border-(--border-color) mb-10" aria-label="Alphabet navigation">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {alphabet.map((letter) => {
              const hasEntries = azData[letter] && azData[letter].length > 0;
              return (
                <a
                  key={letter}
                  href={hasEntries ? `#${letter}` : undefined}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    hasEntries
                      ? "bg-(--bg-surface) border border-(--border-color) text-(--text-secondary) hover:bg-accent-blue/10 hover:text-accent-blue hover:border-accent-blue/30"
                      : "text-(--text-dim) opacity-40 cursor-default"
                  }`}
                  aria-disabled={!hasEntries}
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Letter Sections */}
        <div className="space-y-12">
          {alphabet.map((letter) => {
            const entries = azData[letter];
            if (!entries || entries.length === 0) return null;
            return (
              <section key={letter} id={letter}>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-4xl font-extrabold text-accent-blue"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-(--border-color)" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/glossary/${entry.slug}`}
                      className="group bg-(--bg-surface) border border-(--border-color) rounded-xl p-5 hover:border-(--border-color-hover) hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <h3
                        className="font-semibold text-(--text-primary) mb-1.5 group-hover:text-accent-blue transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {entry.term}
                      </h3>
                      <p className="text-sm text-(--text-muted) leading-relaxed">
                        {entry.brief}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-(--border-color) pt-6 mt-16">
          <div className="flex items-start gap-3">
            <Scale className="w-4 h-4 text-(--text-dim) mt-0.5 shrink-0" />
            <p className="text-xs text-(--text-dim) leading-relaxed max-w-3xl">
              {siteConfig.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
