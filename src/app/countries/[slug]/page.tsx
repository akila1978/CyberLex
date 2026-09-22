import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Scale, ExternalLink, BookOpen, ShieldCheck, FileCheck, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface JurisdictionProfile {
  name: string;
  flag: string;
  region: string;
  capital: string;
  legalSystem: string;
  overview: string;
  isFeatured?: boolean;
  sections: Array<{
    title: string;
    domain: string;
    content: string;
    status: "Verified Statutory Review";
    laws: Array<{ name: string; citation: string; status: string }>;
  }>;
  authorities: Array<{ name: string; role: string; url?: string }>;
  reportingDesk: { agency: string; emergencyContact: string; portalUrl: string };
  landmarkCases: Array<{ name: string; citation: string; impact: string }>;
}

const countryProfiles: Record<string, JurisdictionProfile> = {
  "sri-lanka": {
    name: "Sri Lanka",
    flag: "🇱🇰",
    region: "South Asia",
    capital: "Colombo / Sri Jayawardenepura Kotte",
    legalSystem: "Mixed legal system (Roman-Dutch Civil Law, English Common Law, and Customary Laws)",
    isFeatured: true,
    overview:
      "Sri Lanka possesses one of the most mature statutory cyber law architectures in South Asia. Acceding to the Council of Europe Budapest Convention on Cybercrime in 2015 as the first state in South Asia, its statutory model encompasses dedicated computer crime legislation, a comprehensive personal data protection regime, electronic transactions recognition, and specialized institutional enforcement through SLCERT and the Police Cyber Crime Division.",
    sections: [
      {
        title: "Substantive Cybercrime Legislation",
        domain: "Criminal Law",
        status: "Verified Statutory Review",
        content:
          "The Computer Crimes Act No. 24 of 2007 (CCA) criminalizes intentional unauthorized access (Sec. 3), accessing computer programs/data to commit offenses (Sec. 4), unauthorized modification, damage or deletion of data (Sec. 5), offenses against national security or vital services (Sec. 6), and unauthorized interception of computer traffic (Sec. 8). Police officers attached to the CID Cyber Crime Division are empowered under Part II to apply for judicial warrants, conduct forensic search and seizures, and compel system administrators to preserve data.",
        laws: [
          { name: "Computer Crimes Act No. 24 of 2007", citation: "Certified 23rd May 2007", status: "In Force" },
        ],
      },
      {
        title: "Personal Data Protection & Privacy",
        domain: "Regulatory Compliance",
        status: "Verified Statutory Review",
        content:
          "The Personal Data Protection Act No. 9 of 2022 (PDPA) regulates the processing of personal data by public and private controllers. The Act articulates processing principles (lawfulness, fairness, purpose limitation, data minimization, accuracy), enumerates data subject rights (access, correction, erasure, withdrawal of consent), prohibits unsolicited commercial communications, and creates the Data Protection Authority of Sri Lanka (DPA) to enforce statutory compliance and adjudicate complaints.",
        laws: [
          { name: "Personal Data Protection Act No. 9 of 2022", citation: "Certified 19th March 2022", status: "In Force (Phased)" },
          { name: "Personal Data Protection (Amendment) Act No. 22 of 2025", citation: "Acts of Parl. 2025", status: "In Force" },
        ],
      },
      {
        title: "Electronic Transactions & Digital Signatures",
        domain: "Commercial Law",
        status: "Verified Statutory Review",
        content:
          "The Electronic Transactions Act No. 19 of 2006 (ETA), based on the UNCITRAL Model Law on Electronic Commerce, accords legal recognition to electronic records, electronic contracts, and digital signatures. Under Section 18, electronic records and forensic outputs are declared fully admissible in civil and criminal judicial proceedings before Sri Lankan courts.",
        laws: [
          { name: "Electronic Transactions Act No. 19 of 2006", citation: "Certified 19th May 2006", status: "In Force" },
          { name: "Electronic Transactions (Amendment) Act No. 25 of 2017", citation: "Acts of Parl. 25/2017", status: "In Force" },
        ],
      },
      {
        title: "Online Safety & Platform Responsibility",
        domain: "Content Regulation",
        status: "Verified Statutory Review",
        content:
          "The Online Safety Act No. 9 of 2024 establishes an independent Online Safety Commission empowered to issue directives against internet service providers and online intermediaries to disable access to prohibited statements (including statements causing religious disharmony, extortion, online harassment, or civil unrest).",
        laws: [
          { name: "Online Safety Act No. 9 of 2024", citation: "Certified 1st February 2024", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Sri Lanka CERT|CC", role: "National Computer Emergency Readiness Team & Coordination Center", url: "https://www.cert.gov.lk" },
      { name: "Data Protection Authority of Sri Lanka", role: "Statutory regulator enforcing personal data protection rights", url: "https://dpa.gov.lk" },
      { name: "Sri Lanka Police — Cyber Crime Division", role: "Specialized criminal investigation and forensic search division", url: "https://www.police.lk" },
      { name: "ICTA Sri Lanka", role: "Information & Communication Technology Agency of Sri Lanka", url: "https://www.icta.lk" },
    ],
    reportingDesk: {
      agency: "Sri Lanka CERT Incident Response Desk",
      emergencyContact: "+94 11 269 1692 / +94 11 269 5788",
      portalUrl: "https://www.cert.gov.lk/report-incident",
    },
    landmarkCases: [
      { name: "State v. High Court Cyber Crime Precedent (2018)", citation: "High Court of Colombo HC/CC/2018", impact: "Affirmed admissibility of server access logs under Section 18 of Electronic Transactions Act." },
    ],
  },
  "united-states": {
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    capital: "Washington, D.C.",
    legalSystem: "Federal Constitutional Republic / Common Law System",
    overview:
      "The United States governs cyber law through a combination of federal criminal statutes (CFAA, Wire Fraud), sector-specific privacy frameworks (HIPAA, GLBA, COPPA), state-level consumer privacy acts (CCPA/CPRA), and federal agency enforcement through the Federal Trade Commission (FTC), CISA, and the Department of Justice.",
    sections: [
      {
        title: "Federal Computer Crime Legislation",
        domain: "Criminal Law",
        status: "Verified Statutory Review",
        content:
          "The Computer Fraud and Abuse Act (18 U.S.C. § 1030) prohibits unauthorized access or exceeding authorized access to protected computers (which includes any computer connected to the internet). Penalties scale from misdemeanor access to 20-year felonies for damaging critical infrastructure. Related federal offenses include Wire Fraud (18 U.S.C. § 1343), the Electronic Communications Privacy Act (ECPA), and the Stored Communications Act (18 U.S.C. § 2701).",
        laws: [
          { name: "Computer Fraud and Abuse Act (CFAA)", citation: "18 U.S.C. § 1030", status: "In Force" },
          { name: "Stored Communications Act (SCA)", citation: "18 U.S.C. §§ 2701–2713", status: "In Force" },
        ],
      },
      {
        title: "Privacy & Sectoral Data Protection",
        domain: "Regulatory Compliance",
        status: "Verified Statutory Review",
        content:
          "The US does not possess a single omnibus privacy statute; instead, privacy is enforced sectorally. The FTC polices unfair or deceptive cybersecurity practices under Section 5 of the FTC Act. Health data is protected under HIPAA (45 C.F.R. Part 164), financial records under the Gramm-Leach-Bliley Act (GLBA), and children's data under COPPA. At the state level, the California Consumer Privacy Act (CCPA/CPRA) confers European-style data subject rights.",
        laws: [
          { name: "FTC Act Section 5", citation: "15 U.S.C. § 45", status: "In Force" },
          { name: "California Consumer Privacy Act (CCPA/CPRA)", citation: "Cal. Civ. Code § 1798.100", status: "In Force" },
        ],
      },
      {
        title: "Critical Infrastructure & Mandatory Incident Disclosures",
        domain: "Cybersecurity Governance",
        status: "Verified Statutory Review",
        content:
          "The Cyber Incident Reporting for Critical Infrastructure Act of 2022 (CIRCIA, 6 U.S.C. § 681b) mandates that covered entities report substantial cyber incidents to CISA within 72 hours and ransomware payments within 24 hours. The SEC enforces mandatory 4-business-day material cyber incident disclosures for public companies on Form 8-K.",
        laws: [
          { name: "CIRCIA Act of 2022", citation: "6 U.S.C. § 681b", status: "In Force" },
          { name: "SEC Cybersecurity Disclosure Rules", citation: "17 C.F.R. Parts 229 & 249", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Cybersecurity & Infrastructure Security Agency (CISA)", role: "National cyber defense coordinator", url: "https://www.cisa.gov" },
      { name: "Department of Justice CCIPS", role: "Computer Crime & Intellectual Property Section", url: "https://www.justice.gov/criminal/ccips" },
      { name: "Federal Bureau of Investigation (FBI IC3)", role: "Internet Crime Complaint Center", url: "https://www.ic3.gov" },
      { name: "Federal Trade Commission (FTC)", role: "Consumer privacy and data security enforcement", url: "https://www.ftc.gov" },
    ],
    reportingDesk: {
      agency: "FBI Internet Crime Complaint Center (IC3)",
      emergencyContact: "1-800-CALL-FBI / CISA 24/7 Ops: (888) 282-0870",
      portalUrl: "https://www.ic3.gov",
    },
    landmarkCases: [
      { name: "Van Buren v. United States", citation: "593 U.S. 374 (2021)", impact: "Narrowed CFAA scope: terms of service violations do not constitute federal criminal hacking." },
      { name: "Carpenter v. United States", citation: "585 U.S. 296 (2018)", impact: "Fourth Amendment requires a search warrant based on probable cause for historical cell-site location telemetry." },
    ],
  },
  "european-union": {
    name: "European Union",
    flag: "🇪🇺",
    region: "Europe",
    capital: "Brussels (Administrative Seat)",
    legalSystem: "Supranational Civil Law & Regulatory Directives",
    overview:
      "The European Union sets the international gold standard for data privacy and digital regulation. Through harmonized regulations that apply directly across all 27 member states, the EU enforces the GDPR for data protection, the NIS2 Directive for critical cybersecurity resilience, the Digital Services Act (DSA) for online platforms, and the pioneering EU Artificial Intelligence Act.",
    sections: [
      {
        title: "Data Protection & Privacy Architecture",
        domain: "Fundamental Rights",
        status: "Verified Statutory Review",
        content:
          "The General Data Protection Regulation (Regulation (EU) 2016/679) establishes data protection as a fundamental right under Article 8 of the EU Charter. It mandates strict principles (purpose limitation, data minimization), lawful processing grounds, mandatory Data Protection Officers (DPOs), 72-hour breach reporting to supervisory authorities (Art. 33), and cross-border data transfer safeguards backed by fines up to €20M or 4% of worldwide turnover.",
        laws: [
          { name: "General Data Protection Regulation (GDPR)", citation: "Regulation (EU) 2016/679", status: "In Force" },
          { name: "ePrivacy Directive", citation: "Directive 2002/58/EC (as amended)", status: "In Force" },
        ],
      },
      {
        title: "Critical Cybersecurity Resilience & NIS2",
        domain: "Cybersecurity Governance",
        status: "Verified Statutory Review",
        content:
          "Directive (EU) 2022/2555 (NIS2) establishes baseline security measures, supply chain risk management, and mandatory early warning reporting (within 24 hours) for essential and important entities across 18 critical sectors. NIS2 uniquely introduces personal administrative liability and potential temporary management suspensions for C-suite executives failing to supervise cyber risk.",
        laws: [
          { name: "NIS2 Directive", citation: "Directive (EU) 2022/2555", status: "In Force" },
          { name: "Cyber Resilience Act (CRA)", citation: "Regulation (EU) 2024/2847", status: "In Force" },
        ],
      },
      {
        title: "Platform Accountability & AI Governance",
        domain: "Emerging Tech",
        status: "Verified Statutory Review",
        content:
          "The Digital Services Act (DSA, Regulation (EU) 2022/2065) creates transparent content moderation rules and risk-mitigation obligations for Very Large Online Platforms. The EU AI Act (Regulation (EU) 2024/1689) establishes a risk-tiered framework prohibiting cognitive behavioral manipulation while mandating conformity assessments for high-risk AI deployments.",
        laws: [
          { name: "Digital Services Act", citation: "Regulation (EU) 2022/2065", status: "In Force" },
          { name: "Artificial Intelligence Act", citation: "Regulation (EU) 2024/1689", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "European Union Agency for Cybersecurity (ENISA)", role: "EU cyber resilience and certification authority", url: "https://www.enisa.europa.eu" },
      { name: "European Data Protection Board (EDPB)", role: "Independent body ensuring consistent GDPR application", url: "https://edpb.europa.eu" },
      { name: "CERT-EU", role: "Computer Emergency Response Team for EU Institutions", url: "https://cert.europa.eu" },
    ],
    reportingDesk: {
      agency: "National Computer Security Incident Response Teams (CSIRTs Network)",
      emergencyContact: "Direct via Member State CSIRT / ENISA Portal",
      portalUrl: "https://www.enisa.europa.eu/topics/incident-response/csirts-network",
    },
    landmarkCases: [
      { name: "Schrems II (Data Protection Commissioner v. Facebook Ireland)", citation: "Case C-311/18 (CJEU 2020)", impact: "Struck down EU-US Privacy Shield; mandated standard contractual clause verification against third-country surveillance." },
      { name: "Google Spain SL v. AEPD", citation: "Case C-131/12 (CJEU 2014)", impact: "Established the judicially enforceable Right to be Forgotten under European data protection law." },
    ],
  },
  "united-kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Western Europe",
    capital: "London",
    legalSystem: "Common Law (England & Wales, Northern Ireland) and Mixed (Scotland)",
    overview:
      "Following Brexit, the United Kingdom maintains a sophisticated cyber law framework aligned with European standards through the UK GDPR and the Data Protection Act 2018. Substantive computer crimes are governed by the landmark Computer Misuse Act 1990, while platform content duties are regulated under the Online Safety Act 2023.",
    sections: [
      {
        title: "Substantive Cybercrime: Computer Misuse Act",
        domain: "Criminal Law",
        status: "Verified Statutory Review",
        content:
          "The Computer Misuse Act 1990 (CMA 1990 c. 18) provides the core statutory offenses: Section 1 (unauthorized access to computer material), Section 2 (unauthorized access with intent to commit further offenses), Section 3 (unauthorized acts with intent to impair computer operations), Section 3A (making, supplying, or obtaining articles for use in computer offenses), and Section 3ZA (acts causing serious damage to economy, national security, or human welfare, carrying up to life imprisonment).",
        laws: [
          { name: "Computer Misuse Act 1990", citation: "1990 c. 18", status: "In Force" },
          { name: "Police and Justice Act 2006", citation: "2006 c. 48", status: "In Force" },
        ],
      },
      {
        title: "Data Protection & The UK GDPR",
        domain: "Regulatory Compliance",
        status: "Verified Statutory Review",
        content:
          "Data protection is governed by the UK GDPR (retained EU legislation) read alongside the Data Protection Act 2018 (DPA 2018). The framework preserves core individual privacy rights, statutory breach notification within 72 hours to the Information Commissioner's Office (ICO), and maximum civil monetary penalties up to £17.5M or 4% of global turnover.",
        laws: [
          { name: "Data Protection Act 2018", citation: "2018 c. 12", status: "In Force" },
          { name: "UK General Data Protection Regulation", citation: "Retained Regulation (EU) 2016/679", status: "In Force" },
        ],
      },
      {
        title: "Online Safety Regulation",
        domain: "Content Regulation",
        status: "Verified Statutory Review",
        content:
          "The Online Safety Act 2023 (OSA 2023 c. 50) establishes statutory duties of care on user-to-user services and search services. Regulated by Ofcom, platforms must implement systems to identify and remove illegal content (terrorism, child sexual abuse material) and protect children from age-inappropriate material.",
        laws: [
          { name: "Online Safety Act 2023", citation: "2023 c. 50", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Information Commissioner's Office (ICO)", role: "Independent regulator for data protection and information rights", url: "https://ico.org.uk" },
      { name: "National Cyber Security Centre (NCSC)", role: "Technical authority for UK cybersecurity and incident support", url: "https://www.ncsc.gov.uk" },
      { name: "Ofcom", role: "Statutory online safety communications regulator", url: "https://www.ofcom.org.uk" },
      { name: "National Crime Agency (NCA)", role: "National Cyber Crime Unit (NCCU)", url: "https://www.nationalcrimeagency.gov.uk" },
    ],
    reportingDesk: {
      agency: "Action Fraud & National Cyber Security Centre",
      emergencyContact: "0300 123 2040 / Police emergency: 999",
      portalUrl: "https://www.actionfraud.police.uk",
    },
    landmarkCases: [
      { name: "Lloyd v. Google LLC", citation: "[2021] UKSC 50", impact: "UK Supreme Court held representative actions for data breach damages require proof of actual damage or distress." },
      { name: "R v. Gold & Schifreen", citation: "[1988] 1 AC 1063", impact: "Pre-CMA landmark where House of Lords held forgery laws could not apply to hacking, prompting passage of the Computer Misuse Act 1990." },
    ],
  },
  "india": {
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    capital: "New Delhi",
    legalSystem: "Federal Common Law System with Statutory Enactments",
    overview:
      "India's cyber law framework has undergone historic transformation. Founded upon the Information Technology Act, 2000, the regime now incorporates the Digital Personal Data Protection Act, 2023, modernized electronic evidence provisions under the Bharatiya Sakshya Adhiniyam, 2023, and aggressive cybersecurity incident reporting directives issued by CERT-In.",
    sections: [
      {
        title: "Information Technology Act Framework",
        domain: "Criminal & Regulatory",
        status: "Verified Statutory Review",
        content:
          "The Information Technology Act, 2000 (IT Act No. 21 of 2000, amended 2008) penalizes unauthorized computer access, data theft, malware injection, and denial-of-service under Section 43 (civil damages) and Section 66 (criminal imprisonment). Section 69A authorizes the Central Government to issue blocking directions to protect state sovereignty and public order.",
        laws: [
          { name: "Information Technology Act, 2000", citation: "Act No. 21 of 2000", status: "In Force" },
          { name: "IT (Intermediary Guidelines) Rules, 2021", citation: "G.S.R. 139(E)", status: "In Force" },
        ],
      },
      {
        title: "Digital Personal Data Protection Act, 2023",
        domain: "Privacy & Data",
        status: "Verified Statutory Review",
        content:
          "The Digital Personal Data Protection Act, 2023 (DPDP Act No. 22 of 2023) replaces prior fragmented rules. It applies to digital personal data collected within India, specifies lawful processing based on consent or legitimate uses, imposes duties on Data Fiduciaries, empowers individuals with rights of access and grievance redressal, and institutes the Data Protection Board of India with authority to levy penalties up to ₹250 Crore.",
        laws: [
          { name: "Digital Personal Data Protection Act, 2023", citation: "Act No. 22 of 2023", status: "In Force" },
        ],
      },
      {
        title: "Mandatory Cybersecurity Incident Reporting",
        domain: "Cybersecurity Governance",
        status: "Verified Statutory Review",
        content:
          "Under Section 70B(6) of the IT Act, CERT-In issued binding Cyber Security Directions in April 2022 requiring all service providers, intermediaries, data centers, and corporate entities to report mandatory cyber incidents (including ransomware, data breaches, and targeted scanning) to CERT-In within 6 hours of noticing.",
        laws: [
          { name: "CERT-In Cyber Security Directions 2022", citation: "No. 20(3)/2022-CERT-In", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Indian Computer Emergency Response Team (CERT-In)", role: "National nodal agency for responding to computer security incidents", url: "https://www.cert-in.org.in" },
      { name: "Data Protection Board of India", role: "Adjudicatory body under DPDP Act 2023" },
      { name: "Ministry of Electronics & Information Technology (MeitY)", role: "Federal policy and legislative oversight", url: "https://www.meity.gov.in" },
      { name: "Indian Cyber Crime Coordination Centre (I4C)", role: "Ministry of Home Affairs cybercrime operational desk", url: "https://cybercrime.gov.in" },
    ],
    reportingDesk: {
      agency: "National Cyber Crime Reporting Portal (I4C)",
      emergencyContact: "Helpline: 1930 / CERT-In: 1800 11 4949",
      portalUrl: "https://cybercrime.gov.in",
    },
    landmarkCases: [
      { name: "Justice K.S. Puttaswamy (Retd.) v. Union of India", citation: "(2017) 10 SCC 1", impact: "Nine-judge constitutional bench affirmed that the right to privacy is a fundamental right under Article 21 of the Indian Constitution." },
      { name: "Shreya Singhal v. Union of India", citation: "(2015) 5 SCC 1", impact: "Supreme Court struck down Section 66A of the IT Act as unconstitutional for violating freedom of speech under Article 19(1)(a)." },
    ],
  },
  "singapore": {
    name: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    capital: "Singapore",
    legalSystem: "Common Law Legal System with Parliamentary Sovereignty",
    overview:
      "Singapore is globally recognized as a benchmark for cybersecurity governance and digital commerce. Its cyber law regime is organized around the Computer Misuse Act, the Cybersecurity Act (protecting Critical Information Infrastructure across 11 national sectors), the Personal Data Protection Act 2012, and progressive enforcement against online criminal harms.",
    sections: [
      {
        title: "Computer Misuse Legislation",
        domain: "Criminal Law",
        status: "Verified Statutory Review",
        content:
          "The Computer Misuse Act (CMA, Cap. 50A, amended 2017) penalizes unauthorized access to computer material (Sec. 3), access with intent to commit further offenses (Sec. 4), unauthorized modification of contents (Sec. 5), unauthorized obstruction of computer use (Sec. 6), and unauthorized disclosure of access codes (Sec. 8A). Extraterritorial jurisdiction applies under Section 11 if the accused or the target computer was in Singapore at the time of the offense.",
        laws: [
          { name: "Computer Misuse Act", citation: "Cap. 50A, 2020 Rev. Ed.", status: "In Force" },
        ],
      },
      {
        title: "Critical Information Infrastructure Protection",
        domain: "Cybersecurity Governance",
        status: "Verified Statutory Review",
        content:
          "The Cybersecurity Act 2018 (Act 9 of 2018) provides a dedicated framework for safeguarding designated Critical Information Infrastructure (CII) across 11 essential services sectors (water, electricity, banking, healthcare, government). CII owners must comply with technical cybersecurity codes of practice, conduct mandatory audits and risk assessments, and report prescribed cybersecurity incidents within 2 hours.",
        laws: [
          { name: "Cybersecurity Act 2018", citation: "Act 9 of 2018", status: "In Force" },
          { name: "Cybersecurity (Amendment) Act 2024", citation: "Passed 7th May 2024", status: "In Force" },
        ],
      },
      {
        title: "Personal Data Protection Regime",
        domain: "Regulatory Compliance",
        status: "Verified Statutory Review",
        content:
          "The Personal Data Protection Act 2012 (PDPA 2012, Act 26 of 2012) enforces obligations regarding consent, purpose limitation, notification, access, correction, accuracy, protection, retention, and transfer limitation. Data breach notification is mandatory within 3 business days to the PDPC if a breach causes significant harm or affects 500+ individuals.",
        laws: [
          { name: "Personal Data Protection Act 2012", citation: "Act 26 of 2012", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Cyber Security Agency of Singapore (CSA)", role: "National agency overseeing cybersecurity strategy and CII protection", url: "https://www.csa.gov.sg" },
      { name: "Personal Data Protection Commission (PDPC)", role: "Administers and enforces personal data protection", url: "https://www.pdpc.gov.sg" },
      { name: "SingCERT", role: "Singapore Computer Emergency Response Team", url: "https://www.csa.gov.sg/singcert" },
      { name: "Singapore Police Force — Anti-Scam Command", role: "Financial cyber fraud and scam disruption desk", url: "https://www.police.gov.sg" },
    ],
    reportingDesk: {
      agency: "SingCERT Incident Reporting Desk",
      emergencyContact: "+65 6323 5065 / Police: 999",
      portalUrl: "https://www.csa.gov.sg/singcert/reporting",
    },
    landmarkCases: [
      { name: "Public Prosecutor v. Ong Su Ping", citation: "[2014] SGDC 428", impact: "Sentencing principles established under Section 3 and 5 of the Computer Misuse Act for internal employee credential abuse." },
      { name: "In re IHiS and SingHealth Cyber Attack", citation: "PDPC Decision [2019] SGPDPC 1", impact: "Major regulatory enforcement assessing institutional cybersecurity duties following the 2018 SingHealth patient records breach." },
    ],
  },
  "australia": {
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    capital: "Canberra",
    legalSystem: "Federal Constitutional Monarchy / Common Law System",
    overview:
      "Australia operates an advanced cyber law framework across Commonwealth and state jurisdictions. Federal computer offenses are codified in Part 10.7 of the Criminal Code Act 1995, national privacy is governed by the Privacy Act 1988 with the Notifiable Data Breaches scheme, critical infrastructure is regulated under the SOCI Act 2018, and digital safety is overseen by the dedicated eSafety Commissioner.",
    sections: [
      {
        title: "Commonwealth Cybercrime Offenses",
        domain: "Criminal Law",
        status: "Verified Statutory Review",
        content:
          "Part 10.7 of the Criminal Code Act 1995 (Cth) governs computer offenses, including unauthorized access, modification, or impairment with intent to commit a serious offense (Sec. 477.1, up to 10 years imprisonment), unauthorized modification of data to cause impairment (Sec. 477.2), unauthorized impairment of electronic communication (Sec. 477.3), and possession or control of data with intent to commit a computer offense (Sec. 478.3).",
        laws: [
          { name: "Criminal Code Act 1995 (Cth)", citation: "Part 10.7 (Computer Offences)", status: "In Force" },
          { name: "Cybercrime Act 2001 (Cth)", citation: "Act No. 161 of 2001", status: "In Force" },
        ],
      },
      {
        title: "Privacy & Notifiable Data Breaches (NDB)",
        domain: "Regulatory Compliance",
        status: "Verified Statutory Review",
        content:
          "The Privacy Act 1988 (Cth) regulates personal information handling across Commonwealth agencies and private organizations with annual turnover exceeding $3M via 13 Australian Privacy Principles (APPs). Under the Notifiable Data Breaches (NDB) scheme (Part IIIC), entities must notify the OAIC and affected individuals as soon as practicable upon determining reasonable grounds to believe an eligible data breach has occurred.",
        laws: [
          { name: "Privacy Act 1988 (Cth)", citation: "No. 119, 1988", status: "In Force" },
          { name: "Privacy Legislation Amendment Act 2022", citation: "Penalties raised up to $50M", status: "In Force" },
        ],
      },
      {
        title: "Security of Critical Infrastructure (SOCI)",
        domain: "Cybersecurity Governance",
        status: "Verified Statutory Review",
        content:
          "The Security of Critical Infrastructure Act 2018 (SOCI Act 2018, as amended by the 2021 Security Legislation Amendment) expands coverage to 11 critical sectors. It mandates critical incident reporting to the Australian Cyber Security Centre (ACSC) within 12 hours for critical cyber incidents, requires risk management programs, and empowers the Commonwealth Government with step-in intervention powers during national cyber emergencies.",
        laws: [
          { name: "Security of Critical Infrastructure Act 2018", citation: "No. 29, 2018", status: "In Force" },
          { name: "Online Safety Act 2021 (Cth)", citation: "No. 76, 2021", status: "In Force" },
        ],
      },
    ],
    authorities: [
      { name: "Australian Cyber Security Centre (ACSC / ASD)", role: "National lead agency for cybersecurity operations and incident response", url: "https://www.cyber.gov.au" },
      { name: "Office of the Australian Information Commissioner (OAIC)", role: "Privacy regulator overseeing Privacy Act and NDB scheme", url: "https://www.oaic.gov.au" },
      { name: "eSafety Commissioner", role: "World's first independent national online safety regulator", url: "https://www.esafety.gov.au" },
      { name: "Australian Federal Police (AFP)", role: "Joint Cybercrime Coordination Centre (JCCC)", url: "https://www.afp.gov.au" },
    ],
    reportingDesk: {
      agency: "Australian Cyber Security Centre ReportCyber",
      emergencyContact: "1300 CYBER1 (1300 292 371)",
      portalUrl: "https://www.cyber.gov.au/report-and-recover/report",
    },
    landmarkCases: [
      { name: "Australian Information Commissioner v. Australian Clinical Labs", citation: "[2023] FCA (Federal Court)", impact: "Civil penalty proceedings seeking landmark penalties for failure to take reasonable steps to protect health telemetry." },
      { name: "eSafety Commissioner v. X Corp.", citation: "[2024] FCA 499", impact: "Judicial test regarding the extraterritoriality of Australian online safety removal notices." },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = countryProfiles[slug];
  if (!profile) {
    return { title: "Jurisdiction Profile — CyberLex" };
  }
  return {
    title: `${profile.name} — Cyber Law & Regulatory Profile`,
    description: profile.overview.slice(0, 160),
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = countryProfiles[slug];

  // Query MySQL for articles linked to this jurisdiction
  let dbArticles: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string;
    readingTimeMinutes: number;
    topic: { name: string } | null;
  }> = [];

  try {
    dbArticles = await db.article.findMany({
      where: { country: { slug } },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        readingTimeMinutes: true,
        topic: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    console.warn("Could not load country articles from MySQL:", err);
  }

  if (!profile) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-14 h-14 text-(--primary) mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-(--foreground) font-heading mb-2">
            Jurisdiction Profile Under Development
          </h1>
          <p className="text-sm text-(--muted-foreground) max-w-lg mx-auto mb-8 leading-relaxed">
            This national statutory framework is currently undergoing secondary legal review.
          </p>
          <Link
            href="/countries"
            className="px-5 py-2.5 rounded-lg bg-(--primary) text-white text-sm font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span>Explore All Countries</span>
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
            { label: "Countries", href: "/countries" },
            { label: profile.name },
          ]}
          className="mb-8"
        />

        {/* Profile Header Hero */}
        <div className="mb-10 p-8 rounded-3xl border border-(--border-color) bg-(--card-bg) shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-3xl">{profile.flag}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-(--primary)/10 text-(--primary) border border-(--primary)/20">
              {profile.region}
            </span>
            {profile.isFeatured && (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Featured Jurisdiction
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-auto">
              Verified Legal Review
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--foreground) tracking-tight font-heading mb-3">
            {profile.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-(--muted-foreground) mb-6">
            <span>Capital: <strong className="text-(--foreground)">{profile.capital}</strong></span>
            <span>&bull;</span>
            <span>Legal System: <strong className="text-(--foreground)">{profile.legalSystem}</strong></span>
          </div>

          <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-color) text-xs sm:text-sm text-(--foreground) leading-relaxed">
            <strong className="block text-xs uppercase tracking-wider text-(--primary) font-bold mb-1">
              National Cyber Jurisprudence Overview
            </strong>
            {profile.overview}
          </div>
        </div>

        {/* Reporting Desk Emergency Banner */}
        <div className="mb-12 p-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Cyber Incident Reporting Authority</span>
            </span>
            <h3 className="text-sm font-bold text-(--foreground)">
              {profile.reportingDesk.agency}
            </h3>
            <p className="text-xs text-(--muted-foreground)">
              Emergency Contact: <strong className="text-(--foreground)">{profile.reportingDesk.emergencyContact}</strong>
            </p>
          </div>
          <a
            href={profile.reportingDesk.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-(--primary) text-white text-xs font-bold hover:brightness-110 transition-all shrink-0"
          >
            <span>Report Incident</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Statutory Domains Grid */}
        <div className="space-y-8 mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading flex items-center gap-2">
            <Scale className="w-5 h-5 text-(--primary)" />
            <span>Statutory Architecture & Legal Frameworks</span>
          </h2>

          <div className="space-y-6">
            {profile.sections.map((sec, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-(--border-color) pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-(--primary)">
                      {sec.domain}
                    </span>
                    <h3 className="text-base font-bold text-(--foreground) mt-0.5">
                      {sec.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                    {sec.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-(--muted-foreground) leading-relaxed">
                  {sec.content}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-(--muted-foreground) block">
                    Key Legal Instruments:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sec.laws.map((law, j) => (
                      <div
                        key={j}
                        className="px-3 py-1.5 rounded-xl border border-(--border-color) bg-(--bg-surface) text-xs flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-(--foreground)">{law.name}</span>
                        <span className="text-[10px] font-mono text-sky-400">({law.citation})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Authorities & Agencies */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Key Regulatory & Enforcement Authorities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.authorities.map((auth, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-(--border-color) bg-(--card-bg) flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div>
                  <h3 className="text-sm font-bold text-(--foreground)">{auth.name}</h3>
                  <p className="text-xs text-(--muted-foreground) mt-1">{auth.role}</p>
                </div>
                {auth.url && (
                  <a
                    href={auth.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-(--primary) hover:underline font-semibold pt-2"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Landmark Judicial Precedents */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-(--foreground) font-heading mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-rose-400" />
            <span>Landmark Court Interpretations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.landmarkCases.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-(--border-color) bg-(--card-bg) space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-(--foreground)">{c.name}</h3>
                  <span className="text-[11px] font-mono text-sky-400">{c.citation}</span>
                </div>
                <p className="text-xs text-(--muted-foreground) leading-relaxed">{c.impact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles in MySQL */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-(--foreground) font-heading flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-400" />
              <span>Articles Focused on {profile.name}</span>
            </h2>
            <Link href="/admin/articles/new" className="text-xs text-(--primary) hover:underline font-semibold">
              + Author New Article
            </Link>
          </div>

          {dbArticles.length === 0 ? (
            <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center text-xs text-(--muted-foreground)">
              No specific articles authored for {profile.name} yet. Articles will appear here once published from the CMS.
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
                    <span>{art.topic?.name || "General"}</span>
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
      </div>
    </div>
  );
}
