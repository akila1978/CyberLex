import { PrismaClient, InstrumentType, InstrumentStatus, SourceQuality, AudienceLevel, ArticleStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CyberLex database...");

  // 1. Create Default Admin User
  const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "CyberLex2026!Admin";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "editorial@cyberlex.io" },
    update: {
      passwordHash,
      role: UserRole.ADMIN,
    },
    create: {
      email: "editorial@cyberlex.io",
      name: "CyberLex Editorial Research Board",
      role: UserRole.ADMIN,
      passwordHash,
      bio: "Official editorial board ensuring source verification and accuracy across multi-jurisdictional legal analyses.",
      organization: "CyberLex Foundation",
    },
  });
  console.log("Created/Updated admin user:", adminUser.email);

  // 2. Seed Topics
  const topicData = [
    { name: "Cybercrime", slug: "cybercrime", icon: "Shield", description: "Hacking, malware, ransomware, denial of service, digital fraud, and statutory computer crimes.", displayOrder: 1 },
    { name: "Privacy", slug: "privacy", icon: "Lock", description: "Fundamental right to privacy, surveillance limits, interception, and digital tracking.", displayOrder: 2 },
    { name: "Data Protection", slug: "data-protection", icon: "Database", description: "GDPR, regional data protection acts, controller/processor duties, and statutory data subject rights.", displayOrder: 3 },
    { name: "Digital Evidence", slug: "digital-evidence", icon: "FileSearch", description: "Admissibility of electronic records, computer forensics, hash integrity, and chain of custody.", displayOrder: 4 },
    { name: "Social Media & Online Speech", slug: "social-media", icon: "MessageCircle", description: "Platform liability, online harassment, content moderation, defamation, and digital safety laws.", displayOrder: 5 },
    { name: "Ethical Hacking & Research", slug: "ethical-hacking", icon: "Terminal", description: "Legal boundaries of penetration testing, bug bounty programs, and vulnerability disclosure.", displayOrder: 6 },
    { name: "Electronic Transactions", slug: "electronic-transactions", icon: "CreditCard", description: "Legal recognition of digital signatures, electronic contracts, and cross-border paperless trade.", displayOrder: 7 },
    { name: "AI & Law", slug: "ai-law", icon: "Brain", description: "Artificial intelligence regulation, autonomous systems liability, copyright in AI training, and high-risk AI governance.", displayOrder: 8 },
    { name: "Intellectual Property", slug: "intellectual-property", icon: "Copyright", description: "Software copyright, trade secrets, digital piracy, domain disputes, and open source licensing.", displayOrder: 9 },
    { name: "Cybersecurity Compliance", slug: "cybersecurity-compliance", icon: "CheckCircle", description: "Mandatory incident reporting, NIS2, critical infrastructure security, and governance standards.", displayOrder: 10 },
    { name: "Digital Rights", slug: "digital-rights", icon: "Scale", description: "Net neutrality, internet access as a right, digital censorship, and algorithmic fairness.", displayOrder: 11 },
    { name: "Online Safety", slug: "online-safety", icon: "ShieldCheck", description: "Protecting users from online harms, non-consensual image sharing, and cyber extortion.", displayOrder: 12 },
    { name: "FinTech & Cybercrime", slug: "fintech-cybercrime", icon: "Wallet", description: "Cryptocurrency regulations, AML/KYC requirements, payment system fraud, and smart contract law.", displayOrder: 13 },
    { name: "Children Online", slug: "children-online", icon: "Users", description: "COPPA, Age Appropriate Design Codes, online grooming laws, and youth privacy safeguards.", displayOrder: 14 },
    { name: "Workplace Technology", slug: "workplace-technology", icon: "Building", description: "Employee monitoring, bring-your-own-device (BYOD) legal risks, and whistleblowing protections.", displayOrder: 15 },
    { name: "Cloud & Data Governance", slug: "cloud-data", icon: "Cloud", description: "Cross-border data flows, sovereignty, cloud shared-responsibility models, and vendor lock-in.", displayOrder: 16 },
    { name: "International Cooperation", slug: "international-cooperation", icon: "Globe", description: "Budapest Convention, Mutual Legal Assistance Treaties (MLATs), and extradition in cyber attacks.", displayOrder: 17 },
  ];

  for (const t of topicData) {
    await prisma.topic.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    });
  }
  console.log(`Seeded ${topicData.length} topics`);

  // 3. Seed Countries
  const countryData = [
    {
      name: "Sri Lanka",
      code: "LK",
      slug: "sri-lanka",
      region: "South Asia",
      flagEmoji: "🇱🇰",
      legalSystem: "Mixed (Roman-Dutch Law & English Common Law)",
      summary: "Sri Lanka has enacted progressive cyber laws including the Computer Crimes Act No. 24 of 2007, the Electronic Transactions Act No. 19 of 2006 (aligned with UNCITRAL), and the Personal Data Protection Act No. 9 of 2022 (establishing the Data Protection Authority). The Online Safety Act No. 9 of 2024 represents recent content regulation legislation.",
      dpaAuthority: "Data Protection Authority of Sri Lanka (DPA)",
      dpaUrl: "https://www.dpa.gov.lk",
      certAuthority: "Sri Lanka CERT|CC",
      certUrl: "https://www.cert.gov.lk",
      cyberStrategyUrl: "https://www.cert.gov.lk/strategy",
    },
    {
      name: "United States",
      code: "US",
      slug: "united-states",
      region: "North America",
      flagEmoji: "🇺🇸",
      legalSystem: "Common Law (Federal & State)",
      summary: "Governed federally by the Computer Fraud and Abuse Act (18 U.S.C. § 1030), the Stored Communications Act (SCA), and sector-specific privacy frameworks (HIPAA, GLBA, COPPA) alongside comprehensive state statutes like California's CCPA/CPRA.",
      dpaAuthority: "Federal Trade Commission (FTC) & State AGs",
      dpaUrl: "https://www.ftc.gov",
      certAuthority: "CISA (Cybersecurity & Infrastructure Security Agency)",
      certUrl: "https://www.cisa.gov",
      cyberStrategyUrl: "https://www.whitehouse.gov/briefing-room/statements-releases/2023/03/02/fact-sheet-national-cybersecurity-strategy/",
    },
    {
      name: "European Union",
      code: "EU",
      slug: "european-union",
      region: "Europe",
      flagEmoji: "🇪🇺",
      legalSystem: "Supranational EU Law & Civil/Common Law Member States",
      summary: "Global pioneer in rights-based technology regulation, anchored by the GDPR (Regulation EU 2016/679), NIS2 Directive (EU 2022/2555), Cyber Resilience Act (CRA), Digital Services Act (DSA), and the EU Artificial Intelligence Act (EU 2024/1689).",
      dpaAuthority: "European Data Protection Board (EDPB)",
      dpaUrl: "https://edpb.europa.eu",
      certAuthority: "ENISA (EU Agency for Cybersecurity)",
      certUrl: "https://www.enisa.europa.eu",
      cyberStrategyUrl: "https://digital-strategy.ec.europa.eu/en/policies/cybersecurity-strategy",
    },
    {
      name: "United Kingdom",
      code: "GB",
      slug: "united-kingdom",
      region: "Europe",
      flagEmoji: "🇬🇧",
      legalSystem: "Common Law",
      summary: "Anchored by the Computer Misuse Act 1990, UK Data Protection Act 2018 (incorporating UK GDPR), Network and Information Systems Regulations 2018, and the Online Safety Act 2023 enforced by Ofcom.",
      dpaAuthority: "Information Commissioner's Office (ICO)",
      dpaUrl: "https://ico.org.uk",
      certAuthority: "National Cyber Security Centre (NCSC)",
      certUrl: "https://www.ncsc.gov.uk",
      cyberStrategyUrl: "https://www.gov.uk/government/publications/national-cyber-strategy-2022",
    },
    {
      name: "Singapore",
      code: "SG",
      slug: "singapore",
      region: "Southeast Asia",
      flagEmoji: "🇸🇬",
      legalSystem: "Common Law",
      summary: "Robust digital hub governed by the Cybersecurity Act 2018, the Personal Data Protection Act 2012 (PDPA), the Computer Misuse Act, and the Protection from Online Falsehoods and Manipulation Act (POFMA).",
      dpaAuthority: "Personal Data Protection Commission (PDPC)",
      dpaUrl: "https://www.pdpc.gov.sg",
      certAuthority: "SingCERT (Cyber Security Agency of Singapore - CSA)",
      certUrl: "https://www.csa.gov.sg",
      cyberStrategyUrl: "https://www.csa.gov.sg/our-programmes/cybersecurity-strategy",
    },
    {
      name: "India",
      code: "IN",
      slug: "india",
      region: "South Asia",
      flagEmoji: "🇮🇳",
      legalSystem: "Common Law",
      summary: "Primary legislation is the Information Technology Act 2000 (as amended 2008), complemented by the landmark Digital Personal Data Protection Act 2023 (DPDP Act) and CERT-In mandatory 6-hour cybersecurity reporting directions.",
      dpaAuthority: "Data Protection Board of India (DPBI)",
      dpaUrl: "https://www.meity.gov.in",
      certAuthority: "Indian Computer Emergency Response Team (CERT-In)",
      certUrl: "https://www.cert-in.org.in",
      cyberStrategyUrl: "https://www.meity.gov.in/cyber-surakshit-bharat-programme",
    },
    {
      name: "Australia",
      code: "AU",
      slug: "australia",
      region: "Oceania",
      flagEmoji: "🇦🇺",
      legalSystem: "Common Law",
      summary: "Key statutes include the Cybercrime Act 2001 (Criminal Code Part 10.7), the Privacy Act 1988 (under major reform), the Security of Critical Infrastructure Act 2018 (SOCI Act), and the Online Safety Act 2021 administered by the eSafety Commissioner.",
      dpaAuthority: "Office of the Australian Information Commissioner (OAIC)",
      dpaUrl: "https://www.oaic.gov.au",
      certAuthority: "Australian Cyber Security Centre (ACSC / ASD)",
      certUrl: "https://www.cyber.gov.au",
      cyberStrategyUrl: "https://www.homeaffairs.gov.au/about-us/our-portfolios/cyber-security/strategy",
    },
  ];

  for (const c of countryData) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log(`Seeded ${countryData.length} countries`);

  // 4. Seed Primary Statutes
  const slCountry = await prisma.country.findUnique({ where: { code: "LK" } });
  const euCountry = await prisma.country.findUnique({ where: { code: "EU" } });
  const usCountry = await prisma.country.findUnique({ where: { code: "US" } });

  if (slCountry) {
    await prisma.statute.upsert({
      where: { slug: "computer-crimes-act-24-2007" },
      update: {},
      create: {
        title: "Computer Crimes Act No. 24 of 2007",
        officialTitle: "An Act to Provide for the Identification of Computer Crimes and for the Prevention and Punishment of Such Crimes",
        slug: "computer-crimes-act-24-2007",
        countryId: slCountry.id,
        instrumentType: InstrumentType.LAW,
        yearEnacted: 2007,
        status: InstrumentStatus.CURRENT,
        officialGazetteRef: "Gazette of the Democratic Socialist Republic of Sri Lanka, No. 1,514/19",
        officialUrl: "https://www.cert.gov.lk/legislation",
        summary: "Primary statute penalizing unauthorized access, modification, or disclosure of data, damage to computer systems, and computer-related fraud and extortion in Sri Lanka.",
        enforcementBody: "Sri Lanka Police Cyber Crimes Division / High Court of Sri Lanka",
      },
    });

    await prisma.statute.upsert({
      where: { slug: "personal-data-protection-act-9-2022" },
      update: {},
      create: {
        title: "Personal Data Protection Act No. 9 of 2022 (PDPA)",
        officialTitle: "An Act to Regulate the Processing of Personal Data; to Identify and Strengthen the Rights of Data Subjects in Relation to the Processing of Personal Data",
        slug: "personal-data-protection-act-9-2022",
        countryId: slCountry.id,
        instrumentType: InstrumentType.LAW,
        yearEnacted: 2022,
        status: InstrumentStatus.CURRENT,
        officialGazetteRef: "Certified on 19th March 2022",
        officialUrl: "https://www.dpa.gov.lk",
        summary: "Comprehensive data protection framework establishing statutory data subject rights, obligations on public and private data controllers and processors, and establishing the Data Protection Authority of Sri Lanka.",
        enforcementBody: "Data Protection Authority of Sri Lanka",
      },
    });

    await prisma.statute.upsert({
      where: { slug: "online-safety-act-9-2024" },
      update: {},
      create: {
        title: "Online Safety Act No. 9 of 2024",
        officialTitle: "An Act to Establish the Online Safety Commission; to Make Provisions to Prohibit Online Communication of Certain Statements of Fact in Sri Lanka",
        slug: "online-safety-act-9-2024",
        countryId: slCountry.id,
        instrumentType: InstrumentType.LAW,
        yearEnacted: 2024,
        status: InstrumentStatus.CURRENT,
        officialGazetteRef: "Certified on 1st February 2024",
        officialUrl: "https://www.parliament.lk",
        summary: "Legislation establishing the Online Safety Commission to regulate false online statements, online harassment, and digital child safety.",
        enforcementBody: "Online Safety Commission of Sri Lanka",
      },
    });
  }

  if (euCountry) {
    await prisma.statute.upsert({
      where: { slug: "gdpr-regulation-2016-679" },
      update: {},
      create: {
        title: "General Data Protection Regulation (EU 2016/679)",
        officialTitle: "Regulation (EU) 2016/679 of the European Parliament and of the Council on the Protection of Natural Persons with Regard to the Processing of Personal Data",
        slug: "gdpr-regulation-2016-679",
        countryId: euCountry.id,
        instrumentType: InstrumentType.REGULATION,
        yearEnacted: 2016,
        status: InstrumentStatus.CURRENT,
        officialGazetteRef: "OJ L 119, 4.5.2016, p. 1–88",
        officialUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679",
        summary: "The definitive European data protection regulation establishing rights to access, rectification, erasure, and portability, alongside 72-hour breach notification duties and cross-border transfer rules.",
        enforcementBody: "National Data Protection Authorities & European Data Protection Board",
      },
    });

    await prisma.statute.upsert({
      where: { slug: "eu-ai-act-regulation-2024-1689" },
      update: {},
      create: {
        title: "EU Artificial Intelligence Act (EU 2024/1689)",
        officialTitle: "Regulation (EU) 2024/1689 of the European Parliament and of the Council Laying Down Harmonised Rules on Artificial Intelligence",
        slug: "eu-ai-act-regulation-2024-1689",
        countryId: euCountry.id,
        instrumentType: InstrumentType.REGULATION,
        yearEnacted: 2024,
        status: InstrumentStatus.CURRENT,
        officialGazetteRef: "OJ L, 2024/1689, 12.7.2024",
        officialUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        summary: "World's first horizontal regulation on artificial intelligence, establishing four risk categories: unacceptable risk (banned), high risk (strict conformity assessment), limited risk, and minimal risk.",
        enforcementBody: "European AI Office & National Competent Authorities",
      },
    });
  }

  if (usCountry) {
    await prisma.statute.upsert({
      where: { slug: "cfaa-18-usc-1030" },
      update: {},
      create: {
        title: "Computer Fraud and Abuse Act (18 U.S.C. § 1030)",
        officialTitle: "Title 18, United States Code, Section 1030 — Fraud and Related Activity in Connection with Computers",
        slug: "cfaa-18-usc-1030",
        countryId: usCountry.id,
        instrumentType: InstrumentType.LAW,
        yearEnacted: 1986,
        status: InstrumentStatus.CURRENT,
        officialUrl: "https://www.law.cornell.edu/uscode/text/18/1030",
        summary: "Primary federal anti-hacking statute in the United States criminalizing unauthorized access and exceeding authorized access to protected computer systems.",
        enforcementBody: "United States Department of Justice (DOJ) / Federal Bureau of Investigation (FBI)",
      },
    });
  }
  console.log("Seeded primary statutes");

  // 5. Seed Precedent Case Studies
  const caseData = [
    {
      title: "Van Buren v. United States, 141 S. Ct. 1638 (2021)",
      slug: "van-buren-v-united-states",
      court: "Supreme Court of the United States",
      decisionYear: 2021,
      citation: "593 U.S. ___ (2021); 141 S. Ct. 1638",
      jurisdiction: "United States",
      facts: "A police officer was authorized to access a law enforcement license plate database for police work, but ran a search for private gain in exchange for money. He was charged with criminally 'exceeding authorized access' under CFAA § 1030(a)(2).",
      legalIssue: "Does a person 'exceed authorized access' under the CFAA when they have authorization to access information on a computer system, but access it for an improper purpose?",
      ruling: "The Supreme Court held (6-3) that an individual 'exceeds authorized access' only when accessing information on a computer system that they were not entitled under any circumstance to obtain. Purpose-based policy violations do not trigger criminal CFAA liability.",
      impact: "A landmark victory for cybersecurity researchers and ethical hackers, ensuring that breaching an employer policy or website terms of service does not automatically constitute federal felony hacking.",
      status: "Precedent",
    },
    {
      title: "Schrems II (Data Protection Commissioner v Facebook Ireland and Maximillian Schrems, C-311/18)",
      slug: "schrems-ii-c-311-18",
      court: "Court of Justice of the European Union (CJEU)",
      decisionYear: 2020,
      citation: "ECLI:EU:C:2020:559 (Case C-311/18)",
      jurisdiction: "European Union",
      facts: "Austrian privacy activist Max Schrems challenged Facebook Ireland's reliance on Standard Contractual Clauses (SCCs) to transfer his personal data to Facebook servers in the US, arguing that US surveillance legislation (FISA Section 702 and Executive Order 12333) did not provide adequate redress for non-US citizens.",
      legalIssue: "Is the EU-US Privacy Shield adequate under GDPR Article 45, and can SCCs remain valid when the destination country's legal regime allows warrantless mass surveillance?",
      ruling: "The CJEU invalidated the EU-US Privacy Shield adequacy decision as incompatible with EU fundamental rights, while upholding the validity of SCCs subject to data controllers conducting transfer impact assessments and applying effective supplementary technical safeguards.",
      impact: "Fundamentally transformed cross-border data transfer compliance globally, requiring data localization reviews, encryption safeguards, and eventually leading to the new EU-US Data Privacy Framework.",
      status: "Precedent",
    },
  ];

  for (const cs of caseData) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`Seeded ${caseData.length} case studies`);

  // 6. Seed Glossary Terms
  const glossaryData = [
    {
      term: "Adequacy Decision",
      slug: "adequacy-decision",
      category: "Data Protection",
      definition: "A formal administrative determination by a supervisory authority (e.g. European Commission under GDPR Art. 45) that a third country provides an essentially equivalent standard of personal data protection.",
      statutoryContext: "GDPR Article 45; Sri Lanka PDPA Section 26",
    },
    {
      term: "Chain of Custody",
      slug: "chain-of-custody",
      category: "Digital Evidence",
      definition: "A verified chronological record documenting the seizure, custody, control, transfer, analysis, and disposition of physical and digital evidence to guarantee courtroom authenticity and admissibility.",
      statutoryContext: "ISO/IEC 27037; Electronic Transactions Act No. 19 of 2006 Section 18",
    },
    {
      term: "Coordinated Vulnerability Disclosure (CVD)",
      slug: "coordinated-vulnerability-disclosure",
      category: "Ethical Hacking",
      definition: "A formal protocol wherein vulnerability finders report system weaknesses privately to the software vendor or national CERT, affording a reasonable window to remediate before public dissemination.",
      statutoryContext: "ISO/IEC 29147; NIST SP 800-216",
    },
    {
      term: "Extraterritorial Jurisdiction",
      slug: "extraterritorial-jurisdiction",
      category: "Jurisdiction & Treaties",
      definition: "The statutory power of a sovereign nation to apply its national laws and enforcement powers beyond its physical geographic boundaries based on the nationality of the offender or the location of victims.",
      statutoryContext: "GDPR Article 3(2); Budapest Convention Article 22",
    },
  ];

  for (const g of glossaryData) {
    await prisma.glossaryTerm.upsert({
      where: { slug: g.slug },
      update: g,
      create: g,
    });
  }
  console.log(`Seeded ${glossaryData.length} glossary terms`);

  // 7. Seed Initial Verified Article
  const cybercrimeTopic = await prisma.topic.findUnique({ where: { slug: "cybercrime" } });
  if (cybercrimeTopic && slCountry) {
    const article = await prisma.article.upsert({
      where: { slug: "sri-lanka-computer-crimes-act-guide" },
      update: {},
      create: {
        title: "Understanding Sri Lanka's Computer Crimes Act No. 24 of 2007: A Legal & Technical Guide",
        slug: "sri-lanka-computer-crimes-act-guide",
        subtitle: "How unauthorized access, data damage, and digital extortion are prosecuted under Sri Lankan cyber jurisprudence.",
        summary: "A comprehensive examination of the statutory provisions, key offenses, investigative powers, and judicial interpretations under the Computer Crimes Act No. 24 of 2007.",
        content: `## 1. Introduction and Legislative Background
Enacted in 2007, the Computer Crimes Act No. 24 of 2007 (CCA) established the foundational statutory architecture for prosecuting digital offenses in Sri Lanka. Prior to its enactment, prosecutors were forced to apply traditional Penal Code provisions (such as mischief or criminal breach of trust) to intangible electronic data.

## 2. Core Offenses Defined Under Part I
The Act delineates computer crimes into distinct categories based on mens rea and technical outcome:

### Section 3: Unauthorized Access (Hacking)
Section 3 penalizes any person who intentionally causes a computer to perform any function for the purpose of securing access to any program or data held in any computer without lawful authority.

### Section 4: Access with Intent to Commit Further Offenses
Where unauthorized access is secured with the intent to commit a secondary criminal offense (such as theft, forgery, or extortion), Section 4 imposes aggravated penalties.

### Section 5: Unauthorized Modification of Computer Data
Section 5 targets data alteration, deletion, or introduction of malicious code (malware, ransomware) that impairs the operation of any computer or software.

## 3. Critical Infrastructure & National Security Provisions
Section 6 elevates unauthorized access into a high-grade national security offense whenever the targeted computer system affects national security, the economy, or public order.

## 4. Investigative Powers and Admissibility
Part II provides designated police officers with powers to search premises, seize digital storage media, and compel the production of encryption keys under judicial warrant, integrating seamlessly with the Electronic Transactions Act No. 19 of 2006 for evidentiary admissibility.`,
        topicId: cybercrimeTopic.id,
        countryId: slCountry.id,
        targetAudience: "Cybersecurity Professionals, Legal Counsel, and Researchers",
        difficulty: AudienceLevel.INTERMEDIATE,
        status: ArticleStatus.PUBLISHED,
        sourceQuality: SourceQuality.PRIMARY,
        authorId: adminUser.id,
        readingTimeMinutes: 8,
        publishedAt: new Date("2025-01-15T00:00:00Z"),
        isFeatured: true,
      },
    });

    // Add citation for primary article
    await prisma.citation.create({
      data: {
        articleId: article.id,
        title: "Computer Crimes Act No. 24 of 2007 (Official Gazette)",
        sourceUrl: "https://www.cert.gov.lk/legislation",
        sourceType: SourceQuality.PRIMARY,
        citationText: "Acts of Sri Lanka Parliament No. 24 of 2007, Certified on 23rd May 2007.",
        isVerified: true,
        verifiedAt: new Date(),
        notes: "Verified against official gazette text.",
      },
    });
  }

  // 6. Additional Verified Article Library Backlog
  const additionalArticles = [
    {
      title: "GDPR Article 33 & 34: 72-Hour Breach Notification Operational Handbook",
      slug: "gdpr-breach-notification-handbook",
      subtitle: "Regulatory timelines, risk thresholds, and mandatory supervisory disclosures under EU law.",
      summary: "Detailed analysis of supervisory reporting obligations under Article 33 GDPR and data subject communication triggers under Article 34.",
      content: `## 1. The Statutory 72-Hour Window
Article 33(1) of the GDPR requires data controllers to notify personal data breaches to the competent supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware of it, unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons.

## 2. Thresholds for Communication to Data Subjects
Under Article 34, when the personal data breach is likely to result in a high risk to individual rights and freedoms, the controller must also communicate the breach directly to the affected data subjects without undue delay.

## 3. Enforcement Sanctions
Failure to report in accordance with Article 33 and 34 exposes organizations to administrative fines up to €10,000,000 or up to 2% of the total worldwide annual turnover of the preceding financial year.`,
      topicSlug: "data-protection",
      countrySlug: "european-union",
      difficulty: AudienceLevel.INTERMEDIATE,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 7,
      isFeatured: true,
      citations: [
        {
          title: "Regulation (EU) 2016/679 (GDPR), Articles 33 & 34",
          sourceUrl: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
          citationText: "Official Journal of the European Union, L 119, 4.5.2016, p. 1–88.",
        },
      ],
    },
    {
      title: "CFAA Authorization Boundaries Post-Van Buren: Defining the Limits of Computer Fraud",
      slug: "cfaa-authorization-boundaries-van-buren",
      subtitle: "The gates-up versus gates-down statutory test in US federal hacking jurisprudence.",
      summary: "Analysis of the US Supreme Court's decision in Van Buren v. United States, settling the circuit split over 'exceeds authorized access'.",
      content: `## 1. Statutory Context of 18 U.S.C. § 1030
The Computer Fraud and Abuse Act penalizes whoever intentionally accesses a computer without authorization or exceeds authorized access, and thereby obtains information from any protected computer.

## 2. The Supreme Court's Gates-Up Test
In Van Buren v. United States, 593 U.S. 374 (2021), Justice Barrett writing for the 6-3 majority ruled that an individual exceeds authorized access only when accessing computer areas (files, folders, databases) to which computer access permissions do not extend.

## 3. Impact on Terms of Service Violations
The ruling explicitly rejected the government's argument that violating employee handbook rules or website terms of service transforms an authorized user into a federal criminal hacker.`,
      topicSlug: "cybercrime",
      countrySlug: "united-states",
      difficulty: AudienceLevel.ADVANCED,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 9,
      isFeatured: true,
      citations: [
        {
          title: "Van Buren v. United States, 593 U.S. 374 (2021)",
          sourceUrl: "https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf",
          citationText: "Supreme Court Slip Opinion No. 19-783, Decided June 3, 2021.",
        },
      ],
    },
    {
      title: "The Digital Personal Data Protection Act, 2023: India's New Compliance Architecture",
      slug: "india-dpdp-act-cross-border-transfers",
      subtitle: "Statutory rights of data principals and obligations of significant data fiduciaries under Act No. 22 of 2023.",
      summary: "A rigorous examination of India's newly enacted DPDP Act 2023, data fiduciary obligations, and enforcement through the Data Protection Board.",
      content: `## 1. Enactment of the DPDP Act 2023
The Digital Personal Data Protection Act, 2023 received Presidential assent on August 11, 2023, establishing a consent-centric statutory framework for processing digital personal data within India.

## 2. Duties of Significant Data Fiduciaries (SDF)
Under Section 10, entities designated as Significant Data Fiduciaries based on volume and sensitivity of data must appoint a resident Data Protection Officer, engage independent data auditors, and perform periodic Data Protection Impact Assessments (DPIAs).

## 3. Financial Penalties
Section 33 and the First Schedule empower the Data Protection Board of India to levy penalties up to ₹250 Crore for failure to take reasonable security safeguards to prevent personal data breaches.`,
      topicSlug: "data-protection",
      countrySlug: "india",
      difficulty: AudienceLevel.INTERMEDIATE,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 8,
      isFeatured: false,
      citations: [
        {
          title: "The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)",
          sourceUrl: "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
          citationText: "The Gazette of India, Extraordinary, Part II, Section 1, No. 22, 11th August 2023.",
        },
      ],
    },
    {
      title: "UK Computer Misuse Act 1990: Section 3ZA and Critical National Infrastructure Offenses",
      slug: "uk-computer-misuse-act-reform-debates",
      subtitle: "Aggravated statutory penalties and cross-border cyber impairment offenses in English law.",
      summary: "Detailed review of Section 3ZA of the UK Computer Misuse Act 1990 and ongoing Home Office consultations regarding defensive security research exemptions.",
      content: `## 1. Evolution of the Computer Misuse Act 1990
Introduced to address hacking following R v. Gold & Schifreen, the CMA 1990 has been amended by the Police and Justice Act 2006 and the Serious Crime Act 2015.

## 2. Aggravated Offenses under Section 3ZA
Section 3ZA penalizes unauthorized acts causing, or creating a significant risk of, serious damage to human welfare, national security, or the economy. Offenses involving death or severe illness carry a statutory maximum penalty of life imprisonment.

## 3. The Lack of Statutory Public Interest Defense
Unlike data protection law, the CMA currently lacks a statutory public interest defense or good-faith security research exemption, prompting extensive law reform consultations by the Home Office.`,
      topicSlug: "cybercrime",
      countrySlug: "united-kingdom",
      difficulty: AudienceLevel.ADVANCED,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 8,
      isFeatured: false,
      citations: [
        {
          title: "Computer Misuse Act 1990 (c. 18)",
          sourceUrl: "https://www.legislation.gov.uk/ukpga/1990/18",
          citationText: "UK Public General Acts, 1990 c. 18, Section 3ZA as inserted by Serious Crime Act 2015.",
        },
      ],
    },
    {
      title: "Singapore Cybersecurity Act 2018: Statutory Duties for Critical Information Infrastructure",
      slug: "singapore-critical-information-infrastructure-duties",
      subtitle: "Mandatory codes of practice, audit rules, and 2-hour incident notifications under Act 9 of 2018.",
      summary: "Statutory framework governing Critical Information Infrastructure (CII) across 11 national sectors in Singapore and regulatory powers of the CSA Commissioner.",
      content: `## 1. Designation of Critical Information Infrastructure
Under Section 7 of the Cybersecurity Act 2018, the Commissioner of Cybersecurity may designate any computer or computer system as Critical Information Infrastructure (CII) if its loss or compromise would debilitate public defense, essential public services, or the national economy.

## 2. Mandatory Codes of Practice & Incident Notification
CII owners must adhere to technical codes of practice, conduct mandatory annual cybersecurity audits, and report prescribed cybersecurity incidents to the Commissioner within two hours of becoming aware of the incident.

## 3. 2024 Amendments for Virtual and Cloud CII
The Cybersecurity (Amendment) Act 2024 expands regulatory oversight to virtualized systems and third-party cloud infrastructure supporting national critical infrastructure.`,
      topicSlug: "cybersecurity-compliance",
      countrySlug: "singapore",
      difficulty: AudienceLevel.INTERMEDIATE,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 7,
      isFeatured: false,
      citations: [
        {
          title: "Cybersecurity Act 2018 (Act 9 of 2018)",
          sourceUrl: "https://sso.agc.gov.sg/Act/CA2018",
          citationText: "Singapore Statutes Online, Act 9 of 2018, Current 2020 Rev. Ed.",
        },
      ],
    },
    {
      title: "Australia SOCI Act Incident Reporting: Mandatory 12-Hour Critical Cyber Notifications",
      slug: "australia-soci-incident-response-obligations",
      subtitle: "Positive security obligations and Commonwealth intervention powers under the SOCI Act 2018.",
      summary: "Analysis of mandatory cyber incident reporting under Part 2B of the Security of Critical Infrastructure Act 2018 and ACSC assistance powers.",
      content: `## 1. Scope of the SOCI Act Framework
The Security of Critical Infrastructure Act 2018 (Cth), significantly amended in 2021 and 2022, covers 11 critical infrastructure sectors including communications, financial services, data storage, energy, and healthcare.

## 2. Mandatory 12-Hour and 72-Hour Notification Triggers
Responsible entities must report critical cyber security incidents (incidents causing a significant impact on the availability of the asset) to the Australian Cyber Security Centre (ACSC) within 12 hours. Other cyber incidents with a relevant impact must be reported within 72 hours.

## 3. Commonwealth Step-In Intervention Powers
Under Part 3A, during an emergency where a cyber incident poses an imminent threat to national security, the Home Affairs Minister may authorize the Australian Signals Directorate (ASD) to gather information, issue direct instructions, or take direct operational control of a system.`,
      topicSlug: "cybersecurity-compliance",
      countrySlug: "australia",
      difficulty: AudienceLevel.INTERMEDIATE,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 8,
      isFeatured: false,
      citations: [
        {
          title: "Security of Critical Infrastructure Act 2018 (Cth)",
          sourceUrl: "https://www.legislation.gov.au/C2018A00029/latest/text",
          citationText: "Federal Register of Legislation, Act No. 29, 2018 as amended.",
        },
      ],
    },
    {
      title: "EU Artificial Intelligence Act (Regulation 2024/1689): High-Risk Systems Compliance",
      slug: "eu-ai-act-high-risk-systems-compliance",
      subtitle: "Conformity assessments, fundamental rights impact assessments, and technical documentation duties.",
      summary: "Comprehensive guide to Chapter III obligations for providers and deployers of high-risk AI systems under the newly enacted EU AI Act.",
      content: `## 1. High-Risk AI Classification Architecture
Under Article 6 and Annex III of Regulation (EU) 2024/1689, AI systems utilized in biometric identification, critical infrastructure, educational admissions, employment recruitment, essential public services, and law enforcement are designated as High-Risk.

## 2. Mandatory Compliance Requirements (Articles 9-15)
Providers of high-risk AI must establish a continuous Risk Management System (Art. 9), adhere to data governance standards to prevent dataset bias (Art. 10), maintain comprehensive Technical Documentation (Art. 11), enable automatic event logging (Art. 12), and ensure meaningful Human Oversight (Art. 14).

## 3. General Purpose AI (GPAI) and Systemic Risk
Articles 51-56 create targeted obligations for General Purpose AI model providers, requiring copyright policy compliance, model evaluation testing, and reporting of serious incidents to the EU AI Office.`,
      topicSlug: "ai-law",
      countrySlug: "european-union",
      difficulty: AudienceLevel.ADVANCED,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 11,
      isFeatured: true,
      citations: [
        {
          title: "Regulation (EU) 2024/1689 of the European Parliament and of the Council (AI Act)",
          sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
          citationText: "Official Journal of the European Union, L 2024/1689, 12.7.2024.",
        },
      ],
    },
    {
      title: "Chain of Custody and Cryptographic Hash Integrity: Admitting Digital Evidence",
      slug: "digital-evidence-hash-integrity-forensics",
      subtitle: "Statutory admissibility under US FRE 902(14) and international ISO/IEC 27037 standards.",
      summary: "Forensic guidelines and legal standards required to establish authenticity, non-alteration, and admissibility of digital records in trial courts.",
      content: `## 1. The Challenge of Digital Evidentiary Authenticity
Because electronic records are intangible and subject to modification, courts demand proof that digital evidence presented at trial is an exact bitstream reproduction of the original storage media at the time of seizure.

## 2. Cryptographic Hash Matching as Proof of Authenticity
Under Federal Rule of Evidence 902(14) and common law evidentiary doctrines, matching SHA-256 cryptographic hashes between the forensic acquisition image and the examination copy creates self-authenticating proof of data integrity.

## 3. Documenting the Complete Chain of Custody
Every transfer, physical movement, and forensic analysis of digital media must be recorded on a contemporaneous chain of custody form. A lapse in custody documentation allows opposing counsel to challenge evidence under spoliation doctrines.`,
      topicSlug: "digital-evidence",
      countrySlug: null,
      difficulty: AudienceLevel.INTERMEDIATE,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 7,
      isFeatured: false,
      citations: [
        {
          title: "Federal Rules of Evidence Rule 902(14)",
          sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_902",
          citationText: "FRE Rule 902(14) Certified Data Copied from an Electronic Device, Storage Medium, or File.",
        },
      ],
    },
    {
      title: "The Draft UN Convention Against Cybercrime: International Evidence Exchange vs. Human Rights",
      slug: "un-cybercrime-treaty-procedural-safeguards",
      subtitle: "Procedural powers, dual criminality, and human rights tensions in the global cybercrime treaty.",
      summary: "Editorial review of the text finalized by the United Nations Ad Hoc Committee on Cybercrime and procedural concerns raised by civil society.",
      content: `## 1. Drafting History and Background
Established by UN General Assembly Resolution 74/247, the Ad Hoc Committee concluded negotiations in 2024 on the draft United Nations Convention Against Cybercrime (A/78/L.91).

## 2. Procedural Investigative Powers
The draft treaty establishes multilateral mechanisms for expedited preservation of stored electronic data, collection of traffic data, and mutual legal assistance in obtaining electronic evidence for serious crimes.

## 3. Dual Criminality and Human Rights Safeguards
Human rights organizations and legal scholars have scrutinized provisions where mutual assistance could be compelled for political or speech-related offenses lacking dual criminality in the requested state.`,
      topicSlug: "international-cooperation",
      countrySlug: null,
      difficulty: AudienceLevel.ADVANCED,
      status: ArticleStatus.UNDER_REVIEW,
      sourceQuality: SourceQuality.INTERNATIONAL_ORG,
      readingTimeMinutes: 9,
      isFeatured: false,
      citations: [
        {
          title: "Draft United Nations Convention Against Cybercrime (A/78/L.91)",
          sourceUrl: "https://www.unodc.org/unodc/en/cybercrime/ad-hoc-committee/home.html",
          citationText: "UN General Assembly Document A/78/L.91, Finalized August 2024.",
        },
      ],
    },
    {
      title: "Corporate Ransomware Incident Reporting: CIRCIA and SEC Mandatory Disclosure Timelines",
      slug: "corporate-ransomware-reporting-duties-circia",
      subtitle: "Harmonizing 24-hour ransom payment disclosures with federal 4-day SEC Form 8-K filings.",
      summary: "Legal compliance guide for general counsel navigating conflicting mandatory reporting timelines following a ransomware extortion incident in the US.",
      content: `## 1. Dual Reporting Tracks for Corporate Victims
US companies facing ransomware attacks face dual regulatory reporting obligations: criminal incident notifications to CISA under CIRCIA, and investor disclosure filings to the SEC under securities regulations.

## 2. 24-Hour Ransom Payment Disclosure to CISA
Under CIRCIA (6 U.S.C. § 681b(a)(2)), any covered entity that makes a ransom payment in connection with a ransomware attack must report the payment to CISA within 24 hours of the payment being made.

## 3. Materiality Determinations under SEC Item 1.05
Under SEC Release No. 33-11216, a public company must disclose a cybersecurity incident on Form 8-K within four business days after determining that the incident is material to a reasonable investor.`,
      topicSlug: "cybersecurity-compliance",
      countrySlug: "united-states",
      difficulty: AudienceLevel.ADVANCED,
      status: ArticleStatus.PUBLISHED,
      sourceQuality: SourceQuality.PRIMARY,
      readingTimeMinutes: 8,
      isFeatured: false,
      citations: [
        {
          title: "Cyber Incident Reporting for Critical Infrastructure Act of 2022",
          sourceUrl: "https://www.cisa.gov/circia",
          citationText: "Public Law 117-103, codified at 6 U.S.C. §§ 681–681g.",
        },
      ],
    },
  ];

  for (const a of additionalArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: a.slug } });
    if (!existing) {
      const topic = await prisma.topic.findUnique({ where: { slug: a.topicSlug } });
      const country = a.countrySlug
        ? await prisma.country.findUnique({ where: { slug: a.countrySlug } })
        : null;

      if (topic) {
        const created = await prisma.article.create({
          data: {
            title: a.title,
            slug: a.slug,
            subtitle: a.subtitle,
            summary: a.summary,
            content: a.content,
            topicId: topic.id,
            countryId: country ? country.id : null,
            difficulty: a.difficulty,
            status: a.status,
            sourceQuality: a.sourceQuality,
            readingTimeMinutes: a.readingTimeMinutes,
            authorId: adminUser.id,
            publishedAt: a.status === ArticleStatus.PUBLISHED ? new Date() : null,
            isFeatured: a.isFeatured,
            citations: {
              create: a.citations.map((c) => ({
                title: c.title,
                sourceUrl: c.sourceUrl,
                citationText: c.citationText,
                isVerified: true,
                verifiedAt: new Date(),
              })),
            },
          },
        });
        console.log(`Seeded article: [${created.title}] (Status: ${created.status})`);
      }
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
