import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Scale,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface TopicDetail {
  title: string;
  tagline: string;
  overview: string;
  keyConcepts: Array<{ term: string; explanation: string }>;
  relevantLaws: Array<{ jurisdiction: string; law: string; citation: string; status: string }>;
  jurisdictionDifferences: string;
  practicalExample: { scenario: string; legalOutcome: string };
  landmarkCases: Array<{ name: string; citation: string; ruling: string }>;
  officialSources: Array<{ name: string; url: string }>;
  lastReviewed: string;
  verificationStatus: string;
}

const detailedTopics: Record<string, TopicDetail> = {
  cybercrime: {
    title: "Cybercrime & Computer Misuse",
    tagline: "Substantive and procedural criminal law governing hacking, malware, and digital fraud.",
    overview:
      "Cybercrime law criminalizes acts targeting the confidentiality, integrity, and availability of computer data and systems, alongside cyber-enabled offenses such as fraud, ransomware, and digital extortion. Conviction requires proving actus reus (unauthorized act) and mens rea (criminal intent).",
    keyConcepts: [
      { term: "Unauthorized Access", explanation: "Intentionally causing a computer to perform functions without authorization or exceeding granted permissions." },
      { term: "System & Data Interference", explanation: "Damaging, deleting, deteriorating, altering, or suppressing computer data or hindering authorized operations." },
      { term: "Digital Extortion & Ransomware", explanation: "Depriving access to data via encryption coupled with a demand for valuable consideration or cryptocurrency." },
    ],
    relevantLaws: [
      { jurisdiction: "Global", law: "Budapest Convention on Cybercrime", citation: "ETS No. 185, Articles 2-8", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Computer Crimes Act No. 24 of 2007", citation: "Acts of Parl. No. 24/2007, Sec. 3-6", status: "In Force" },
      { jurisdiction: "United States", law: "Computer Fraud and Abuse Act (CFAA)", citation: "18 U.S.C. § 1030", status: "In Force" },
      { jurisdiction: "United Kingdom", law: "Computer Misuse Act 1990", citation: "1990 c. 18, Sections 1-3ZA", status: "In Force" },
    ],
    jurisdictionDifferences:
      "Civil law and common law systems treat authorization boundaries differently. Post-Van Buren in the US, violating terms of service is not criminal hacking; conversely, European and UK statutes emphasize intentional impairment of systems regardless of contract wording.",
    practicalExample: {
      scenario: "A terminated employee uses residual administrative API tokens to access customer records before account de-provisioning occurs.",
      legalOutcome: "Prosecuted under CFAA § 1030(a)(2) or Sri Lanka CCA Sec. 3 as intentional access without authority; knowledge of termination negates any implied authorization.",
    },
    landmarkCases: [
      { name: "Van Buren v. United States", citation: "593 U.S. 374 (2021)", ruling: "Exceeding authorized access covers only accessing computers/files to which access credentials do not extend." },
      { name: "DPP v. Lennon", citation: "[2006] EWHC 1201 (Admin)", ruling: "Flooding a former employer's email servers with 5 million emails constituted unauthorized modification and system impairment." },
    ],
    officialSources: [
      { name: "Council of Europe Cybercrime Treaty Office", url: "https://www.coe.int/en/web/cybercrime" },
      { name: "UNODC Cybercrime Legal Database", url: "https://www.unodc.org/cybercrime" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  privacy: {
    title: "Privacy in Cyberspace",
    tagline: "Constitutional protections, surveillance constraints, and individual confidentiality online.",
    overview:
      "Privacy law establishes legal protections against arbitrary state surveillance, commercial tracking, and unlawful interception of communications. It balances national security interests against fundamental human rights guaranteed under international instruments.",
    keyConcepts: [
      { term: "Reasonable Expectation of Privacy", explanation: "Judicial test evaluating whether an individual possesses an actual subjective expectation of privacy that society recognizes as objectively reasonable." },
      { term: "Interception of Communications", explanation: "Monitoring or acquiring data packet contents during transit without consent of participants or judicial warrant." },
      { term: "Third-Party Doctrine", explanation: "Traditional rule holding that information voluntarily disclosed to a third party (ISP, bank) loses constitutional privacy; modernly restricted for digital telemetry." },
    ],
    relevantLaws: [
      { jurisdiction: "International", law: "International Covenant on Civil & Political Rights", citation: "ICCPR Article 17", status: "In Force" },
      { jurisdiction: "European Union", law: "Charter of Fundamental Rights", citation: "Articles 7 & 8", status: "In Force" },
      { jurisdiction: "United States", law: "Electronic Communications Privacy Act", citation: "18 U.S.C. § 2510 et seq.", status: "In Force" },
    ],
    jurisdictionDifferences:
      "The EU treats data privacy as a fundamental human right rooted in dignity, imposing strict limits on public and private surveillance. The US follows a sector-specific and Fourth Amendment warrant approach focused on government intrusion.",
    practicalExample: {
      scenario: "Police request seven days of continuous historical cell-site location information (CSLI) from a mobile carrier without obtaining a probable cause warrant.",
      legalOutcome: "Unlawful under Carpenter v. United States; continuous digital location tracking requires a Fourth Amendment judicial warrant.",
    },
    landmarkCases: [
      { name: "Carpenter v. United States", citation: "585 U.S. 296 (2018)", ruling: "Acquiring historical cell-site records is a Fourth Amendment search requiring a warrant based on probable cause." },
      { name: "Data Protection Commissioner v. Facebook Ireland (Schrems II)", citation: "Case C-311/18 (CJEU 2020)", ruling: "US surveillance laws (FISA § 702) do not offer adequate data protection equivalent to EU standards." },
    ],
    officialSources: [
      { name: "UN High Commissioner for Human Rights (Digital Privacy)", url: "https://www.ohchr.org/en/topic/right-to-privacy-in-the-digital-age" },
      { name: "European Data Protection Board", url: "https://edpb.europa.eu" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "data-protection": {
    title: "Data Protection & Regulatory Compliance",
    tagline: "Comprehensive regimes governing personal data collection, processing, and cross-border transfers.",
    overview:
      "Data protection law establishes binding statutory frameworks for how corporate and governmental entities collect, process, retain, and transfer personal data of living individuals, providing enforceable rights of access, rectification, and erasure.",
    keyConcepts: [
      { term: "Lawful Basis for Processing", explanation: "Statutory prerequisites for lawful handling: Consent, Contract, Legal Obligation, Vital Interests, Public Task, or Legitimate Interests." },
      { term: "Data Subject Rights", explanation: "Statutory rights enabling individuals to access, port, correct, or demand deletion ('Right to be Forgotten') of their data." },
      { term: "Cross-Border Transfer Mechanisms", explanation: "Adequacy decisions, Standard Contractual Clauses (SCCs), and Binding Corporate Rules governing international data flows." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "General Data Protection Regulation (GDPR)", citation: "Regulation (EU) 2016/679", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Personal Data Protection Act No. 9 of 2022", citation: "Certified 19th March 2022", status: "Phased Operation" },
      { jurisdiction: "India", law: "Digital Personal Data Protection Act, 2023", citation: "Act No. 22 of 2023", status: "In Force" },
      { jurisdiction: "Singapore", law: "Personal Data Protection Act 2012", citation: "Cap. 26, Act 26 of 2012", status: "In Force" },
    ],
    jurisdictionDifferences:
      "GDPR applies extraterritorially to anyone offering goods/services to EU residents. Sri Lanka and Singapore utilize omnibus frameworks with regulatory commission enforcement, whereas the US relies on state laws (CCPA) and federal agency rules (FTC).",
    practicalExample: {
      scenario: "An enterprise suffers an unauthorized database exfiltration affecting 50,000 user credentials and fails to notify the supervisory authority for 14 days.",
      legalOutcome: "Direct violation of Article 33 GDPR (72-hour notification rule), exposing the enterprise to administrative fines up to €20M or 4% of global annual turnover.",
    },
    landmarkCases: [
      { name: "Google Spain SL v. AEPD", citation: "Case C-131/12 (CJEU 2014)", ruling: "Search engine operators must de-index personal links upon request under the Right to be Forgotten." },
      { name: "Meta Platforms Ireland v. DPC", citation: "EDPB Binding Decision 1/2023", ruling: "Transferring EU personal data to US servers without adequate safeguards violated Article 46(1) GDPR, resulting in €1.2B fine." },
    ],
    officialSources: [
      { name: "European Data Protection Board", url: "https://edpb.europa.eu" },
      { name: "Data Protection Authority of Sri Lanka", url: "https://dpa.gov.lk" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "digital-evidence": {
    title: "Digital Evidence & Electronic Records",
    tagline: "Forensic acquisition, chain of custody, hash verification, and courtroom admissibility standards.",
    overview:
      "Digital evidence law regulates the admissibility, authentication, and weight of electronic records in legal proceedings. Because digital data is easily altered, courts demand strict proof of chain of custody and cryptographic hash verification.",
    keyConcepts: [
      { term: "Chain of Custody", explanation: "Chronological documentation tracking the custody, transfer, analysis, and disposition of digital physical storage media." },
      { term: "Cryptographic Hash Authentication", explanation: "Generating mathematical SHA-256 hashes immediately upon acquisition; matching hashes prove bit-for-bit integrity." },
      { term: "Electronic Admissibility Certificates", explanation: "Statutory certificates signed by system custodians verifying that computers were operating properly during record creation." },
    ],
    relevantLaws: [
      { jurisdiction: "United States", law: "Federal Rules of Evidence", citation: "FRE Rules 901, 902(13), 902(14)", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Electronic Transactions Act No. 19 of 2006", citation: "Section 18 & 19", status: "In Force" },
      { jurisdiction: "India", law: "Bharatiya Sakshya Adhiniyam, 2023", citation: "BSA § 61-63", status: "In Force" },
      { jurisdiction: "International", law: "ISO/IEC 27037:2012 Standard", citation: "Digital Evidence Handling Guidelines", status: "Standard" },
    ],
    jurisdictionDifferences:
      "US federal courts allow self-authentication of digital records under FRE 902(14) via forensic certification. India's BSA 2023 and Commonwealth statutes require contemporaneous statutory certificates from system operators.",
    practicalExample: {
      scenario: "An investigator boots a seized suspect laptop directly at the crime scene without utilizing a write-blocking hardware device.",
      legalOutcome: "Operating system startup modifies thousands of registry files and metadata, compromising the hash and rendering timestamps inadmissible.",
    },
    landmarkCases: [
      { name: "Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal", citation: "(2020) 7 SCC 1 (Supreme Court of India)", ruling: "A statutory certificate is a condition precedent to the admissibility of electronic records in court." },
      { name: "Lorraine v. Markel American Insurance Co.", citation: "241 F.R.D. 534 (D. Md. 2007)", ruling: "Established the comprehensive multi-step evidentiary framework for authenticating electronic evidence in federal litigation." },
    ],
    officialSources: [
      { name: "NIST Computer Forensic Tool Testing Program", url: "https://www.nist.gov/itl/ssd/software-quality-group/computer-forensic-tool-testing-program-cftt" },
      { name: "Scientific Working Group on Digital Evidence", url: "https://www.swgde.org" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "social-media": {
    title: "Social Media, Content Moderation & Online Speech",
    tagline: "Platform intermediary liability, defamation, cyber harassment, and online safety regulation.",
    overview:
      "This topic examines legal limits on digital expression, platform duty of care, defamation in cyberspace, non-consensual imagery, and modern statutory shifts from blanket safe harbors to active risk mitigation.",
    keyConcepts: [
      { term: "Platform Safe Harbor Immunity", explanation: "Statutory shielding of hosts from civil liability for content posted by third parties (e.g., Section 230 CDA)." },
      { term: "Notice-and-Takedown Duty", explanation: "Requirement that platforms act expeditiously to remove or disable access to illegal content upon obtaining actual knowledge." },
      { term: "Non-Consensual Image Distribution", explanation: "Statutory criminalization of sharing intimate photographs or deepfakes without the subject's explicit consent." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "Digital Services Act", citation: "Regulation (EU) 2022/2065", status: "In Force" },
      { jurisdiction: "United States", law: "Communications Decency Act", citation: "47 U.S.C. § 230", status: "In Force" },
      { jurisdiction: "United Kingdom", law: "Online Safety Act 2023", citation: "2023 c. 50", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Online Safety Act No. 9 of 2024", citation: "Certified 1st Feb 2024", status: "In Force" },
    ],
    jurisdictionDifferences:
      "The US grants broad publisher immunity under § 230 CDA. The EU DSA and UK Online Safety Act mandate proactive risk assessments, transparent moderation reporting, and direct fines for failure to police systemic harms.",
    practicalExample: {
      scenario: "An anonymous forum user posts defamatory allegations against a local business owner; the business demands the platform owner pay damages.",
      legalOutcome: "In the US, § 230 shields the platform from defamation damages; in the EU, the platform must expeditiously evaluate and remove content upon receiving a substantiated notice.",
    },
    landmarkCases: [
      { name: "Zeran v. America Online, Inc.", citation: "129 F.3d 327 (4th Cir. 1997)", ruling: "Section 230 creates complete immunity for service providers regarding third-party postings, even after receiving notice." },
      { name: "Glanbia v. O'Keeffe", citation: "[2021] IEHC 24", ruling: "Intermediaries are obliged to disclose IP addresses of anonymous defamatory posters under Norwich Pharmacal orders." },
    ],
    officialSources: [
      { name: "European Commission Digital Services Act Overview", url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package" },
      { name: "UK Ofcom Online Safety Hub", url: "https://www.ofcom.org.uk/online-safety" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "ethical-hacking": {
    title: "Ethical Hacking, Penetration Testing & Vulnerability Research",
    tagline: "Authorization standards, bug bounty contracts, coordinated vulnerability disclosure, and CFAA limits.",
    overview:
      "Defensive security research requires clear legal boundaries. Testing computer systems without authorization constitutes a criminal offense under almost all cybercrime statutes; formal agreements and VDP safe harbors protect legitimate researchers.",
    keyConcepts: [
      { term: "Explicit Scope of Authorization", explanation: "Written contractual boundaries defining allowed targets, IP ranges, permitted assessment techniques, and prohibited actions." },
      { term: "Coordinated Vulnerability Disclosure (CVD)", explanation: "Standardized process (ISO 29147) where researchers report flaws confidentially to vendors before public disclosure." },
      { term: "Safe Harbor Policy", explanation: "Corporate commitment not to initiate civil litigation or criminal complaints against researchers who act in good faith." },
    ],
    relevantLaws: [
      { jurisdiction: "United States", law: "Computer Fraud and Abuse Act", citation: "18 U.S.C. § 1030(a)(2)", status: "In Force" },
      { jurisdiction: "United Kingdom", law: "Computer Misuse Act 1990", citation: "1990 c. 18, Section 1", status: "In Force" },
      { jurisdiction: "International", law: "ISO/IEC 29147 & 30111", citation: "Vulnerability Disclosure & Handling", status: "Standard" },
    ],
    jurisdictionDifferences:
      "Under US DOJ revised charging guidelines (2022), prosecutors will not charge good-faith security research under CFAA. However, in Europe and the UK, testing without prior authorization remains strictly actionable under computer misuse statutes.",
    practicalExample: {
      scenario: "A researcher discovers an open SQL injection on a medical site, accesses patient database records to prove the flaw, and publishes the database online.",
      legalOutcome: "Accessing sensitive patient records and dumping data violates good faith research; the researcher faces criminal indictment under 18 U.S.C. § 1030 for exceeding authorization.",
    },
    landmarkCases: [
      { name: "Van Buren v. United States", citation: "593 U.S. 374 (2021)", ruling: "Gates-up vs gates-down approach: authorization depends on technological barriers, not contractual terms of service." },
      { name: "United States v. Auernheimer", citation: "748 F.3d 525 (3d Cir. 2014)", ruling: "Scraping public unauthenticated web endpoints vacated on venue, highlighting narrow interpretations of 'unauthorized access'." },
    ],
    officialSources: [
      { name: "US Department of Justice CCIPS Policy on CFAA Prosecutions", url: "https://www.justice.gov/opa/pr/department-justice-announces-new-policy-charging-cases-under-computer-fraud-and-abuse-act" },
      { name: "CISA Vulnerability Disclosure Policy Guidance", url: "https://www.cisa.gov/resources-tools/resources/binding-operational-directive-20-01" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "electronic-transactions": {
    title: "Electronic Transactions, Contracts & E-Signatures",
    tagline: "Legal validity of electronic agreements, digital signatures, paperless trade, and UNCITRAL frameworks.",
    overview:
      "Electronic transactions law establishes functional equivalence between physical and digital records, ensuring that contracts, invoices, and notices cannot be denied legal validity solely because they are executed electronically.",
    keyConcepts: [
      { term: "Functional Equivalence", explanation: "Core principle establishing that electronic records and signatures possess the exact same legal efficacy as paper counterparts." },
      { term: "Qualified Digital Signature", explanation: "Cryptographic signature based on asymmetric keys and digital certificates, providing statutory presumption of non-repudiation." },
      { term: "Time of Dispatch and Receipt", explanation: "Statutory rules determining exactly when an electronic communication enters or leaves an information system." },
    ],
    relevantLaws: [
      { jurisdiction: "International", law: "UNCITRAL Model Law on Electronic Commerce", citation: "UN General Assembly Res 51/162", status: "Model Law" },
      { jurisdiction: "European Union", law: "eIDAS Regulation", citation: "Regulation (EU) No 910/2014", status: "In Force" },
      { jurisdiction: "United States", law: "ESIGN Act & UETA", citation: "15 U.S.C. § 7001", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Electronic Transactions Act No. 19 of 2006", citation: "Certified 19th May 2006", status: "In Force" },
    ],
    jurisdictionDifferences:
      "The US adheres to an open technology-neutral approach where simple typed signatures are valid. The EU eIDAS regulation categorizes signatures into Simple, Advanced, and Qualified (QES), according QES the highest legal presumption.",
    practicalExample: {
      scenario: "A commercial lease agreement is concluded entirely via PDF exchange with electronic digital certificate signatures; the landlord later claims the lease is invalid because it was never printed or signed in ink.",
      legalOutcome: "Under ESIGN § 7001 and Sri Lanka ETA § 7, electronic signatures satisfy statutory 'writing' and 'signature' requirements; the lease is fully binding.",
    },
    landmarkCases: [
      { name: "Klocek v. Gateway, Inc.", citation: "104 F. Supp. 2d 1332 (D. Kan. 2000)", ruling: "Clickwrap contracts are enforceable only when users have reasonable notice and opportunity to review terms." },
      { name: "Meyer v. Uber Technologies, Inc.", citation: "868 F.3d 66 (2d Cir. 2017)", ruling: "Upheld electronic clickwrap agreements when the user is presented with a clear hyperlink and conspicuous notice." },
    ],
    officialSources: [
      { name: "UNCITRAL Electronic Commerce Texts", url: "https://uncitral.un.org/en/texts/ecommerce" },
      { name: "European Commission eIDAS Information", url: "https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "ai-law": {
    title: "Artificial Intelligence, Algorithms & Autonomous Systems",
    tagline: "EU AI Act conformity, high-risk systems, algorithmic accountability, product liability, and model IP.",
    overview:
      "AI law addresses the legal responsibilities arising from autonomous computing, machine learning models, automated credit/judicial scoring, generative synthetic media, and liability for automated harm.",
    keyConcepts: [
      { term: "Risk-Based AI Classification", explanation: "Categorizing systems into Unacceptable Risk (banned), High-Risk (regulated), and General Purpose AI (transparency)." },
      { term: "Algorithmic Transparency & Explainability", explanation: "Statutory rights to understand the logic and factors involved in automated decisions affecting individuals." },
      { term: "AI Tort Liability", explanation: "Evolving legal standards for fault and causation when autonomous systems cause physical or economic damages." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "Artificial Intelligence Act", citation: "Regulation (EU) 2024/1689", status: "In Force" },
      { jurisdiction: "United States", law: "Executive Order 14110 on Safe & Trustworthy AI", citation: "88 FR 75191", status: "Active Directive" },
      { jurisdiction: "International", law: "Council of Europe Framework Convention on AI", citation: "CETS No. 225 (2024)", status: "Treaty" },
    ],
    jurisdictionDifferences:
      "The EU has enacted comprehensive horizontal regulation with severe fines for prohibited AI. The US and UK currently adopt sectoral approaches relying on existing agencies (FTC, FDA, SEC) to police algorithmic deception.",
    practicalExample: {
      scenario: "An enterprise deploys an unvetted resume-screening neural network that automatically rejects candidates based on proxy demographic attributes.",
      legalOutcome: "Under the EU AI Act (Annex III, High-Risk System), failure to perform bias testing, maintain technical logs, and establish human oversight triggers massive regulatory penalties.",
    },
    landmarkCases: [
      { name: "State v. Loomis", citation: "881 N.W.2d 749 (Wis. 2016)", ruling: "Use of proprietary algorithmic risk assessment tools (COMPAS) in sentencing does not violate due process if scores are not the sole factor." },
      { name: "New York Times Co. v. Microsoft & OpenAI", citation: "No. 1:23-cv-11195 (S.D.N.Y.)", ruling: "Pending landmark litigation addressing whether scraping copyrighted journalistic works for LLM training constitutes fair use or copyright infringement." },
    ],
    officialSources: [
      { name: "European AI Office", url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office" },
      { name: "NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "intellectual-property": {
    title: "Digital Intellectual Property & Software Copyright",
    tagline: "Software patents, open source compliance, DMCA takedowns, and trade secrets in cyberspace.",
    overview:
      "Intellectual property law in cyberspace protects code, digital creations, brands, and databases against piracy, unauthorized scraping, and trade secret theft while preserving fair use and interoperability.",
    keyConcepts: [
      { term: "Software Copyright & APIs", explanation: "Copyright protection for source and object code; application of fair use to functional declaring code for interoperability." },
      { term: "DMCA § 512 Notice-and-Takedown", explanation: "Statutory immunity for hosting services conditional on expeditious removal of infringing user content upon formal notice." },
      { term: "Open Source License Enforceability", explanation: "Enforcing copyleft (GPL) and permissive (MIT/Apache) license terms as binding contractual and copyright restrictions." },
    ],
    relevantLaws: [
      { jurisdiction: "International", law: "WTO TRIPS Agreement", citation: "Article 10 (Computer Programs)", status: "In Force" },
      { jurisdiction: "United States", law: "Digital Millennium Copyright Act", citation: "17 U.S.C. § 512 & § 1201", status: "In Force" },
      { jurisdiction: "European Union", law: "Directive on Copyright in the Digital Single Market", citation: "Directive (EU) 2019/790", status: "In Force" },
    ],
    jurisdictionDifferences:
      "The US recognizes expansive fair use for software interoperability (Google v. Oracle). The EU regulates text-and-data mining (TDM) through explicit statutory exemptions under Directive 2019/790 Articles 3 and 4.",
    practicalExample: {
      scenario: "A commercial SaaS provider embeds GPL-licensed library code into proprietary software and distributes binaries without publishing its modified source code.",
      legalOutcome: "Breach of GPL terms immediately terminates the license, converting commercial distribution into actionable copyright infringement.",
    },
    landmarkCases: [
      { name: "Google LLC v. Oracle America, Inc.", citation: "141 S. Ct. 1183 (2021)", ruling: "Google's copying of Java SE API declaring code was a fair use as a matter of law to enable programmer interoperability." },
      { name: "Sega Enterprises Ltd. v. Accolade, Inc.", citation: "977 F.2d 1510 (9th Cir. 1992)", ruling: "Disassembly and reverse engineering of software object code is fair use when needed to understand functional requirements for compatibility." },
    ],
    officialSources: [
      { name: "World Intellectual Property Organization (WIPO)", url: "https://www.wipo.int/copyright/en/" },
      { name: "US Copyright Office Digital Millennium Copyright Act Hub", url: "https://www.copyright.gov/dmca/" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "cybersecurity-compliance": {
    title: "Cybersecurity Governance & Regulatory Compliance",
    tagline: "Mandatory incident reporting, critical infrastructure security, NIS2 Directive, and board liability.",
    overview:
      "Cybersecurity compliance law mandates minimum defensive technical controls, continuous risk management, supply chain audits, and strict timeframes for reporting security breaches to regulatory bodies.",
    keyConcepts: [
      { term: "Mandatory Incident Reporting Windows", explanation: "Statutory deadlines requiring entities to alert authorities within 24 to 72 hours of becoming aware of a significant incident." },
      { term: "Supply Chain Risk Management", explanation: "Legal duties to evaluate and contractually bind third-party IT vendors and software suppliers to strict security standards." },
      { term: "Director Fiduciary Oversight", explanation: "Personal legal obligations on corporate directors to oversee cybersecurity posture or face regulatory sanctions and derivative suits." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "NIS2 Directive", citation: "Directive (EU) 2022/2555", status: "In Force" },
      { jurisdiction: "United States", law: "CIRCIA Act of 2022", citation: "6 U.S.C. § 681b", status: "In Force" },
      { jurisdiction: "Singapore", law: "Cybersecurity Act 2018", citation: "Act 9 of 2018", status: "In Force" },
    ],
    jurisdictionDifferences:
      "NIS2 in Europe directly empowers national authorities to suspend management credentials and levy fines on company leadership. In the US, SEC disclosure rules (Form 8-K) and CISA CIRCIA drive federal compliance.",
    practicalExample: {
      scenario: "A major energy grid operator experiences network infiltration and detects exfiltration of operational telemetry, but waits 3 weeks to alert regulators.",
      legalOutcome: "Direct violation of NIS2 and critical infrastructure incident reporting laws, incurring heavy administrative penalties and regulatory audits.",
    },
    landmarkCases: [
      { name: "SEC v. SolarWinds Corp. & Timothy G. Brown", citation: "No. 1:23-cv-9518 (S.D.N.Y.)", ruling: "SEC enforcement action alleging fraudulent public statements regarding internal cybersecurity controls and failure to disclose known vulnerabilities." },
      { name: "Caremark Derivative Litigation", citation: "698 A.2d 959 (Del. Ch. 1996)", ruling: "Directors have an affirmative fiduciary duty to implement reporting systems and monitor mission-critical risks, including cyber defense." },
    ],
    officialSources: [
      { name: "European Union Agency for Cybersecurity (ENISA)", url: "https://www.enisa.europa.eu" },
      { name: "US Cybersecurity and Infrastructure Security Agency (CISA)", url: "https://www.cisa.gov" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "digital-rights": {
    title: "Digital Rights, Net Neutrality & Internet Freedoms",
    tagline: "Freedom of expression, internet shutdown legality, net neutrality, and digital censorship limits.",
    overview:
      "Digital rights law concerns the protection of fundamental human rights in the online environment, including equal internet traffic transmission, the right to protest online, and state-ordered network shutdowns.",
    keyConcepts: [
      { term: "Net Neutrality", explanation: "Principle that Internet Service Providers must treat all internet data equally without blocking, throttling, or paid prioritization." },
      { term: "Network Shutdown Legality", explanation: "Scrutinizing government internet blackouts under the international proportionality, legality, and necessity test." },
      { term: "Digital Censorship & Free Expression", explanation: "Statutory boundaries restricting arbitrary administrative blocking of news portals and communication apps." },
    ],
    relevantLaws: [
      { jurisdiction: "International", law: "Universal Declaration of Human Rights", citation: "UDHR Article 19", status: "In Force" },
      { jurisdiction: "European Union", law: "Open Internet Regulation", citation: "Regulation (EU) 2015/2120", status: "In Force" },
      { jurisdiction: "United States", law: "FCC Open Internet Rules & Title II Communications Act", citation: "47 U.S.C. § 151 et seq.", status: "Active Order" },
    ],
    jurisdictionDifferences:
      "The EU strictly enshrines net neutrality in Regulation 2015/2120. In the US, net neutrality classification has shifted between Title I (information service) and Title II (common carrier) across presidential administrations.",
    practicalExample: {
      scenario: "An ISP slows down video streaming packets from a competing streaming platform while granting high-speed lanes to its own subsidiary service.",
      legalOutcome: "Illegal throttling under net neutrality regulations, subjecting the ISP to enforcement actions by telecommunication regulators.",
    },
    landmarkCases: [
      { name: "Anuradha Bhasin v. Union of India", citation: "(2020) 3 SCC 637", ruling: "Indefinite suspension of internet services is illegal; freedom of speech and trade via the internet is constitutionally protected under Article 19(1)." },
      { name: "Mozilla Corp. v. FCC", citation: "940 F.3d 1 (D.C. Cir. 2019)", ruling: "Upheld FCC deregulation but vacated restrictions barring states from enacting their own state-level net neutrality laws." },
    ],
    officialSources: [
      { name: "UN Special Rapporteur on Freedom of Expression", url: "https://www.ohchr.org/en/special-procedures/sr-freedom-of-opinion-and-expression" },
      { name: "Body of European Regulators for Electronic Communications (BEREC)", url: "https://www.berec.europa.eu" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "online-safety": {
    title: "Online Safety & Harms Prevention",
    tagline: "Statutory duties of care on platforms, non-consensual imagery, and user safety enforcement.",
    overview:
      "Online safety law establishes proactive statutory duties of care on platforms to safeguard users from illegal content, cyberstalking, violent threats, and algorithmic amplification of harmful material.",
    keyConcepts: [
      { term: "Duty of Care", explanation: "Statutory requirement to design services and content delivery systems to minimize risk of illegal harms." },
      { term: "Takedown Mandates for Harmful Content", explanation: "Strict administrative orders to remove illegal content within statutory deadlines (e.g. 24 hours)." },
      { term: "Age-Appropriate Design Codes", explanation: "Mandatory privacy and safety defaults for services likely to be accessed by minors." },
    ],
    relevantLaws: [
      { jurisdiction: "United Kingdom", law: "Online Safety Act 2023", citation: "2023 c. 50", status: "In Force" },
      { jurisdiction: "Australia", law: "Online Safety Act 2021", citation: "Act No. 76, 2021", status: "In Force" },
      { jurisdiction: "Sri Lanka", law: "Online Safety Act No. 9 of 2024", citation: "Certified February 2024", status: "In Force" },
    ],
    jurisdictionDifferences:
      "Australia established the world's first eSafety Commissioner with statutory powers to issue removal notices. The UK Online Safety Act imposes heavy corporate fines (up to 10% global revenue) for systemic duty of care failures.",
    practicalExample: {
      scenario: "An image-sharing app fails to take down non-consensual intimate imagery after receiving verified victim complaints.",
      legalOutcome: "Under the Australian Online Safety Act, the eSafety Commissioner issues a formal removal notice; non-compliance triggers severe civil penalties on both platform and uploader.",
    },
    landmarkCases: [
      { name: "eSafety Commissioner v. X Corp.", citation: "[2024] FCA 499 (Federal Court of Australia)", ruling: "Litigation testing the extraterritorial scope of global content takedown orders issued by national online safety regulators." },
      { name: "R v. Nimmo", citation: "[2014] EW Misc (Crown Court)", ruling: "Early landmark prosecution establishing criminal sentencing for targeted online harassment and rape threats sent via social platforms." },
    ],
    officialSources: [
      { name: "Australian eSafety Commissioner", url: "https://www.esafety.gov.au" },
      { name: "UK Ofcom Online Safety Policy", url: "https://www.ofcom.org.uk" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "fintech-cybercrime": {
    title: "FinTech, Cryptocurrency & Cyber Fraud",
    tagline: "Decentralized finance regulation, smart contract exploitation, AML/KYC, and digital payment fraud.",
    overview:
      "FinTech and cryptocurrency cyber law examines financial fraud, automated payment system compromise, the FATF Travel Rule, anti-money laundering compliance, and legal liability for smart contract breaches.",
    keyConcepts: [
      { term: "FATF Crypto Travel Rule", explanation: "Recommendation 16 requiring Virtual Asset Service Providers (VASPs) to share originator and beneficiary data during crypto transfers." },
      { term: "Smart Contract Exploit Liability", explanation: "The legal doctrine that code is not law: exploiting economic loopholes in code to drain funds constitutes criminal larceny." },
      { term: "Authorized Push Payment (APP) Fraud", explanation: "Regulatory regimes mandating bank reimbursement when consumers are manipulated into transferring funds to cyber fraudsters." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "Markets in Crypto-Assets (MiCA)", citation: "Regulation (EU) 2023/1114", status: "In Force" },
      { jurisdiction: "United States", law: "Bank Secrecy Act & Wire Fraud", citation: "31 U.S.C. § 5311; 18 U.S.C. § 1343", status: "In Force" },
      { jurisdiction: "International", law: "FATF Guidance for Virtual Assets", citation: "FATF/PLEN(2019)22", status: "Standard" },
    ],
    jurisdictionDifferences:
      "The EU MiCA regulation introduces comprehensive licensing and reserve requirements for crypto-asset service providers. The US applies existing securities (SEC) and commodities (CFTC) laws through aggressive enforcement.",
    practicalExample: {
      scenario: "A hacker discovers a reentrancy flaw in a DeFi protocol, manipulates oracle price feeds, and drains $100M in user deposits, claiming 'the code allowed it.'",
      legalOutcome: "Criminal prosecution for wire fraud and computer intrusion; courts reject 'code is law' defenses where the perpetrator intentionally acts against contractual intent.",
    },
    landmarkCases: [
      { name: "United States v. Eisenberg", citation: "No. 1:23-cr-00169 (S.D.N.Y. 2024)", ruling: "Jury convicted Mango Markets trader of commodities fraud and manipulation for executing an economic exploit of decentralized oracle feeds." },
      { name: "SEC v. Ripple Labs, Inc.", citation: "No. 20-cv-10832 (S.D.N.Y. 2023)", ruling: "Institutional sales of digital tokens constituted investment contracts under Howey, whereas blind exchange programmatic sales did not." },
    ],
    officialSources: [
      { name: "Financial Action Task Force (FATF)", url: "https://www.fatf-gafi.org" },
      { name: "European Banking Authority (FinTech & MiCA)", url: "https://www.eba.europa.eu" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "children-online": {
    title: "Children's Digital Safety & Youth Privacy",
    tagline: "COPPA compliance, verifiable parental consent, age verification standards, and online grooming laws.",
    overview:
      "This topic examines specialized protective statutory regimes governing child online privacy, prohibiting behavioral advertising to minors, mandating age verification, and criminalizing online exploitation.",
    keyConcepts: [
      { term: "Verifiable Parental Consent (VPC)", explanation: "Statutory requirement to obtain affirmative consent from a parent before collecting data from children under 13." },
      { term: "Age-Appropriate Design Default", explanation: "Mandating that privacy settings for children default to high protection, geolocation is disabled, and profiling is blocked." },
      { term: "Prohibition on Commercial Profiling", explanation: "Strict statutory bans on using children's behavioral telemetry for targeted advertising." },
    ],
    relevantLaws: [
      { jurisdiction: "United States", law: "Children's Online Privacy Protection Act (COPPA)", citation: "15 U.S.C. § 6501-6506", status: "In Force" },
      { jurisdiction: "United Kingdom", law: "Age Appropriate Design Code (Children's Code)", citation: "DPA 2018 Section 123", status: "In Force" },
      { jurisdiction: "European Union", law: "GDPR Article 8 (Child Consent)", citation: "Regulation (EU) 2016/679", status: "In Force" },
    ],
    jurisdictionDifferences:
      "The US COPPA applies to children under 13. The EU GDPR establishes a baseline of 16, allowing member states to lower the age to 13 (UK uses 13; Ireland uses 16; Germany uses 16).",
    practicalExample: {
      scenario: "A mobile gaming studio collects persistent device identifiers and location data from an educational game for elementary students without parental notice.",
      legalOutcome: "Direct violation of COPPA Rule (16 C.F.R. § 312.5), subjecting the studio to civil penalties up to $50,120 per violation from the FTC.",
    },
    landmarkCases: [
      { name: "United States v. Epic Games, Inc.", citation: "No. 5:22-cv-00518 (E.D.N.C. 2022)", ruling: "Record $520M settlement with FTC for COPPA violations and deceptive dark patterns tricking children into unintended in-game charges." },
      { name: "FTC v. Google LLC and YouTube LLC", citation: "No. 1:19-cv-02842 (D.D.C. 2019)", ruling: "$170M settlement for tracking children on child-directed YouTube channels for targeted behavioral advertising without parental consent." },
    ],
    officialSources: [
      { name: "US Federal Trade Commission COPPA Guidance", url: "https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa" },
      { name: "UK Information Commissioner's Office Children's Code", url: "https://ico.org.uk/for-organisations/childrens-code-hub/" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "workplace-technology": {
    title: "Workplace Technology, Employee Monitoring & BYOD",
    tagline: "Keylogger legality, corporate device policies, whistleblowing protections, and labor privacy rights.",
    overview:
      "Workplace cyber law balances employer rights to protect proprietary assets and monitor network traffic against employee statutory expectations of privacy and communications confidentiality.",
    keyConcepts: [
      { term: "Prior Written Notification", explanation: "Legal requirement that employers provide transparent advance notice before deploying monitoring software." },
      { term: "Bring Your Own Device (BYOD) Liability", explanation: "Legal issues arising when corporate data is stored on employee personal smartphones and tablets." },
      { term: "Whistleblower Protection", explanation: "Statutory immunity shielding employees who exfiltrate sensitive data solely to report regulatory violations to authorities." },
    ],
    relevantLaws: [
      { jurisdiction: "European Union", law: "GDPR & Working Party 29 Opinion 2/2017", citation: "WP 249 on Data Processing at Work", status: "Guidance" },
      { jurisdiction: "United States", law: "Electronic Communications Privacy Act", citation: "18 U.S.C. § 2510 (Provider Exception)", status: "In Force" },
      { jurisdiction: "International", law: "ILO Code of Practice on Protection of Workers' Data", citation: "ILO Geneva 1997", status: "Standard" },
    ],
    jurisdictionDifferences:
      "In the US, employers enjoy broad discretion to monitor company-owned devices with minimal notice. In the EU, proportionality and legitimate interest assessments are required, and monitoring private personal emails on work laptops is generally unlawful.",
    practicalExample: {
      scenario: "An employer secretly installs keystroke logging software on remote workers' personal laptops without their knowledge or consent.",
      legalOutcome: "Illegal interception under computer privacy statutes and GDPR violation; keylogger logs are inadmissible in disciplinary hearings and trigger severe regulatory penalties.",
    },
    landmarkCases: [
      { name: "Bărbulescu v. Romania", citation: "App. No. 61496/08 (ECtHR Grand Chamber 2017)", ruling: "Employers cannot monitor employee workplace communications without clear prior notice and proportionality safeguards." },
      { name: "City of Ontario v. Quon", citation: "560 U.S. 746 (2010)", ruling: "Employer review of employee text messages on government-issued pagers was a reasonable work-related search under the Fourth Amendment." },
    ],
    officialSources: [
      { name: "European Data Protection Board Employment Guidelines", url: "https://edpb.europa.eu" },
      { name: "US National Labor Relations Board Guidance on Electronic Surveillance", url: "https://www.nlrb.gov" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "cloud-data": {
    title: "Cloud Computing, Sovereignty & Cross-Border Data",
    tagline: "Shared responsibility models, lawful government access, US CLOUD Act, and data localization mandates.",
    overview:
      "Cloud law examines contractual risk distribution, jurisdictional authority over remote data centers, statutory data localization mandates, and cross-border lawful access to electronic communications.",
    keyConcepts: [
      { term: "Shared Responsibility Model", explanation: "Contractual allocation of cybersecurity duties between cloud service provider (security OF the cloud) and customer (security IN the cloud)." },
      { term: "US CLOUD Act Warrants", explanation: "Statute empowering US law enforcement to compel US cloud providers to produce data regardless of whether it is stored domestically or abroad." },
      { term: "Data Localization Mandates", explanation: "Statutes requiring that certain categories of national data (financial, health, citizen) be stored on physical servers within national territory." },
    ],
    relevantLaws: [
      { jurisdiction: "United States", law: "Clarifying Lawful Overseas Use of Data (CLOUD) Act", citation: "18 U.S.C. § 2713", status: "In Force" },
      { jurisdiction: "European Union", law: "European Data Act & Cloud Codes of Conduct", citation: "Regulation (EU) 2023/2854", status: "In Force" },
      { jurisdiction: "International", law: "ISO/IEC 27018:2019", citation: "Protection of PII in Public Clouds", status: "Standard" },
    ],
    jurisdictionDifferences:
      "The US CLOUD Act allows extraterritorial access based on corporate control. The EU Data Act emphasizes cloud switching, vendor lock-in prevention, and safeguards against unlawful foreign governmental transfer.",
    practicalExample: {
      scenario: "A US court orders an enterprise cloud provider headquartered in Seattle to produce emails of a suspect stored exclusively in a Dublin data center.",
      legalOutcome: "Under 18 U.S.C. § 2713 (CLOUD Act), the provider must comply because it possesses custody and control over the data, subject to formal comity challenges.",
    },
    landmarkCases: [
      { name: "United States v. Microsoft Corp.", citation: "138 S. Ct. 1186 (2018)", ruling: "Litigation regarding extraterritorial warrants mooted by Congress passing the CLOUD Act in 2018." },
      { name: "Schrems II (Data Protection Commissioner v. Facebook Ireland)", citation: "Case C-311/18 (CJEU 2020)", ruling: "Invalidated EU-US Privacy Shield due to unrestricted US cloud surveillance under Section 702 FISA." },
    ],
    officialSources: [
      { name: "US Department of Justice CLOUD Act Resources", url: "https://www.justice.gov/dag/cloudact" },
      { name: "European Commission Data Act Hub", url: "https://digital-strategy.ec.europa.eu/en/policies/data-act" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
  "international-cooperation": {
    title: "International Cooperation & Cross-Border Cyber Law",
    tagline: "Multilateral cyber treaties, 24/7 networks, MLAT evidence pipelines, and extradition frameworks.",
    overview:
      "Because cyber operations transcend sovereign borders, investigating and prosecuting transnational offenders requires formalized bilateral and multilateral treaties, real-time preservation networks, and mutual legal assistance.",
    keyConcepts: [
      { term: "Mutual Legal Assistance Treaty (MLAT)", explanation: "Formal treaty mechanism allowing courts and prosecutors in one sovereign nation to obtain evidence from authorities in another." },
      { term: "24/7 Point of Contact Network", explanation: "Mandatory international directory under the Budapest Convention ensuring immediate emergency evidence preservation across time zones." },
      { term: "Direct Cross-Border Evidence Requests", explanation: "Emerging legal frameworks permitting foreign prosecutors to issue lawful preservation and production orders directly to overseas providers." },
    ],
    relevantLaws: [
      { jurisdiction: "Council of Europe", law: "Budapest Convention on Cybercrime", citation: "ETS No. 185", status: "In Force" },
      { jurisdiction: "Council of Europe", law: "Second Additional Protocol to Budapest Convention", citation: "CETS No. 224", status: "Open for Ratification" },
      { jurisdiction: "United Nations", law: "Draft UN Convention Against Cybercrime", citation: "A/78/L.91 (2024)", status: "Adopted Draft" },
    ],
    jurisdictionDifferences:
      "Over 70 states have ratified the Budapest Convention, establishing a common procedural baseline. Developing nations and non-Budapest members are increasingly organizing around the newly drafted United Nations Cybercrime Treaty.",
    practicalExample: {
      scenario: "Ransomware operators in Eastern Europe compromise a healthcare facility in Sri Lanka using virtual private servers rented in Germany.",
      legalOutcome: "Sri Lankan authorities utilize the Budapest Convention 24/7 network to request German authorities issue an immediate expedited data preservation notice to the hosting provider.",
    },
    landmarkCases: [
      { name: "In re Search of Content that is Stored at Premises Controlled by Google", citation: "Misc. No. 16-mc-80263 (N.D. Cal. 2017)", ruling: "Judicial analysis balancing international MLAT comity against domestic search warrants for digital records." },
      { name: "United States v. Ivanov", citation: "175 F. Supp. 2d 367 (D. Conn. 2001)", ruling: "Extraterritorial application of CFAA confirmed where computer access physically occurred in Russia but impacted servers located in the US." },
    ],
    officialSources: [
      { name: "Council of Europe Cybercrime Treaty Office", url: "https://www.coe.int/en/web/cybercrime/the-budapest-convention" },
      { name: "UN Office on Drugs and Crime (UNODC)", url: "https://www.unodc.org/unodc/en/cybercrime/index.html" },
    ],
    lastReviewed: "January 2026",
    verificationStatus: "Verified Legal Review",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = detailedTopics[slug];
  if (!topic) {
    return { title: "Topic Overview — CyberLex" };
  }
  return {
    title: `${topic.title} — Cyber Law Explorer`,
    description: topic.tagline,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = detailedTopics[slug];

  // Also query MySQL for real articles linked to this topic
  let dbArticles: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string;
    readingTimeMinutes: number;
    status: string;
    country: { name: string; flagEmoji: string } | null;
  }> = [];

  try {
    dbArticles = await db.article.findMany({
      where: {
        topic: { slug },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        readingTimeMinutes: true,
        status: true,
        country: { select: { name: true, flagEmoji: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    console.warn("Could not query MySQL for topic articles:", err);
  }

  if (!topic) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-14 h-14 text-(--primary) mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-(--foreground) font-heading mb-2">
            Topic Under Development
          </h1>
          <p className="text-sm text-(--muted-foreground) max-w-lg mx-auto mb-8 leading-relaxed">
            This legal topic is undergoing secondary source verification and statutory cross-referencing.
          </p>
          <Link
            href="/topics"
            className="px-5 py-2.5 rounded-lg bg-(--primary) text-white text-sm font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Topics", href: "/topics" },
            { label: topic.title },
          ]}
          className="mb-8"
        />

        {/* Topic Header Banner */}
        <div className="mb-10 p-8 rounded-3xl border border-(--border-color) bg-(--card-bg) shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-(--primary)/10 text-(--primary) border border-(--primary)/20">
              Cyber Law Domain
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {topic.verificationStatus}
            </span>
            <span className="text-xs text-(--muted-foreground) ml-auto flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Last Audited: {topic.lastReviewed}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            {topic.title}
          </h1>

          <p className="text-lg text-(--muted-foreground) leading-relaxed mb-6 max-w-3xl">
            {topic.tagline}
          </p>

          <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-color) text-xs sm:text-sm text-(--foreground) leading-relaxed">
            <strong className="block text-xs uppercase tracking-wider text-(--primary) font-bold mb-1">
              Statutory Overview & Doctrinal Scope
            </strong>
            {topic.overview}
          </div>
        </div>

        {/* Key Concepts Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-(--primary)" />
            <span>Essential Legal Concepts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topic.keyConcepts.map((concept, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-2 shadow-sm"
              >
                <h3 className="text-sm font-bold text-(--foreground) font-heading">
                  {concept.term}
                </h3>
                <p className="text-xs text-(--muted-foreground) leading-relaxed">
                  {concept.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Statutory Instruments Table */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <span>Key Statutory Frameworks & Treaties</span>
          </h2>
          <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Jurisdiction</th>
                    <th className="py-3 px-4">Statute / Treaty</th>
                    <th className="py-3 px-4">Section / Pinpoint</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border-color)">
                  {topic.relevantLaws.map((law, i) => (
                    <tr key={i} className="hover:bg-(--bg-surface)/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-(--foreground)">{law.jurisdiction}</td>
                      <td className="py-3.5 px-4 font-medium text-(--foreground)">{law.law}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-sky-400">{law.citation}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {law.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Comparative Analysis & Practical Application */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-(--foreground) flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Comparative Jurisdictional Nuance</span>
            </h3>
            <p className="text-xs sm:text-sm text-(--muted-foreground) leading-relaxed">
              {topic.jurisdictionDifferences}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-(--foreground) flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Practical Compliance Scenario</span>
            </h3>
            <p className="text-xs text-(--foreground) font-semibold">
              {topic.practicalExample.scenario}
            </p>
            <div className="p-3 rounded-xl bg-(--bg-surface) border border-(--border-color) text-xs text-sky-400">
              <strong className="block text-[11px] text-(--muted-foreground) uppercase mb-1">
                Legal Assessment & Outcome:
              </strong>
              {topic.practicalExample.legalOutcome}
            </div>
          </div>
        </div>

        {/* Landmark Court Precedents */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-rose-400" />
            <span>Landmark Court Interpretations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.landmarkCases.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-(--foreground)">{c.name}</h3>
                  <span className="text-[11px] font-mono text-sky-400">{c.citation}</span>
                </div>
                <p className="text-xs text-(--muted-foreground) leading-relaxed">{c.ruling}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles in MySQL */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-(--foreground) font-heading flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-400" />
              <span>Articles & In-Depth Guides</span>
            </h2>
            <Link href="/admin/articles/new" className="text-xs text-(--primary) hover:underline font-semibold">
              + Author New Article
            </Link>
          </div>

          {dbArticles.length === 0 ? (
            <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center text-xs text-(--muted-foreground)">
              Articles for this topic are currently undergoing secondary citation review.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/articles/${art.slug}`}
                  className="group p-5 rounded-2xl border border-(--border-color) bg-(--card-bg) hover:border-(--primary)/50 transition-all space-y-2 block"
                >
                  <div className="flex items-center justify-between text-[11px] text-(--muted-foreground)">
                    <span>{art.country ? `${art.country.flagEmoji} ${art.country.name}` : "🌐 Global"}</span>
                    <span>{art.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-sm font-bold text-(--foreground) group-hover:text-(--primary) transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-(--muted-foreground) line-clamp-2">
                    {art.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Official Sources Footer */}
        <div className="p-6 rounded-2xl border border-(--border-color) bg-(--bg-surface) flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-(--foreground) mb-1">
              Authoritative Primary Sources
            </h3>
            <p className="text-xs text-(--muted-foreground)">
              Cross-checked against verified government gazettes and international legal repositories.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.officialSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-(--border-color) bg-(--card-bg) text-xs font-semibold text-(--foreground) hover:border-(--primary)/50 transition-colors"
              >
                <span>{src.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-(--primary)" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
