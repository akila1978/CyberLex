import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowLeft, ArrowRight, ShieldCheck, Scale, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const moduleContents: Record<
  string,
  {
    number: string;
    title: string;
    readTime: string;
    level: string;
    summary: string;
    sections: { heading: string; body: string }[];
    keyTakeaways: string[];
    relatedStatutes: string[];
    nextSlug?: string;
    nextTitle?: string;
  }
> = {
  "what-is-cyber-law": {
    number: "01",
    title: "What Is Cyber Law?",
    readTime: "8 min",
    level: "Beginner",
    summary:
      "An introduction to the legal frameworks governing digital activity, the architecture of cyberspace, and how traditional legal doctrines adapt to global network realities.",
    sections: [
      {
        heading: "1. The Scope and Domain of Cyber Law",
        body: "Cyber law encompasses all legal principles, statutes, and judicial rules dealing with computer networks, software, internet communications, and digital data. Far from a separate isolated legal domain, it intersects with criminal law, constitutional rights, contracts, intellectual property, and international law.",
      },
      {
        heading: "2. The Jurisdictional Conundrum: Borders vs. The Global Network",
        body: "Traditional legal sovereignty is rooted in physical territory. When an attacker in Country A uses a compromised cloud server in Country B to steal credentials from a bank in Country C, determining applicable law and investigative power requires multilateral frameworks like the Budapest Convention and bilateral extradition treaties.",
      },
      {
        heading: "3. Core Sub-Disciplines of Cyber Law",
        body: "Modern cyber law branches into cybercrime prosecution, data privacy and personal protection, digital evidence standards, cybersecurity compliance (e.g., NIS2, NIST), electronic commerce validity, and emerging regulation for artificial intelligence.",
      },
    ],
    keyTakeaways: [
      "Cyber law is horizontal: it applies traditional branches of law to digital environments.",
      "Extraterritoriality and multi-jurisdiction enforcement are defining challenges.",
      "Understanding statutory definitions (e.g., 'unauthorized access') is essential for both defense and compliance.",
    ],
    relatedStatutes: ["Budapest Convention on Cybercrime", "Sri Lanka Computer Crimes Act No. 24 of 2007", "US CFAA (18 U.S.C. § 1030)"],
    nextSlug: "cybercrime-explained",
    nextTitle: "02: Cybercrime Explained",
  },
  "cybercrime-explained": {
    number: "02",
    title: "Cybercrime Explained",
    readTime: "12 min",
    level: "Beginner to Intermediate",
    summary:
      "A deep examination of computer-specific offenses, computer-enabled crimes, malicious software deployment, denial-of-service, and statutory definitions of unauthorized access.",
    sections: [
      {
        heading: "1. Computer-Specific vs. Computer-Enabled Crimes",
        body: "Computer-specific crimes (or cyber-dependent offenses) cannot exist without digital technology—such as Distributed Denial of Service (DDoS), ransomware payload execution, and unauthorized network penetration. Computer-enabled offenses are traditional crimes (fraud, harassment, extortion, intellectual property theft) facilitated at massive scale via digital channels.",
      },
      {
        heading: "2. The Legal Element of Mens Rea (Criminal Intent)",
        body: "In virtually all cybercrime statutes, conviction requires proving both actus reus (the prohibited conduct) and mens rea (guilty mind/criminal intent). Accidental pinging of a server or automated browser requests generally lack the criminal intent required for hacking convictions.",
      },
      {
        heading: "3. Penalties and Enforcement Mechanisms",
        body: "Penalties range from substantial statutory fines to multi-decade prison sentences for attacks on Critical National Infrastructure (CNI), as seen in European and US federal sentencing guidelines.",
      },
    ],
    keyTakeaways: [
      "Computer-dependent crimes target data and system integrity directly.",
      "Intent (mens rea) is the crucial legal boundary between authorized testing and unauthorized intrusion.",
      "Attacks against critical infrastructure incur elevated statutory penalties worldwide.",
    ],
    relatedStatutes: ["EU Cybercrime Directive 2013/40/EU", "Sri Lanka Computer Crimes Act Section 3-6", "UK Computer Misuse Act 1990"],
    nextSlug: "privacy",
    nextTitle: "03: Privacy in the Digital Age",
  },
  "privacy": {
    number: "03",
    title: "Privacy",
    readTime: "10 min",
    level: "Beginner",
    summary:
      "Understanding constitutional privacy rights, government surveillance limits, digital communication tracking, and fundamental human rights instruments.",
    sections: [
      {
        heading: "1. Privacy as a Fundamental Human Right",
        body: "Article 12 of the Universal Declaration of Human Rights (UDHR) and Article 17 of the International Covenant on Civil and Political Rights (ICCPR) establish that no one shall be subjected to arbitrary interference with their privacy, family, home or correspondence. In the digital age, correspondence encompasses encrypted chats, location telemetry, and browsing histories.",
      },
      {
        heading: "2. Reasonable Expectation of Privacy in Cyberspace",
        body: "Judicial doctrines worldwide have had to determine what privacy expectations exist when data is stored on cloud servers. Landmark rulings like Carpenter v. United States confirmed that modern digital telemetry reveals an intimate window into a person's life that warrants constitutional fourth-amendment protection.",
      },
      {
        heading: "3. State Surveillance and National Security Limits",
        body: "Statutes such as the US Foreign Intelligence Surveillance Act (FISA § 702) and European judicial decisions (Schrems II) establish that bulk data interception without targeted judicial oversight violates international fundamental rights standards.",
      },
    ],
    keyTakeaways: [
      "Privacy is protected under international human rights law as well as constitutional provisions.",
      "Third-party cloud storage creates complex legal questions regarding government access.",
      "Warrant requirements and judicial oversight remain the primary safeguards against arbitrary surveillance.",
    ],
    relatedStatutes: ["ICCPR Article 17", "Carpenter v. United States, 585 U.S. 296 (2018)", "EU Charter of Fundamental Rights Art. 7-8"],
    nextSlug: "data-protection",
    nextTitle: "04: Data Protection",
  },
  "data-protection": {
    number: "04",
    title: "Data Protection",
    readTime: "15 min",
    level: "Intermediate",
    summary:
      "Comprehensive breakdown of personal data rights, statutory processing principles under the GDPR, lawful bases, data subject entitlements, and mandatory breach notification.",
    sections: [
      {
        heading: "1. Core Principles of Data Protection Law",
        body: "Modern data protection regimes—epitomized by the EU General Data Protection Regulation (GDPR Art. 5)—rest on six core principles: Lawfulness, Fairness and Transparency; Purpose Limitation; Data Minimisation; Accuracy; Storage Limitation; and Integrity and Confidentiality (Security). The overarching principle of Accountability requires organizations to actively demonstrate compliance.",
      },
      {
        heading: "2. Lawful Grounds for Processing Personal Data",
        body: "Under Article 6 GDPR and mirrored statutes (such as Sri Lanka PDPA No. 9 of 2022 and UK Data Protection Act 2018), processing is unlawful unless backed by a valid statutory basis: Consent, Contract Performance, Legal Obligation, Vital Interests, Public Task, or Legitimate Interests.",
      },
      {
        heading: "3. Data Subject Rights & Mandatory Breach Reporting",
        body: "Individuals enjoy enforceable statutory rights: Right of Access, Rectification, Erasure ('Right to be Forgotten'), Restriction, Portability, and Objection. When personal data breaches occur, controllers must notify regulatory authorities within strict deadlines (e.g. 72 hours under GDPR Art. 33, 6 hours under India CERT-In directions).",
      },
    ],
    keyTakeaways: [
      "Data protection regulates the processing lifecycle of personal data belonging to identifiable living natural persons.",
      "Consent is only one of six lawful bases; relying on it improperly creates severe regulatory compliance exposure.",
      "Mandatory 72-hour breach notification rules require pre-established incident response procedures.",
    ],
    relatedStatutes: ["EU GDPR (Regulation 2016/679)", "Sri Lanka Personal Data Protection Act No. 9 of 2022", "UK Data Protection Act 2018"],
    nextSlug: "digital-evidence",
    nextTitle: "05: Digital Evidence",
  },
  "digital-evidence": {
    number: "05",
    title: "Digital Evidence",
    readTime: "9 min",
    level: "Intermediate",
    summary:
      "Forensic acquisition standards, chain of custody, cryptographic hash verification, and the statutory requirements for admitting electronic records in courts of law.",
    sections: [
      {
        heading: "1. Nature and Vulnerabilities of Electronic Records",
        body: "Digital evidence—system logs, volatile memory (RAM), email headers, database transaction dumps, and disk images—is inherently fragile and easily altered without leaving physical traces. Consequently, courts apply strict standards of authenticity and integrity before admitting electronic records into evidence.",
      },
      {
        heading: "2. Chain of Custody and Cryptographic Verification",
        body: "To establish that electronic evidence has not been tampered with between seizure and trial, forensic investigators rely on a documented Chain of Custody and cryptographic hashing algorithms (SHA-256). Under international standards (ISO/IEC 27037), matching pre-acquisition and post-acquisition hash values creates an irrebuttable proof of byte-for-byte data integrity.",
      },
      {
        heading: "3. Statutory Admissibility Rules",
        body: "Jurisdictions have created dedicated evidentiary provisions: US Federal Rules of Evidence 902(13) and 902(14) allow self-authentication via qualified forensic certification; Sri Lanka Electronic Transactions Act No. 19 of 2006 (Section 18) admits electronic records; India's Bharatiya Sakshya Adhiniyam, 2023 (BSA § 61-63) modernizes electronic certificate regimes.",
      },
    ],
    keyTakeaways: [
      "Cryptographic hash matching (SHA-256) is standard evidentiary proof of bit-level non-alteration.",
      "A broken chain of custody can render otherwise critical forensic evidence inadmissible in court.",
      "Special statutory certificates are frequently required to introduce digital printouts and server logs.",
    ],
    relatedStatutes: ["ISO/IEC 27037:2012 Forensic Guidelines", "US FRE Rule 902(13)/(14)", "Sri Lanka Electronic Transactions Act Sec. 18"],
    nextSlug: "electronic-transactions",
    nextTitle: "06: Electronic Transactions",
  },
  "electronic-transactions": {
    number: "06",
    title: "Electronic Transactions",
    readTime: "7 min",
    level: "Beginner to Intermediate",
    summary:
      "Legal validity of electronic signatures, formation of electronic contracts, paperless trade, and UNCITRAL Model Law frameworks.",
    sections: [
      {
        heading: "1. Functional Equivalence and Non-Discrimination",
        body: "The core legal doctrine of electronic commerce—originating in the 1996 UNCITRAL Model Law on Electronic Commerce—is functional equivalence. Information and contracts shall not be denied legal effect, validity, or enforceability solely on the grounds that they are in electronic form.",
      },
      {
        heading: "2. Electronic Signatures vs. Digital Signatures",
        body: "The law distinguishes between simple electronic signatures (a typed name or clicked 'I Agree' button) and cryptographically secured digital signatures (using Public Key Infrastructure / asymmetric cryptography). Frameworks like the EU eIDAS Regulation (910/2014) accord Qualified Electronic Signatures (QES) the identical legal status of handwritten ink signatures.",
      },
      {
        heading: "3. Formation and Dispatch of Electronic Contracts",
        body: "Statutes establish default rules for when an electronic offer is accepted and when an electronic communication is legally 'dispatched' and 'received' (typically when it enters an information system designated by the recipient).",
      },
    ],
    keyTakeaways: [
      "Functional equivalence ensures electronic records have equal legal force to paper documents.",
      "PKI-based digital signatures provide non-repudiation and high statutory presumption of validity.",
      "Electronic contracts are valid provided standard legal elements of offer, acceptance, and consideration exist.",
    ],
    relatedStatutes: ["UNCITRAL Model Law on Electronic Commerce (1996)", "EU eIDAS Regulation (910/2014)", "US ESIGN Act (15 U.S.C. § 7001)"],
    nextSlug: "intellectual-property",
    nextTitle: "07: Intellectual Property in the Digital Age",
  },
  "intellectual-property": {
    number: "07",
    title: "Intellectual Property",
    readTime: "10 min",
    level: "Intermediate",
    summary:
      "Software copyright protection, open source licensing enforcement, DMCA notice-and-takedown safe harbors, and digital trade secret litigation.",
    sections: [
      {
        heading: "1. Copyright in Computer Software and Code",
        body: "Under Article 10 of the WTO TRIPS Agreement and national statutes, computer programs—both source code and object code—are protected as literary works. Copyright protects the expression of code, not underlying ideas, algorithms, or functional concepts. In Google LLC v. Oracle America, Inc. (2021), the US Supreme Court affirmed that fair use applies to copying declaring code interfaces (APIs) necessary for software interoperability.",
      },
      {
        heading: "2. Online Intermediary Safe Harbors & Notice-and-Takedown",
        body: "Title II of the US Digital Millennium Copyright Act (17 U.S.C. § 512) and EU regulatory directives provide platforms with immunity from copyright infringement damages for user-uploaded content, provided they register designated agents and expeditiously remove infringing material upon receiving valid statutory notice.",
      },
      {
        heading: "3. Trade Secrets and Open Source Software (OSS)",
        body: "Proprietary software algorithms are frequently protected as trade secrets under statutes like the US Defend Trade Secrets Act (DTSA) and EU Trade Secrets Directive (2016/943). Simultaneously, open source licenses (GPL, Apache, MIT) are enforceable contracts and copyright licenses; violating license terms revokes the right to use or distribute the software.",
      },
    ],
    keyTakeaways: [
      "Software code is protected internationally as literary copyright under the TRIPS Agreement.",
      "Fair use protects software interoperability and API implementation in key jurisdictions.",
      "Platform safe harbors require strict statutory compliance with takedown procedures.",
    ],
    relatedStatutes: ["17 U.S.C. § 512 (DMCA)", "Google LLC v. Oracle America, Inc., 141 S. Ct. 1183 (2021)", "EU Software Directive 2009/24/EC"],
    nextSlug: "ethical-hacking-authorization",
    nextTitle: "08: Ethical Hacking & Authorization",
  },
  "ethical-hacking-authorization": {
    number: "08",
    title: "Ethical Hacking & Authorization",
    readTime: "11 min",
    level: "Intermediate to Advanced",
    summary:
      "Statutory boundaries of penetration testing, CFAA authorization post-Van Buren, bug bounty safe harbors, and coordinated vulnerability disclosure.",
    sections: [
      {
        heading: "1. The Statutory Line Between Research and Cybercrime",
        body: "The core legal element in cybercrime legislation is access 'without authorization' or 'exceeding authorized access'. Under traditional statutory drafting, performing vulnerability scanning or automated request fuzzing against a third party without contractually documented permission constitutes a prima facie computer offense, regardless of benevolent intent.",
      },
      {
        heading: "2. Van Buren and the Interpretation of Authorization",
        body: "In Van Buren v. United States, 593 U.S. 374 (2021), the US Supreme Court resolved a circuit split by ruling that an individual 'exceeds authorized access' under the CFAA only when accessing areas of a computer (such as unauthorized files or databases) to which their computer access credentials do not extend. Violating terms of service or corporate usage policies alone does not constitute federal criminal hacking.",
      },
      {
        heading: "3. Bug Bounties, Safe Harbors, and ISO 29147",
        body: "Organizations protect legitimate security researchers through Vulnerability Disclosure Policies (VDPs) offering contractual safe harbors. These policies pledge that the entity will not initiate civil litigation or criminal complaints against researchers who act in good faith, avoid data destruction, and adhere to coordinated disclosure guidelines under ISO/IEC 29147.",
      },
    ],
    keyTakeaways: [
      "Contractual authorization (scope of engagement, VDP) is the legal safeguard separating ethical hacking from felony computer crimes.",
      "Post-Van Buren jurisprudence limits criminal liability for mere terms-of-service violations.",
      "Penetration testing without written, verifiable client authorization creates immediate civil and criminal exposure.",
    ],
    relatedStatutes: ["US CFAA 18 U.S.C. § 1030", "Van Buren v. United States, 593 U.S. 374 (2021)", "ISO/IEC 29147:2018 Vulnerability Disclosure"],
    nextSlug: "social-media-law",
    nextTitle: "09: Social Media & the Law",
  },
  "social-media-law": {
    number: "09",
    title: "Social Media & the Law",
    readTime: "8 min",
    level: "Beginner to Intermediate",
    summary:
      "Intermediary liability, content moderation rights, defamation, cyber harassment, online safety legislation, and digital platform obligations.",
    sections: [
      {
        heading: "1. Intermediary Liability & Section 230",
        body: "Section 230 of the US Communications Decency Act (47 U.S.C. § 230) provides interactive computer services with immunity from civil liability as the 'publisher or speaker' of third-party content. It also shields good-faith content moderation ('Good Samaritan' provision). Globally, this broad immunity is facing substantial legislative modification.",
      },
      {
        heading: "2. The European Union Digital Services Act (DSA)",
        body: "The EU Digital Services Act (Regulation 2022/2065) fundamentally recalibrates platform responsibility. While preserving conditional hosting immunity, it imposes strict notice-and-action mechanisms, transparency reports, risk assessments for Very Large Online Platforms (VLOPs), and algorithmic accountability to counter illegal content and disinformation.",
      },
      {
        heading: "3. Online Harassment, Doxxing, and Safety Acts",
        body: "Jurisdictions have increasingly criminalized digital harassment, cyberstalking, non-consensual sharing of intimate images, and doxxing. The UK Online Safety Act 2023 and Sri Lanka Online Safety Act No. 9 of 2024 create statutory duties on platforms to prevent illegal harms and protect minors.",
      },
    ],
    keyTakeaways: [
      "Section 230 CDA shields platforms from publisher liability in the US, but global standards are pivoting toward proactive duty of care.",
      "The EU Digital Services Act mandates verifiable notice-and-action mechanisms and algorithmic transparency.",
      "Harassment and non-consensual image distribution carry serious criminal penalties under specialized cyber statutes.",
    ],
    relatedStatutes: ["47 U.S.C. § 230 (CDA)", "EU Digital Services Act (Regulation 2022/2065)", "UK Online Safety Act 2023"],
    nextSlug: "international-cybercrime",
    nextTitle: "10: International Cybercrime & Treaties",
  },
  "international-cybercrime": {
    number: "10",
    title: "International Cybercrime",
    readTime: "9 min",
    level: "Intermediate to Advanced",
    summary:
      "Transnational cyber law enforcement, the Council of Europe Budapest Convention, Mutual Legal Assistance Treaties (MLATs), and the new UN Cybercrime Convention.",
    sections: [
      {
        heading: "1. Transnational Jurisdiction and Enforcement Bottlenecks",
        body: "Cyber attacks are borderless by design. National law enforcement agencies, however, are strictly bound by the principle of territorial sovereignty. Investigating a cyber operation crossing multiple sovereign boundaries requires formal mechanisms for cross-border preservation of electronic evidence and extradition.",
      },
      {
        heading: "2. The Budapest Convention on Cybercrime (ETS No. 185)",
        body: "Adopted in 2001 by the Council of Europe, the Budapest Convention remains the preeminent multilateral treaty governing cybercrime. It harmonizes domestic criminal law offenses, establishes procedural powers (expedited preservation of stored computer data, real-time collection of traffic data), and mandates a 24/7 point-of-contact network.",
      },
      {
        heading: "3. MLAT Reform and the UN Cybercrime Treaty",
        body: "Traditional Mutual Legal Assistance Treaties (MLATs) are notoriously slow, averaging 6 to 18 months for evidence production. The Second Additional Protocol to the Budapest Convention (2022) introduces direct cooperation with cloud service providers. Concurrently, the United Nations finalized the draft UN Convention Against Cybercrime (2024), establishing global evidence-sharing mechanisms across member states.",
      },
    ],
    keyTakeaways: [
      "State sovereignty strictly limits extraterritorial law enforcement without formal treaty backing.",
      "The Budapest Convention provides the global blueprint for harmonizing substantive cybercrime offenses.",
      "Modern protocols increasingly permit direct lawful requests from authorities to overseas cloud providers under rigorous human rights safeguards.",
    ],
    relatedStatutes: ["Budapest Convention on Cybercrime (ETS No. 185)", "Budapest 2nd Additional Protocol (CETS 224)", "Draft UN Convention Against Cybercrime (2024)"],
    nextSlug: "cybersecurity-compliance",
    nextTitle: "11: Cybersecurity Compliance & Risk",
  },
  "cybersecurity-compliance": {
    number: "11",
    title: "Cybersecurity Compliance",
    readTime: "12 min",
    level: "Intermediate to Advanced",
    summary:
      "Corporate governance, mandatory incident disclosures, critical infrastructure protection, the EU NIS2 Directive, and board-level fiduciary duties.",
    sections: [
      {
        heading: "1. The Shift from Voluntary Best Practices to Statutory Mandates",
        body: "For decades, cybersecurity was treated as an internal IT risk governed by voluntary standards (such as ISO/IEC 27001 and NIST CSF). Today, statutory frameworks impose binding legal obligations, mandatory baseline controls, and executive management liability for cyber resilience failures.",
      },
      {
        heading: "2. Critical Infrastructure Protection & The EU NIS2 Directive",
        body: "Directive (EU) 2022/2555 (NIS2) expands mandatory cybersecurity requirements across 18 essential and important sectors (energy, transport, banking, health, digital infrastructure). NIS2 requires 24-hour early warning incident notifications, supply chain risk management, and empowers regulators to impose personal liability and temporary management bans on C-suite executives.",
      },
      {
        heading: "3. Corporate Fiduciary Duty and SEC Cyber Disclosures",
        body: "In the United States, the SEC requires public companies to disclose material cybersecurity incidents within four business days of determination (Form 8-K Item 1.05) and mandate annual disclosure of board cybersecurity expertise and governance policies. Failure to adequately oversee cyber risks can result in derivative shareholder lawsuits for breach of fiduciary duty.",
      },
    ],
    keyTakeaways: [
      "Cybersecurity has evolved into a mandatory legal duty of care overseen by company directors.",
      "NIS2 introduces personal regulatory liability for corporate leadership failing to supervise risk management.",
      "Strict statutory notification windows (24h early warning, 4-day SEC reports) mandate mature detection and legal assessment pipelines.",
    ],
    relatedStatutes: ["EU NIS2 Directive (2022/2555)", "SEC Cybersecurity Rules (Release No. 33-11216)", "CISA CIRCIA 2022 (6 U.S.C. § 681b)"],
    nextSlug: "ai-emerging-technology",
    nextTitle: "12: AI & Emerging Technology",
  },
  "ai-emerging-technology": {
    number: "12",
    title: "AI & Emerging Technology",
    readTime: "10 min",
    level: "Intermediate to Advanced",
    summary:
      "Artificial intelligence regulation, the EU AI Act risk tiers, automated decision-making liability, copyright in model training, and deepfake statutory disclosures.",
    sections: [
      {
        heading: "1. The Risk-Based Regulatory Paradigm (EU AI Act)",
        body: "The European Union Artificial Intelligence Act (Regulation (EU) 2024/1689) represents the world's first comprehensive horizontal legal framework for AI. It categorizes AI systems by risk: Unacceptable Risk (banned practices like social scoring and manipulative cognitive systems); High Risk (medical devices, critical infrastructure, recruitment, judicial tools subject to conformity assessments, logging, and human oversight); and General Purpose AI (GPAI models subject to copyright compliance and systemic risk evaluations).",
      },
      {
        heading: "2. Tort Liability and Autonomous Systems",
        body: "When an autonomous AI system causes economic or physical harm (e.g., automated driving accidents, clinical algorithmic misdiagnoses, discriminatory credit scoring), traditional negligence law struggles to identify proximate causation. Emerging legal doctrines explore strict product liability for software developers and algorithmic auditing mandates.",
      },
      {
        heading: "3. Generative AI, Copyright, and Synthetic Media (Deepfakes)",
        body: "Training large models on copyrighted web data has sparked major global litigation over fair use versus commercial misappropriation. Statutes increasingly require clear watermarking and statutory disclosures for synthetic audio, video, and text to prevent electoral interference, fraud, and defamation.",
      },
    ],
    keyTakeaways: [
      "The EU AI Act establishes a global benchmark using risk-tiered conformity assessments.",
      "High-risk AI systems require mandatory data governance, detailed technical documentation, and human-in-the-loop oversight.",
      "Synthetic media (deepfakes) and automated decisions face expanding transparency and disclosure laws worldwide.",
    ],
    relatedStatutes: ["EU AI Act (Regulation (EU) 2024/1689)", "EU AI Liability Directive (Proposed COM/2022/496)", "Executive Order 14110 on Safe, Secure, and Trustworthy AI"],
    nextSlug: "what-is-cyber-law",
    nextTitle: "01: What Is Cyber Law? (Cycle to Beginning)",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mod = moduleContents[slug];
  if (!mod) {
    return { title: "Learning Module — CyberLex" };
  }
  return {
    title: `${mod.title} — Cyber Law Foundations`,
    description: mod.summary,
  };
}

export default async function LearnModulePage({ params }: PageProps) {
  const { slug } = await params;
  const mod = moduleContents[slug];

  if (!mod) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-14 h-14 text-(--primary) mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-(--foreground) font-heading mb-2">
            Module Under Secondary Review
          </h1>
          <p className="text-sm text-(--muted-foreground) max-w-lg mx-auto mb-8 leading-relaxed">
            This educational module is currently being finalized against statutory gazette updates.
          </p>
          <Link
            href="/learn"
            className="px-5 py-2.5 rounded-lg bg-(--primary) text-white text-sm font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Modules</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Learn Hub", href: "/learn" },
            { label: `Module ${mod.number}: ${mod.title}` },
          ]}
          className="mb-8"
        />

        {/* Module Header */}
        <div className="mb-8 border-b border-(--border-color) pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded bg-(--primary)/10 text-(--primary) border border-(--primary)/20 text-xs font-bold uppercase tracking-wider">
              Module {mod.number}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-(--card-bg) text-(--muted-foreground) border border-(--border-color) text-xs font-semibold">
              Level: {mod.level}
            </span>
            <span className="text-xs text-(--muted-foreground) flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>{mod.readTime} study time</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            {mod.title}
          </h1>

          <p className="text-base text-(--muted-foreground) leading-relaxed">
            {mod.summary}
          </p>
        </div>

        {/* Core Content Sections */}
        <div className="space-y-8 mb-12">
          {mod.sections.map((sec, idx) => (
            <section
              key={idx}
              className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-3 shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-bold text-(--foreground) font-heading">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-(--muted-foreground) leading-relaxed">
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        {/* Key Takeaways Card */}
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 mb-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Legal Takeaways</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-(--foreground)">
            {mod.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary Legal References */}
        <div className="p-6 rounded-2xl border border-(--border-color) bg-(--bg-surface) mb-12">
          <h3 className="text-xs font-bold uppercase tracking-wider text-(--primary) mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Primary Statutory & Jurisprudential References</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {mod.relatedStatutes.map((stat, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-(--card-bg) border border-(--border-color) text-(--foreground)"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        {/* Module Navigation Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-(--border-color)">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-semibold text-(--muted-foreground) hover:text-(--foreground) transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Learn Hub</span>
          </Link>

          {mod.nextSlug && mod.nextTitle && (
            <Link
              href={`/learn/${mod.nextSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-(--primary) text-white text-xs font-bold hover:brightness-110 transition-all shadow-sm"
            >
              <span>Next: {mod.nextTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
